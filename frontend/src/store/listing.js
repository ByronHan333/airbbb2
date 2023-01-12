import csrfFetch from './csrf';

const RECEIVE_LISTINGS = 'listing/receiveListings'
const RECEIVE_LISTING = 'listing/receiveListing'
// const RECEIVE_OWNED_LISTINGS = 'listing/receiveOwnedListing'

export const receiveListings = (listings) => {
  return {
    type: RECEIVE_LISTINGS,
    payload: listings
  };
};

// export const receiveOwnedListings = (listings) => {
//   return {
//     type: RECEIVE_OWNED_LISTINGS,
//     payload: listings
//   };
// }

export const fetchListings = () => async dispatch => {
  const response = await csrfFetch("/api/listings");
  if (response.ok) {
    const data = await response.json();
    dispatch(receiveListings(data.listings));
  } else {
    console.log('getListings error')
  }
};

export const fetchListing = (listingId) => async dispatch => {
  const response = await csrfFetch(`/api/listings/${listingId}`);
  if (response.ok) {
    const data = await response.json();
    dispatch(receiveListings(data.listings));
  } else {
    console.log('getListing error')
  }
};


const initialState = {};

const listingReducer = (state = initialState, action) => {
  switch (action.type) {
    case RECEIVE_LISTINGS:
      return { ...state, ...action.payload };
      case RECEIVE_LISTING:
        return { ...state, ...action.payload };
    default:
      return state;
  }
};

export default listingReducer;
