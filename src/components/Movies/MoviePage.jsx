import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import "./MoviePage.css";
import star from "../../assets/star.png";
import MovieCard from "./MovieCard";
import Review from "../Reviews/Review/Review";

const MoviePage = () => {
  const [currentMovie, setCurrentMovie] = useState(null);
  const [videos, setVideos] = useState([]);
  const [trailers, setTrailers] = useState([]);
  const [similarMovies, setSimilarMovies] = useState([]);
  const [reviews, setReviews] = useState([]);

  //get id of selected movie from URL
  const { id } = useParams();

  useEffect(() => {
    axios
      .get(
        `https://api.themoviedb.org/3/movie/${id}?api_key=f3855f8bdde19bb1dd9b18e80bc383b6`
      )
      .then((response) => setCurrentMovie(response.data));

    axios
      .get(
        `https://api.themoviedb.org/3/movie/${id}/videos?api_key=f3855f8bdde19bb1dd9b18e80bc383b6`
      )
      .then((response) => setVideos(response.data.results));

    axios
      .get(
        `https://api.themoviedb.org/3/movie/${id}/similar?api_key=f3855f8bdde19bb1dd9b18e80bc383b6&with_original_language=en`
      )
      .then((response) => setSimilarMovies(response.data.results));

    axios
      .get(
        `https://api.themoviedb.org/3/movie/${id}/reviews?api_key=f3855f8bdde19bb1dd9b18e80bc383b6&language=en-US&page=1`
      )
      .then((response) => setReviews(response.data.results));
  }, [id]);

  //filter videos to have only trailer type videos
  useEffect(() => {
    setTrailers(videos?.filter((video) => video.type === "Trailer"));
  }, [videos]);

  //filter similar movies

  console.log(similarMovies);

  //define settings for similar movies slider
  const settings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 8,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1600,
        settings: {
          slidesToShow: 7,
          slidesToScroll: 3,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 1300,
        settings: {
          slidesToShow: 6,
          slidesToScroll: 3,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 1100,
        settings: {
          slidesToShow: 5,
          slidesToScroll: 3,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 940,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 3,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 630,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: true,
        },
      },
    ],
  };

  const review_settings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 550,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          infinite: true,
          dots: true,
        },
      },
    ],
  };
  return (
    <div className="details_container">
      <div className="backdrop_image_container">
        <img
          className="backdrop_image"
          src={`https://image.tmdb.org/t/p/original${currentMovie?.backdrop_path}`}
        ></img>

        <div className="movie_data_container">
          <div className="poster_image_container">
            <img
              className="poster_image"
              src={`https://image.tmdb.org/t/p/w500${currentMovie?.poster_path}`}
            ></img>
          </div>
          <div className="movie_data">
            <h3>{currentMovie?.original_title}</h3>

            <p className="movie_tagline">{currentMovie?.tagline}</p>
            <div className="rating">
              <img src={star} alt="star"></img>
              <p>{Math.round(currentMovie?.vote_average * 10) / 10}</p>
              <p className="vote">({currentMovie?.vote_count}) votes</p>
            </div>
            <p className="runtime">
              <strong>Runtime:</strong> {currentMovie?.runtime} minutes
            </p>
            <p className="release_date">
              <strong>Release date:</strong> {currentMovie?.release_date}
            </p>
            <div className="movie_genres">
              <p className="genre">
                <strong>Genre:</strong>
              </p>
              {currentMovie?.genres.map((genre) => (
                <p key={genre.id}>{genre.name}</p>
              ))}
            </div>
            <div className="overview">
              <h4>Overview</h4>
              <p className="overview">{currentMovie?.overview}</p>
            </div>
            <div className="trailer">
              <h4> Trailer</h4>
              <iframe
                className="trailer_iframe"
                allow="encrypted-media"
                allowFullScreen
                src={`https://www.youtube.com/embed/${trailers[0]?.key}`}
              ></iframe>
            </div>
          </div>
        </div>

        <div className="recomended_movies">
          <h4>Similar movies to {currentMovie?.original_title}</h4>
          <div className="slider_wrapper">
            {similarMovies.length !== 0 ? (
              <Slider {...settings}>
                {similarMovies?.map((movie) => (
                  <MovieCard movie={movie} key={movie.id} />
                ))}
              </Slider>
            ) : (
              <p>Sorry, no available similar movies</p>
            )}
          </div>
        </div>
        {
          <div className="reviews">
            <h4>Reviews</h4>
            {reviews?.length !== 0 ? (
              <Slider {...review_settings}>
                {reviews.map((review, index) => (
                  <Review review={review} key={index} />
                ))}
              </Slider>
            ) : (
              <p>Sorry, no reviews yet</p>
            )}
          </div>
        }
      </div>
    </div>
  );
};

export default MoviePage;
