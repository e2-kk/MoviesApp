import React from "react";
import "./SavedMovie.css";
import star from "../../assets/star.png";
import trash from "../../assets/trash.png";

const SavedMovie = ({ likedMovie, deleteMovie }) => {
  return (
    <div className="likedMovie_container">
      <div className="likedMovie_image">
        <img
          src={`https://image.tmdb.org/t/p/w500${likedMovie.movie.poster_path}`}
          alt="movie_poster"
        ></img>
      </div>
      <div className="likedMovie_details">
        <div className="title_and_icons">
          <h5>{likedMovie.movie.title}</h5>
          <div className="trash">
            <img
              src={trash}
              alt="trash"
              onClick={() => {
                deleteMovie(likedMovie);
              }}
            ></img>
          </div>
        </div>
        <p className="movie_date">
          <strong className="release_date">Release Date:</strong>{" "}
          {likedMovie.movie.release_date}
        </p>
        <div className="likedMovie_subdetails">
          <div className="star">
            <img src={star} alt="star"></img>
          </div>
          <p className="rating">
            {Math.round(likedMovie.movie.vote_average * 10) / 10}
          </p>

          <p>{likedMovie.movie.vote_count}(votes)</p>
        </div>
        <p className="movie_overview">{likedMovie.movie.overview}</p>
      </div>
    </div>
  );
};

export default SavedMovie;
