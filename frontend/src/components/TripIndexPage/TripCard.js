import { useDispatch, useSelector } from "react-redux"
import * as tripActions from '../../store/trip'
import moment from 'moment'
import './TripIndexPage.css'
import { useHistory } from "react-router-dom";
import './TripCard.css'

export default function TripCard({trip, listing}) {
  const currentDate = moment();
  const dispatch = useDispatch();
  const history = useHistory()

  const handleDelete = (e, trip) => {
    e.preventDefault();
    dispatch(tripActions.deleteTrip(trip.id));
    history.push(`/trips`)
  }

  const handleUpdate = (e, trip) => {
    e.preventDefault();
    history.push(`/trips/${trip.id}/edit`)
  }

  const handleCreateReview = (e) => {
    e.preventDefault();
    history.push(`/reviews/new`, {listing: listing, trip: trip})
  }

  const tripStartDate = moment(trip.startDate, 'YYYY-MM-DD');
  let img = listing?.photoUrls[0];

  let tripBottomRightComponent;
  if (tripStartDate.toDate() > currentDate.toDate()) {
    tripBottomRightComponent = <div className="trip-bottom-right">
      <div className="trip-updatebutton trip-button cursor bold" onClick={(e)=>handleUpdate(e, trip)}>Update Trip</div>
      <div className="trip-deletebutton trip-button cursor bold" onClick={(e)=>handleDelete(e, trip)}>Cancel Trip</div>
      <div className="trip-delete-message">You can change/delete trip until {tripStartDate.subtract(1,'day').format('YYYY-MM-DD')}</div>
    </div>
  } else {
    tripBottomRightComponent = <div className="trip-bottom-right">
        <div className="trip-button cursor bold" onClick={(e)=>handleCreateReview(e, trip, listing)}>Post Review</div>
    </div>
  }

  if (!listing) return <></>

  return (
    <div className="trip">
      <div className="trip-info">
        <div className="trip-top">
          <div className="trip-title medium">{listing.title}</div>
          <div className="trip-address">{listing.address}</div>
        </div>
        <div className="trip-bottom">
          <div className="trip-bottom-left">
            <div className="trip-bottom-left-word">
              <div className="medium">Start date</div>
              <div className="medium">End date</div>
              <div className="medium">Price</div>
              <div className="medium">Num of guests</div>
              <div className="medium">Total fee</div>
            </div>
            <div className="trip-bottom-left-data">
              <div>{trip.startDate}</div>
              <div>{trip.endDate}</div>
              <div>${listing.price} night</div>
              <div>{trip.numGuests}</div>
              <div>${trip.totalPrice}</div>
            </div>
          </div>
          {tripBottomRightComponent}
        </div>
      </div>
      <div className="trip-photo-container">
        <img className="trip-photo" src={img} alt="" />
      </div>
    </div>

  )
}
