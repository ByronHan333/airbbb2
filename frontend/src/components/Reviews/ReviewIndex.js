import { useDispatch, useSelector } from "react-redux";
import './ReviewIndex.css'
import * as reviewActions from "../../store/review";
import { useEffect } from "react";
import { useHistory } from "react-router-dom";
import ReviewFormModal from "../ReviewFormModal";

function ReviewCard({review}) {
  const sessionUser = useSelector(state => state.session.user);
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
      {sessionUser.id == review.userId ? <div className="review-card-delete" onClick={(e) => deleteReview(e, review)}>Delete Review</div> : <div></div>}
    </div>
  )
}

export default function ReviewIndex({reviews, listingId}) {
  const history = useHistory()
  const createReview = () => {
    history.push(`/review/${listingId}/new`)
  }

  return (
    <div className="review-index">
      <div className="reviews-all">
        {Object.values(reviews).map(review => {
          return <div><ReviewCard review={review} /></div>
        })}
      </div>
        {<ReviewFormModal />}
    </div>
  )
}
