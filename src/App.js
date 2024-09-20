import React, { useState, useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import "./App.css";
import MovieList from "./components/Movies/MovieList";
import Navbar from "./components/Navbar/Navbar";
import MoviePage from "./components/Movies/MoviePage";
import MainPage from "./components/MainPage/MainPage";
import SavedMovies from "./components/SavedMovies/SavedMovies";
import About from "./components/About/About";

//get saved movies from user's local storage
const savedMovies = localStorage.getItem("likedMovies");
console.log(savedMovies);

function App() {
  const [likedMovies, setLikedMovies] = useState(JSON.parse(savedMovies) || []);

  //when there's a change in likedMovies, save likedMovies to user's local storage
  useEffect(() => {
    localStorage.setItem("likedMovies", JSON.stringify(likedMovies));
  }, [likedMovies]);

  //get liked movie
  const handleLike = (movie) => {
    const addedMovies = [...likedMovies];
    const movieIndex = addedMovies.findIndex(
      (item) => item.movie.id === movie.id
    );
    if (movieIndex === -1) {
      addedMovies.push({ movie: movie });
      toast.success(movie.title + " " + "was added to Saved Movies", {
        position: "bottom-right",
      });
    } else {
      toast.error(movie.title + " " + "is already added to Saved Movies", {
        position: "bottom-right",
      });
    }

    setLikedMovies(addedMovies);
  };

  //delete movie from likedMovies

  const deleteMovie = (movie) => {
    const addedMovies = [...likedMovies];

    const newMovies = addedMovies.filter((item) => item !== movie);
    toast.success(movie.movie.title + " " + "was removed from Saved Movies", {
      position: "bottom-right",
    });

    setLikedMovies(newMovies);
  };

  return (
    <div className="App">
      <Navbar likedMovies={likedMovies.length} />
      <ToastContainer />
      <Routes>
        <Route
          path="/all_movies"
          element={
            <MovieList
              setLikedMovies={setLikedMovies}
              likedMovies={likedMovies}
              handleLike={handleLike}
            />
          }
        ></Route>
        <Route path="/movie/:id" element={<MoviePage />}></Route>
        <Route path="/" element={<MainPage handleLike={handleLike} />}></Route>
        <Route
          path="saved_movies"
          element={
            <SavedMovies likedMovies={likedMovies} deleteMovie={deleteMovie} />
          }
        ></Route>
        <Route path="about_project" element={<About />}></Route>
      </Routes>
    </div>
  );
}

export default App;
