import { NavLink } from "react-router-dom";

function NavBar() {
  return (
    <div className="nav-bar">
      <NavLink to="/" className="nav-link" end>
        Home
      </NavLink>
      <NavLink to="/dashboard" className="nav-link">
        Dashboard
      </NavLink>
      <NavLink to="/about" className="nav-link">
        About
      </NavLink>
      <NavLink to="/login" className="nav-link">
        Login
      </NavLink>
    </div>
  );
}

export default NavBar;
