-- À exécuter une fois dans Supabase : Dashboard > SQL Editor > New query > coller > Run.
-- Crée la table des pronos + les règles Row Level Security. Pas de compte / connexion :
-- juste un pseudo. La protection contre la triche vient de deux choses :
--   1. Le pseudo doit être unique (impossible de "voler" la fiche de quelqu'un d'autre).
--   2. Une fois envoyée, une fiche est TECHNIQUEMENT impossible à modifier ou supprimer
--      (aucune règle "update"/"delete" ci-dessous => Postgres refuse ces commandes pour
--      tout le monde, même en trafiquant la requête réseau). La date d'envoi
--      (submitted_at) est donc une vraie preuve, affichée à tous sur chaque fiche.

-- Pseudos insensibles à la casse ("Tarik" et "tarik" sont considérés identiques).
create extension if not exists citext;

drop table if exists public.predictions cascade;

create table public.predictions (
  id uuid primary key default gen_random_uuid(),
  display_name citext not null unique,
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

-- Tout le monde peut envoyer SA fiche (une seule fois, le pseudo unique empêche les
-- doublons). Aucune règle "update" ni "delete" n'est définie ci-dessous : en RLS,
-- l'absence de policy pour une commande bloque cette commande pour tout le monde. Une
-- fiche envoyée est donc figée, définitivement.
create policy "Tout le monde peut envoyer sa fiche"
  on public.predictions for insert
  with check (true);

-- Active le "Realtime" sur cette table pour que la page "Les participants" se mette à
-- jour en direct dès qu'un pote envoie son prono (voir aussi Database > Replication
-- dans le dashboard si cette commande ne suffit pas selon votre version de Supabase).
do $$
begin
  if not exists (
    select 1 from pg_publication_tables
    where pubname = 'supabase_realtime' and schemaname = 'public' and tablename = 'predictions'
  ) then
    alter publication supabase_realtime add table public.predictions;
  end if;
end $$;
