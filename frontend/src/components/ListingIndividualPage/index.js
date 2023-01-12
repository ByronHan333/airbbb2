import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useHistory, useParams } from "react-router-dom"
import * as listingsActions from '../../store/listing'
import * as tripsActions from '../../store/trip'
import './ListingIndividualPage.css'
import moment from 'moment';
import ReservationForm from './ReservationForm'
import {MapContainer} from '../Map'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'


export default function ListingIndividualPage() {
  const { listingId } = useParams();
  const sessionUser = useSelector(state => state.session.user);
  const listing = useSelector(state => state.listings[listingId])
  const dispatch = useDispatch();
  const position= {lat:listing?.latitute, lng:listing?.longitude}

  useEffect(() => {
    dispatch(listingsActions.fetchListing(listingId));
  }, [dispatch, listingId])

  if (!listing) return <></>

  let img1 = listing.photoUrls[0];
  let img2 = listing.photoUrls[1];
  let img3 = listing.photoUrls[2];
  let img4 = listing.photoUrls[3];
  let img5 = listing.photoUrls[4];

  return (
    <div className="list-individual">
      <div className="listing-title">
        <h1>{listing.title}</h1>
      </div>
      <div className="listing-details">
        <h1>{listing.address}</h1>
      </div>
      <div className="listing-image-grid">
        <img className="image-grid-col-2 image-grid-row-2" src={img1} alt="" />
        <img src={img2} alt="" />
        <img src={img3} alt="" />
        <img src={img4} alt="" />
        <img src={img5} alt="" />
      </div>
      <div className="listing-description-reserve">
        <div className="listing-desc">
          <h1 className="listing-desc-1">Entire Home hosted by Allen</h1>
          <div className='solid-line'></div>
          <h1 className="listing-desc-2">{listing.description}</h1>
          <div className='solid-line'></div>
          <h1 className="listing-desc-3">{listing.address}</h1>
          <h1 className="listing-desc-4">$ {listing.price} / night</h1>
          <div className='solid-line'></div>
          <div className="listing-desc-567">
            <h1 className="listing-desc-5">{listing.hasWifi ? <i className="fa-solid fa-wifi"/> : null}  WiFi</h1>
            <h1 className="listing-desc-6">{listing.hasAc ? <i className="fa-solid fa-wind"/> : null}  AC</h1>
            <h1 className="listing-desc-7"><i className="fa-solid fa-car"></i> Parking</h1>
            <h1 className="listing-desc-7"><i className="fa-solid fa-cat"></i> Pet Friendly</h1>
            <h1 className="listing-desc-7"><i className="fa-solid fa-bed"></i> {listing.numBeds} Beds</h1>
          </div>
        </div>
        <div className="listing-reserve">
          <ReservationForm trip={null} listing={listing} sessionUser={sessionUser}/>
        </div>
      </div>
      <div className="listing-map">
        <MapContainer listings={[listing]} center={position}/>
      </div>

    </div>
  )
}
