import csrfFetch from './csrf';

const RECEIVE_LISTINGS = 'listing/receiveListing'
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

// export const fetchOwnedListings = (user) => async dispatch => {
//   const response = await csrfFetch("/api/listings");
//   if (response.ok) {
//     const data = await response.json();
//     dispatch(receiveListings(data.listings));
//   } else {
//     console.log('getListings error')
//   }
// }

const initialState = {};

const listingReducer = (state = initialState, action) => {
  switch (action.type) {
    case RECEIVE_LISTINGS:
      return { ...state, ...action.payload };
    default:
      return state;
  }
};

export default listingReducer;
