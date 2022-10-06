import { NavLink } from "react-router-dom";

function NavBar() {
  return (
    <div className="nav-bar">
      {/* Step 3. Define the NavLink's */}
      <NavLink
        /* specify where the link should point to */
        to="/"
        /* add styling to Navlink, we will define this class in the CSS later */
        className="nav-link"
        end
      >
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
