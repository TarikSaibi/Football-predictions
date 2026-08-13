-- À exécuter une fois dans Supabase : Dashboard > SQL Editor > New query > coller > Run.
-- Crée la table des pronos + les règles Row Level Security qui empêchent quiconque de
-- lire/écrire les données d'un autre participant, même en bidouillant les requêtes.

create table if not exists public.predictions (
  user_id uuid primary key references auth.users(id) on delete cascade,
  display_name text not null,
  avatar_color text,
  ligue1 jsonb not null default '{}'::jsonb,
  premier_league jsonb not null default '{}'::jsonb,
  laliga jsonb not null default '{}'::jsonb,
  ucl jsonb not null default '{}'::jsonb,
  awards jsonb not null default '{}'::jsonb,
  submitted_at timestamptz not null default now()
);

alter table public.predictions enable row level security;

-- Tout le monde (même non connecté) peut consulter la liste des participants et leurs
-- pronos : c'est le but de la page "Les participants".
create policy "Les pronos sont publics en lecture"
  on public.predictions for select
  using (true);

-- Un utilisateur connecté ne peut créer/modifier QUE sa propre ligne (user_id = son
-- propre id d'authentification Google). Impossible d'écrire dans la fiche de quelqu'un
-- d'autre, même en trafiquant la requête réseau côté client.
create policy "Chacun n'écrit que sa propre fiche (création)"
  on public.predictions for insert
  with check (auth.uid() = user_id);

create policy "Chacun n'écrit que sa propre fiche (mise à jour)"
  on public.predictions for update
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);

-- Active le "Realtime" sur cette table pour que la page "Les participants" se mette à
-- jour en direct dès qu'un pote envoie son prono (voir aussi Database > Replication
-- dans le dashboard si cette commande ne suffit pas selon votre version de Supabase).
alter publication supabase_realtime add table public.predictions;
