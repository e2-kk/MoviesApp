import React from "react";

import "./About.css";
import TMDBLogo from "../../assets/tmdbLogo.svg";

const About = () => {
  return (
    <div className="about_container">
      <div className="about_project">
        <h2>About MovieFinder</h2>
        <p>This project is not for commercial purpose.</p>
        <p>
          It shows movie data of popular in general and this week movies as well
          movies streaming in cinemas right now.
        </p>
        <p>Movies can be searched within categories and sorted.</p>
        <p>
          In addition, they can be saved to watchlist. After websites closure or
          reload saved movies are not lost.
        </p>
      </div>
      <div className="about_credits">
        <h2>Credits</h2>

        <p>
          The movies' data and images source of this project is TMDB database.
        </p>
        <p>
          This product uses the TMDB API but is not endorsed or certified by
          TMDB.
        </p>
      </div>
    </div>
  );
};

export default About;
