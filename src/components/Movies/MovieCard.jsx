import React from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import "./MovieCard.css";
import heart from "../../assets/red-heart.svg";
import star from "../../assets/star.png";
import notfoundPoster from "../../assets/missing_poster.png";

const MovieCard = ({ movie, handleLike }) => {
  const navigate = useNavigate();
  return (
    <div className="movie_card_container">
      <div
        className="heart_icon"
        onClick={() => {
          handleLike(movie);
        }}
      >
        <img src={heart}></img>
      </div>
      <Link to={`/movie/${movie.id}`} target="_blank" className="movie_link">
        <div className="movie_container">
          <div className="movie_poster_container">
            <img
              id="movie_poster"
              src={
                movie.poster_path !== null
                  ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
                  : notfoundPoster
              }
            ></img>
          </div>

          <div className="movie_details">
            <div className="movie_date_rate">
              <p>{movie.release_date.slice(0, 4)}</p>
              <div className="movie_rating">
                <img src={star} className="icon" />
                <p>{Math.round(movie.vote_average * 10) / 10}</p>
              </div>
            </div>

            <p className="movie_description">
              {movie?.overview
                ? movie.overview.slice(0, 100) + "..."
                : movie.overview}
            </p>
          </div>
        </div>
        <h2>
          {movie?.title.length > 20
            ? movie.title.slice(0, 9) + "..."
            : movie.title}
        </h2>
      </Link>
    </div>
  );
};

export default MovieCard;
