import React from "react";
import { NavLink } from "react-router-dom";

const Navbar = () => {
  const navbarLinks = ['', 'Army']; // Add your additional links as needed

  const headerStyle = {
    backgroundColor: 'teal', // Modern background color (you can replace with your preferred color)
    color: 'white', // Text color
    padding: '20px', // Add padding for better visual appearance
  };

  const navLinkStyle = {
    color: 'white',
    textDecoration: 'none',
    margin: '0 15px', // Add space between nav links
  };

  return (
    <nav style={headerStyle}>
      <div className="container">
        <div>
          {navbarLinks.map((link) => (
            <NavLink key={link} to={`/${link}`} style={navLinkStyle}>
              {link === '' ? 'Home' : link}
            </NavLink>
          ))}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
