import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import "./MovieList.css";
import MovieCard from "./MovieCard";
import LoadingMovieCard from "./LoadingMovieCard";

const api_key = "f3855f8bdde19bb1dd9b18e80bc383b6";

const MovieList = ({ likedMovies, setLikedMovies, handleLike }) => {
  //manage the state of movies' categories
  const [categories, setCategories] = useState([]);
  const [currentCategory, setCurrentCategory] = useState([]);
  const [movies, setMovies] = useState([]);
  const [sortingOption, setSortingOption] = useState({
    by: "default",
    order: "asc",
  });
  const [sortedMovies, setSortedMovies] = useState([]);

  const [isLoading, setIsLoading] = useState(false);

  const [pageNum, setPage] = useState(1);

  const navigate = useNavigate();
  const [totalPages, setTotalPages] = useState(0);

  const skeletons = [
    1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20,
  ];

  //MOVIES DATA FETCHING

  //fetch movies' categories on the 1st components render
  useEffect(() => {
    fetch(`https://api.themoviedb.org/3/genre/movie/list?api_key=${api_key}`)
      .then((response) => response.json())
      .then((data) => {
        setCategories(data.genres);
      });
  }, []);

  //get the id of current category
  const handleCategoryClick = (category) => {
    setCurrentCategory(category.id);
    setPage(1); //when state of the category changes, reset the page state to 1
    setMovies([]); //when state of the category changes, empty movies array
    setSortedMovies([]);
    setSortingOption({ by: "default", order: "asc" });
  };

  useEffect(() => {
    setIsLoading(true);
    if (currentCategory.length !== 0) {
      axios
        .get(
          `https://api.themoviedb.org/3/discover/movie?api_key=${api_key}&with_genres=${currentCategory}&primary_release_date.gte=2000-01-01&primary_release_date.lte=2024-12-31&with_original_language=en&vote_count.gte=180.0&page=${pageNum}`
        )
        .then((response) => {
          if (movies.length !== 0) {
            setMovies((prevMovies) => [
              ...prevMovies,
              ...response.data.results,
            ]);
          } else {
            setMovies(response.data.results);
            setIsLoading(false);
          }

          setTotalPages(response.data.total_pages);
          console.log(response.data);
          //console.log(totalPages);
          setIsLoading(false);
        });
    } else {
      axios
        .get(
          `https://api.themoviedb.org/3/discover/movie?api_key=${api_key}&with_original_language=en&primary_release_date.gte=2000-01-01&primary_release_date.lte=2024-12-31&vote_count.gte=180.0&page=${pageNum}`
        )
        .then((response) => {
          if (movies.length !== 0) {
            setMovies((prevMovies) => [
              ...prevMovies,
              ...response.data.results,
            ]);
          } else {
            setMovies(response.data.results);
            setIsLoading(false);
          }
          setTotalPages(response.data.total_pages);

          //console.log(totalPages);
          setIsLoading(false);
        });
    }
  }, [currentCategory, pageNum]);

  //console.log(movies);

  //handle Page Change

  const handlePageChange = () => {
    //check if movie data is available and page number is less than total pages number
    if (!isLoading && movies && pageNum < totalPages) {
      //increase the value of page by 1
      const nextPage = pageNum + 1;
      //set page state with the next page
      setPage(nextPage);
      //navigate to the next page, use nextPage instead of pageNum to navigate to correct new page
      navigate(`?&with_genres=${currentCategory}&page=${nextPage}`);
    }
  };

  //SORTING MOVIES FEATURE

  //get movie sorting option
  const handleOptionChange = (event) => {
    const { name, value } = event.target;
    setSortingOption((prev) => {
      return { ...prev, [name]: value };
    });
    setSortedMovies([]);
  };

  //sort movies API request by sorting option
  useEffect(() => {
    if (sortingOption.by === "release_date" && sortingOption.order === "asc") {
      axios
        .get(
          `https://api.themoviedb.org/3/discover/movie?api_key=${api_key}&with_genres=${currentCategory}&with_origin_country=US&sort_by=primary_release_date.asc&with_original_language=en&vote_count.gte=180.0&primary_release_date.gte=2000-01-01&primary_release_date.lte=2024-12-31&page=${pageNum}`
        )
        .then((response) => {
          if (sortedMovies.length !== 0) {
            setSortedMovies((prevMovies) => [
              ...prevMovies,
              ...response.data.results,
            ]);
          } else {
            setSortedMovies(response.data.results);
          }
        });
    } else if (
      sortingOption.by === "release_date" &&
      sortingOption.order === "desc"
    ) {
      axios
        .get(
          `https://api.themoviedb.org/3/discover/movie?api_key=${api_key}&with_genres=${currentCategory}&with_origin_country=US&sort_by=primary_release_date.desc&with_original_language=en&vote_count.gte=180.0&primary_release_date.gte=2000-01-01&primary_release_date.lte=2024-12-31&page=${pageNum}`
        )
        .then((response) => {
          if (sortedMovies.length !== 0) {
            setSortedMovies((prevMovies) => [
              ...prevMovies,
              ...response.data.results,
            ]);
          } else {
            setSortedMovies(response.data.results);
          }
        });
    } else if (
      sortingOption.by === "vote_average" &&
      sortingOption.order === "asc"
    ) {
      axios
        .get(
          `https://api.themoviedb.org/3/discover/movie?api_key=${api_key}&with_genres=${currentCategory}&with_origin_country=US&sort_by=vote_average.asc&with_original_language=en&vote_count.gte=180.0&primary_release_date.gte=2000-01-01&primary_release_date.lte=2024-12-31&page=${pageNum}`
        )
        .then((response) => {
          if (sortedMovies.length !== 0) {
            setSortedMovies((prevMovies) => [
              ...prevMovies,
              ...response.data.results,
            ]);
          } else {
            setSortedMovies(response.data.results);
          }
        });
    } else if (
      sortingOption.by === "vote_average" &&
      sortingOption.order === "desc"
    ) {
      axios
        .get(
          `https://api.themoviedb.org/3/discover/movie?api_key=${api_key}&with_genres=${currentCategory}&with_origin_country=US&sort_by=vote_average.desc&with_original_language=en&vote_count.gte=180.0&primary_release_date.gte=2000-01-01&primary_release_date.lte=2024-12-31&page=${pageNum}`
        )
        .then((response) => {
          if (sortedMovies.length !== 0) {
            setSortedMovies((prevMovies) => [
              ...prevMovies,
              ...response.data.results,
            ]);
          } else {
            setSortedMovies(response.data.results);
          }
        });
    } else {
      setSortedMovies(movies);
    }
  }, [sortingOption, movies, currentCategory]);

  //SAVING MOVIES TO WATCHLIST FEATURE

  return (
    <div className="movies_data_container">
      <div className="movie_categories">
        <ul className="categories">
          {categories.map((category, index) => (
            <li
              className={currentCategory === category.id ? "active" : ""}
              key={index}
              onClick={() => {
                handleCategoryClick(category);
              }}
            >
              {category.name}
            </li>
          ))}
        </ul>

        <div className="movie_options">
          <select
            className="option"
            name="by"
            onChange={handleOptionChange}
            value={sortingOption.by}
          >
            <option value="default">Sort By</option>
            <option value="release_date">Release Date</option>
            <option value="vote_average">Rating</option>
          </select>

          <select
            className="option"
            name="order"
            onChange={handleOptionChange}
            value={sortingOption.order}
          >
            <option value="asc">Asceding</option>
            <option value="desc">Descending</option>
          </select>
        </div>
      </div>
      <div>
        <div className="movie_list">
          {isLoading &&
            skeletons.map((skeletonNum) => (
              <LoadingMovieCard key={skeletonNum} />
            ))}

          {sortedMovies.map((movie) => (
            <MovieCard key={movie.id} movie={movie} handleLike={handleLike} />
          ))}
        </div>

        <button onClick={handlePageChange} className="btn">
          Load More
        </button>
      </div>
    </div>
  );
};

export default MovieList;
