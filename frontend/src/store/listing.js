import csrfFetch from './csrf';

const RECEIVE_LISTINGS = 'listing/createListing'

export const receiveListings = (listings) => {
  return {
    type: RECEIVE_LISTINGS,
    payload: listings
  };
};

const initialState = {};

export const fetchListings = () => async dispatch => {
  const response = await csrfFetch("/api/listings");
  if (response.ok) {
    const data = await response.json();
    dispatch(receiveListings(data.listings));
  } else {
    console.log('getListings error')
  }
};

const listingReducer = (state = initialState, action) => {
  switch (action.type) {
    case RECEIVE_LISTINGS:
      return { ...state, ...action.payload };
    default:
      return state;
  }
};

export default listingReducer;
