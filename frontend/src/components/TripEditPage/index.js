import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import ReservationForm from '../ListingIndividualPage/ReservationForm'
import * as tripsActions from '../../store/trip';


export default function TripEditPage(){
  const sessionUser = useSelector(state => state.session.user)
  const {tripId} = useParams()
  const trip = useSelector(state => state.trips[tripId])
  const listing = useSelector(state => state.listings[trip?.listingId])
  const dispatch = useDispatch()

  console.log(trip)
  console.log(listing)

  useEffect(()=>{
    dispatch(tripsActions.fetchTrip(tripId));
  },[dispatch])

  if (!trip || !listing) return <></>

  return (
    <div>
      <ReservationForm trip={trip} listing={listing} sessionUser={sessionUser}/>
    </div>
  )
}
