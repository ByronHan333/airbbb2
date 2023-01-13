import { useDispatch, useSelector } from "react-redux";
import './ReviewIndex.css'
import * as reviewActions from "../../store/review";
import { useEffect } from "react";

function ReviewCard({review}) {
  const rating = ((review.accuracy +
    review.arrival +
    review.cleaniness +
    review.communication +
    review.overall +
    review.location) / 6).toFixed(2);
  const content = review.content;
  const dispatch = useDispatch();

  const deleteReview = (e, review) => {
    dispatch(reviewActions.deleteReview(review.id));
  }

  return (
    <div className="review-card">
      <div className="review-card-rating-avg">{rating}</div>
      <div className="review-card-content">{content}</div>
      {/* <div className="review-card-update" onClick={(e) => updateReview(e, review)}>Update Review</div> */}
      <div className="review-card-delete" onClick={(e) => deleteReview(e, review)}>Delete Review</div>
    </div>
  )
}

export default function ReviewIndex({reviews}) {
  console.log(reviews)
  return (
    <div className="review-index">
      {Object.values(reviews).map(review => {
        return <div><ReviewCard review={review} /></div>
      })}
    </div>
  )
}
