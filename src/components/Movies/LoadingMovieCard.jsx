import React from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const LoadingMovieCard = () => {
  return <Skeleton className="loading_movie_card" width="80%" height="220px" />;
};

export default LoadingMovieCard;
