import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import * as tripActions from '../../store/trip'
import { Modal } from '../../context/Modal';
import LoginForm from '../LoginFormModal/LoginForm';
import moment from 'moment'
import './TripIndexPage.css'
import { useHistory } from "react-router-dom";
import TripCard from './TripCard'

export default function TripIndexPage() {
  const sessionUser = useSelector(state => state.session.user);
  const trips = Object.values(useSelector(state => state.trips));
  const listings = useSelector(state => state.listings);
  const dispatch = useDispatch();
  const currentDate = moment();

  useEffect(() => {
    dispatch(tripActions.fetchTrips());
  }, [dispatch, sessionUser])

  if (!sessionUser) return (
    <Modal>
      <LoginForm />
    </Modal>
  )

  if (!trips) return <></>
  if (!listings) return <></>

  return (
    <div className="trip-index">
      <div className="trip-message medium">Welcome Back! You have {trips.length} trips with Airbbb.</div>
      <div className="trip-current-upcoming-trips">
        <div className="trip-upcoming-message medium">Upcoming trips</div>
        {trips.map(trip => {
          const tripStartDate = moment(trip.startDate, 'YYYY-MM-DD');
          if (tripStartDate.toDate() > currentDate.toDate()) {
            return <TripCard key={trip.id} trip={trip} listing={listings[trip.listingId]} />
          }
        })}
      </div>
      <div className="trip-past-trips">
        <div className="trip-prev-message medium">Current and past trips</div>
        {trips.map(trip => {
          const tripStartDate = moment(trip.startDate, 'YYYY-MM-DD');
          if (tripStartDate.toDate() <= currentDate.toDate()) {
            return <TripCard key={trip.id} trip={trip} listing={listings[trip.listingId]} />
          }
        })}
      </div>
    </div>
  )
}
