import csrfFetch from './csrf';
import {receiveListings} from './listing'

const RECEIVE_TRIPS = 'trips/receiveTrips'
const RECEIVE_TRIP = 'trips/receiveTrip'
const REMOVE_TRIP = 'trips/removeTrip'

export const receiveTrips = (trips) => {
  return {
    type: RECEIVE_TRIPS,
    payload: trips
  };
};

export const removeTrip = (tripId) => {
  return {
    type: REMOVE_TRIP,
    payload: tripId
  }
}

export const fetchTrips = () => async dispatch => {
  const response = await csrfFetch("/api/trips");
  if (response.ok) {
    const data = await response.json();
    dispatch(receiveTrips(data.trips));
    dispatch(receiveListings(data.listings));
  } else {
    console.log('getTrips error')
  }
}

export const fetchTrip = (tripId) => async dispatch => {
  const response = await csrfFetch(`/api/trips/${tripId}`);
  if (response.ok) {
    const data = await response.json();
    dispatch(receiveTrips(data.trips));
    dispatch(receiveListings(data.listings));
  } else {
    console.log('getTrips error')
  }
}

export const createTrip = (trip) => async dispatch => {
  const response = await csrfFetch(`/api/trips`, {
    method: 'POST',
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json"
    },
    body: JSON.stringify(trip)
  });
  if (response.ok) {
    const data = await response.json();
    dispatch(receiveTrips(data.trips));
    return true
  } else {
    console.log('createTrips error')
    return false
  }
}

export const updateTrip = (trip) => async dispatch => {
  const response = await csrfFetch(`/api/trips/${trip.id}`, {
    method: 'PUT',
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json"
    },
    body: JSON.stringify(trip)
  });
  if (response.ok) {
    const data = await response.json();
    dispatch(receiveTrips(data.trips));
    return true
  } else {
    console.log('createTrips error')
    return false
  }
}

export const deleteTrip = (tripId) => async dispatch => {
  const response = await csrfFetch(`/api/trips/${tripId}`, {
    method: 'DELETE'
  });
  if (response.ok) {
    dispatch(removeTrip(tripId));
  }
}

const initialState = {};

const tripReducer = (state = initialState, action) => {
  switch (action.type) {
    case RECEIVE_TRIPS:
      return { ...state, ...action.payload };
    case RECEIVE_TRIP:
      return { ...state, ...action.payload };
    case REMOVE_TRIP:
      const newState = { ...state }
      delete newState[action.payload]
      return newState
    default:
      return state;
  }
};

export default tripReducer;
