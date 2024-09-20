import React, { useEffect, useState } from "react";
import axios from "axios";
import Slider from "react-slick";

import "./MainPage.css";
import MovieCard from "../Movies/MovieCard";
import LoadingMovieCard from "../Movies/LoadingMovieCard";

const MainPage = ({ handleLike }) => {
  const api_key = "f3855f8bdde19bb1dd9b18e80bc383b6";
  const [popularMovies, setPopularMovies] = useState([]);
  const [weeklyPopularMovies, setWeeklyPopularMovies] = useState([]);
  const [curentCinemaMovies, setCurrentCinemaMovies] = useState([]);

  const [error, setError] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const skeletons = [
    1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20,
  ];

  useEffect(() => {
    setIsLoading(true);
    axios
      .get(`https://api.themoviedb.org/3/movie/popular?api_key=${api_key}`)
      .then((response) => {
        setPopularMovies(response.data.results);
        setIsLoading(false);
      })
      .catch((error) => {
        setError(error.message);
        setIsLoading(false);
      });
    axios
      .get(
        `https://api.themoviedb.org/3/trending/movie/week?api_key=${api_key}`
      )
      .then((response) => {
        setWeeklyPopularMovies(response.data.results);
        setIsLoading(false);
      })
      .catch((error) => {
        setError(error.message);
        setIsLoading(false);
      });
    axios
      .get(`https://api.themoviedb.org/3/movie/now_playing?api_key=${api_key}`)
      .then((response) => {
        setCurrentCinemaMovies(response.data.results);
        setIsLoading(false);
      })
      .catch((error) => {
        setError(error.message);
        setIsLoading(false);
      });
  }, []);

  //console.log(popularMovies);
  console.log(error);

  //settings for movies slider
  const settings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 8,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1650,
        settings: {
          slidesToShow: 7,
          slidesToScroll: 3,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 1450,
        settings: {
          slidesToShow: 6,
          slidesToScroll: 3,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 1140,
        settings: {
          slidesToShow: 5,
          slidesToScroll: 3,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 950,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 3,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 750,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: true,
        },
      },
    ],
  };

  return (
    <div className="movies_container">
      <h2 className="slider_size">Popular Movies</h2>

      {error && popularMovies.length === 0 ? (
        <em>{error}</em>
      ) : (
        <Slider {...settings} className="movies_slider">
          {isLoading &&
            skeletons.map((skeleton) => <LoadingMovieCard key={skeleton} />)}
          {popularMovies?.map((movie) => (
            <MovieCard movie={movie} key={movie.id} handleLike={handleLike} />
          ))}
        </Slider>
      )}

      <h2 className="slider_heading slider_size">Trending This Week</h2>
      {error && weeklyPopularMovies.length === 0 ? (
        <em>{error}</em>
      ) : (
        <Slider {...settings} className="movies_slider">
          {isLoading &&
            skeletons.map((skeleton) => <LoadingMovieCard key={skeleton} />)}
          {weeklyPopularMovies?.map((movie) => (
            <MovieCard movie={movie} key={movie.id} handleLike={handleLike} />
          ))}
        </Slider>
      )}
      <h2 className="slider_heading slider_size">In Cinemas Now</h2>

      {error && curentCinemaMovies.length === 0 ? (
        <em>{error}</em>
      ) : (
        <Slider {...settings} className="movies_slider">
          {isLoading &&
            skeletons.map((skeleton) => <LoadingMovieCard key={skeleton} />)}
          {curentCinemaMovies?.map((movie) => (
            <MovieCard movie={movie} key={movie.id} handleLike={handleLike} />
          ))}
        </Slider>
      )}
    </div>
  );
};

export default MainPage;
