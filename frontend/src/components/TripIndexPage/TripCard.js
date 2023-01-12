import { useDispatch, useSelector } from "react-redux"
import * as tripActions from '../../store/trip'
import moment from 'moment'
import './TripIndexPage.css'
import { useHistory } from "react-router-dom";
import './TripCard.css'

export default function TripCard({trip, listing}) {
  const currentDate = moment().toDate() ;
  const dispatch = useDispatch();
  const history = useHistory()

  const handleDelete = (e, trip) => {
    e.preventDefault();
    dispatch(tripActions.deleteTrip(trip.id));
  }

  const handleUpdate = (e, trip) => {
    e.preventDefault();
    history.push(`/trips/${trip.id}/edit`)
  }

  const tripStartDate = moment(trip.startDate, 'YYYY-MM-DD').toDate();
  // console.log(tripStartDate > currentDate)
  console.log(listing);
  console.log(trip)
  let img = listing?.photoUrls[0];

  return (
    <div className="trip">
      <div className="trip-info">
        <div className="trip-user">{trip.userId}</div>
        <div className="trip-listing">{trip.listingId}</div>
        <div className="trip-startdate">{trip.startDate}</div>
        <div className="trip-enddate">{trip.endDate}</div>
        <div className="trip-totalprice">$ {trip.totalPrice}</div>
        {tripStartDate >= currentDate ?
          <div className="trip-updatebutton cursor" onClick={(e)=>handleUpdate(e, trip)}>Update Trip</div> :
          <div>Passed Update Deadline</div>}
        {tripStartDate >= currentDate ?
          <div className="trip-deletebutton cursor" onClick={(e)=>handleDelete(e, trip)}>Cancel Trip</div> :
          <div>Passed Cancel Deadline</div>}
      </div>
      <div className="trip-photo-container">
        <img className="trip-photo" src={img} alt="" />
      </div>
    </div>

  )
}
