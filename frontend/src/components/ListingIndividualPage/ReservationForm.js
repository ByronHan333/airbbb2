import LoginFormModal from '../LoginFormModal'
import moment from 'moment';
import { useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import * as tripsActions from '../../store/trip';
import './ReservationForm.css'


export default function ReservationForm({trip, listing, sessionUser}) {
  const [startDate, setStartDate] = useState();
  const [endDate, setEndDate] = useState();
  const [numGuests, setNumGuests] = useState(1);
  const history = useHistory()
  const dispatch = useDispatch();
  const startMDate = moment(startDate, 'YYYY-MM-DD')
  const endMDate = moment(endDate, 'YYYY-MM-DD')
  const [errors, setErrors] = useState()
  let numDays = (endMDate-startMDate)/(86400000) ? (endMDate-startMDate)/(86400000) : 0
  const currentDate = new Date()
  const {tripId} = useParams()

  const handleSubmit = (e) => {
    setErrors()
    if (!startDate || !endDate) {
      setErrors('Date is not entered')

    } else if (sessionUser && !tripId) {
      e.preventDefault();
      const result = dispatch(tripsActions.createTrip({
        user_id: sessionUser.id,
        listing_id: listing.id,
        start_date: startDate,
        end_date: endDate,
        num_guests: numGuests,
        total_price: listing.price*numDays
      }))
      if (result) {
        history.push("/trips");
      }
    } else if (sessionUser && tripId) {
      e.preventDefault();
      const result = dispatch(tripsActions.updateTrip({
        id: tripId,
        user_id: sessionUser.id,
        listing_id: listing.id,
        start_date: startDate,
        end_date: endDate,
        num_guests: numGuests,
        total_price: listing.price*numDays
      }))
      if (result) {
        history.push("/trips");
      }
    }

  }

  return (
    <form className='reservation-form'>
      <div className="form-night-price medium">${listing.price} night</div>
      <div className="form-input">
        <div className="form-input-date">
          <div className='form-checkin'>
            <div>CHECK-IN</div>
            <input placeholder={currentDate} className="date-input" type="date" value={startDate}
            onChange={(e) => setStartDate(e.target.value)} required
            min={moment().format("YYYY-MM-DD")}/>
          </div>
          <div className='form-checkout'>
            <div>CHECK-OUT</div>
            <input placeholder={trip?.endDate} className="date-input" type="date" value={endDate}
            onChange={(e) => {
              setEndDate(e.target.value)
            }} required
            min={startDate ? startDate : moment().format("YYYY-MM-DD")}/>
          </div>
        </div>
        <div className="form-num-guest">
          <div>GUESTS</div>
          <label>
            <select className="num-guests" onChange={(e) => setNumGuests(e.target.value)}>
            {[...Array(listing.numBeds).keys()].map(n => {
              return <option value={n+1} key={n+1} >{n+1}</option>
            })}
            </select>
          </label>
        </div>
      </div>
      <div className="form-night-total">
        <div className="form-night-total-left">$ {listing.price} x {numDays} nights</div>
        <div className="form-night-total-left">$ {listing.price * numDays}</div>
      </div>
      <div className="form-service-fee">
        <div className="form-service-fee-left">Service fee:</div>
        <div className="form-service-fee-left">$ {20 * numDays}</div>
      </div>
      <div className="form-total-cost">
        <div className="form-total-cost-left medium">Total cost:</div>
        <div className="form-total-cost-left medium">$ {(listing.price+20)*numDays}</div>
      </div>
      <div className="form-error">
        {errors ? errors : " "}
      </div>
      <div className="form-button">
        {(sessionUser) ? <div className="form-submit" onClick={handleSubmit}>Reserve</div> : <LoginFormModal text={"Reserve"} />}
      </div>
    </form>
  )
}
