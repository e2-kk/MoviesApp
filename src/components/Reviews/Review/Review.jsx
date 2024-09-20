import React from "react";
import "./Review.css";

const Review = ({ review }) => {
  return (
    <div className="review">
      <div>
        <div className="review_details">
          <p>{review.author}</p>
        </div>
        <div className="review_text_container">
          <p className="review_text">
            {review.content.length > 100
              ? review.content.slice(0, 150) + "..."
              : review.content}
          </p>
        </div>
      </div>
      <div className="review_date">
        <p>{review.created_at.slice(0, 10)}</p>
      </div>
    </div>
  );
};

export default Review;
