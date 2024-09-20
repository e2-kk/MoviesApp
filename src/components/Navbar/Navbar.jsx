import React from "react";
import { NavLink } from "react-router-dom";

import "./Navbar.css";

const Navbar = ({ likedMovies }) => {
  return (
    <nav className="navbar">
      <div className="logo_container">
        <NavLink to="/" id="logo_link">
          <h1>MovieFinder</h1>
        </NavLink>
      </div>
      <div>
        <ul className="nav_links">
          <li>
            <NavLink to="about_project" className="saved_movies_link">
              About
            </NavLink>
          </li>
          <li>
            <NavLink to="all_movies">All Movies</NavLink>
          </li>
          <li>
            <NavLink to="saved_movies" className="saved_movies_link">
              Saved Movies <div className="num_movies">({likedMovies})</div>
            </NavLink>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
