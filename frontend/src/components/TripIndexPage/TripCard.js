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

  let tripBottomRightComponent;
  if (tripStartDate > currentDate) {
    tripBottomRightComponent = <div>
      <div className="trip-updatebutton cursor" onClick={(e)=>handleUpdate(e, trip)}>Update Trip</div>
      <div className="trip-deletebutton cursor" onClick={(e)=>handleDelete(e, trip)}>Cancel Trip</div>
      <div></div>
    </div>
  } else {
    tripBottomRightComponent = <div>
      <div>Post Review</div>
    </div>
  }

  return (
    <div className="trip">
      <div className="trip-info">
        <div className="trip-top">
          <div>{listing.title}</div>
          <div>{listing.address}</div>
        </div>
        <div className="trip-bottom">
          <div className="trip-bottom-left">
            <div>{trip.startDate}</div>
            <div>{trip.endDate}</div>
            <div>{listing.price}</div>
            <div>{trip.totalPrice}</div>
          </div>
          <div className="trip-bottom-right">
            <div>{tripBottomRightComponent}</div>
          </div>
        </div>
      </div>
      <div className="trip-photo-container">
        <img className="trip-photo" src={img} alt="" />
      </div>
    </div>

  )
}
