import csrfFetch from './csrf';
import {receiveListings} from './listing'

const RECEIVE_REVIEWS = 'trips/receiveReviews';
const REMOVE_REVIEW = 'trips/removeReview';

export const receiveReviews = (reviews) => {
  return {
    type: RECEIVE_REVIEWS,
    payload: reviews
  };
};

export const removeReview = (reviewId) => {
  return {
    type: REMOVE_REVIEW,
    payload: reviewId
  }
}

export const fetchReviews = (listingId) => async dispatch => {
  const response = await csrfFetch(`/api/reviews/${listingId}`);
  if (response.ok) {
    const data = await response.json();
    dispatch(receiveReviews(data.reviews));
  } else {
    console.log('getReviews error')
  }
}

export const createReview = (review) => async dispatch => {
  const response = await csrfFetch(`/api/reviews`, {
    method: 'POST',
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json"
    },
    body: JSON.stringify(review)
  });
  if (response.ok) {
    // const data = await response.json();
    // dispatch(receiveTrips(data.trips));
    return true
  } else {
    console.log('createTrips error')
    return false
  }
}

export const deleteReview = (reviewId) => async dispatch => {
  const response = await csrfFetch(`/api/trips/${reviewId}`, {
    method: 'DELETE'
  });
  if (response.ok) {
    dispatch(removeReview(reviewId));
  }
}

const initialState = {};

const ReviewReducer = (state = initialState, action) => {
  switch (action.type) {
    case RECEIVE_REVIEWS:
      return { ...state, ...action.payload };
    case REMOVE_REVIEW:
      const newState = { ...state }
      delete newState[action.payload]
      return newState
    default:
      return state;
  }
};

export default ReviewReducer;
