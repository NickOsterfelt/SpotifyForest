import React from "react";
import "../static/NavBar.css";
import { NavLink } from "react-router-dom";
import { Navbar, Nav, NavItem } from "reactstrap";

/**
 * The bootstrap NavBar to provide accessibility to routes
 */
function NavBar() {
    const navItems = (
      <Nav className="ml-auto align-bottom p-2 px-5" navbar>
        <NavItem>
          <NavLink to="/groups/">Your Groups</NavLink>
        </NavItem>
        <NavItem>
          <NavLink to="/findgroup" className="">Find Groups</NavLink>
        </NavItem>
        <NavItem>
          <NavLink to="/newgroup" className="">Create a Group</NavLink>
        </NavItem>
        <NavItem>
          <NavLink to="/logout" className="btn btn-primary border-dark">Logout</NavLink>
        </NavItem>
      </Nav>
    );

  return (
    <div>
      <Navbar expand="md">
        <NavLink exact to="/" className="navbar-brand">
          Musical Forest
        </NavLink>
        {navItems}
      </Navbar>
    </div>
  );
}

export default NavBar;
