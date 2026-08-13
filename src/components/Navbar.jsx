import { NavLink } from "react-router-dom";
import "./Navbar.css";

export default function Navbar() {
  return (
    <header className="navbar">
      <div className="container navbar__inner">
        <NavLink to="/" className="navbar__brand">
          <span className="navbar__ball">⚽</span>
          <span>
            Les Pronos <span className="navbar__brand-accent">de Saison</span>
          </span>
        </NavLink>
        <nav className="navbar__links">
          <NavLink to="/" end className={({ isActive }) => (isActive ? "is-active" : "")}>
            Faire mon prono
          </NavLink>
          <NavLink to="/participants" className={({ isActive }) => (isActive ? "is-active" : "")}>
            Les participants
          </NavLink>
        </nav>
      </div>
    </header>
  );
}
