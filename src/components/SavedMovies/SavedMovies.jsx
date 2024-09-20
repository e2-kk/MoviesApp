import React from "react";

import "./SavedMovies.css";
import SavedMovie from "./SavedMovie";

const SavedMovies = ({ likedMovies, deleteMovie }) => {
  console.log(likedMovies);
  return (
    <div className="saved_movies_container">
      {likedMovies.map((likedMovie) => (
        <SavedMovie
          key={likedMovie.id}
          likedMovie={likedMovie}
          deleteMovie={deleteMovie}
        />
      ))}
    </div>
  );
};

export default SavedMovies;
