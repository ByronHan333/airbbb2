// followed this tutorial
// https://www.youtube.com/watch?v=9e-5QHpadi0&ab_channel=GoogleMapsPlatform
// https://www.youtube.com/watch?v=2po9_CIRW7I&ab_channel=LeighHalliday
// process.env.REACT_APP_MAPS_API_KEY

import { useMemo, useEffect, useState } from "react";
import * as listingsActions from '../../store/listing'
import { useDispatch, useSelector } from "react-redux"
import { GoogleMap, useLoadScript, OverlayView } from "@react-google-maps/api";
import './Map.css'
import {styles} from './MapStyles'
import SingleListingGrid from '../SingleListingGrid'
import { useHistory } from "react-router-dom";
import './PriceInfo.css'

export default function Map({ownedListings}) {
  const dispatch = useDispatch()
  let listings = useSelector(state => state.listings)
  useEffect(() => {
    dispatch(listingsActions.fetchListings())
  },[dispatch])

  if (ownedListings) {
    listings = ownedListings;
  }
  return <MapContainer listings={Object.values(listings)} center={{lat:37.773972, lng:-122.431297}}/>
}

export function PriceInfo({list}) {
  return (
    <div className='price-info'>
      <img className="price-info-photo" src={list.photoUrls[0]} alt="" />
      <p className="bold">{list?.address}</p>
      <p className="">{list?.title}</p>
      <p className="">${list?.price} night</p>
    </div>
  )
}

export function PriceCard({list, onClick}) {
  const [condition, setCondition] = useState(false)
  return (
    <div className="map-price-card cursor" onClick={onClick} onMouseOver={()=>setCondition(true)} onMouseOut={()=>setCondition(false)}>
      <p>$ {list.price}</p>
      {condition ? <PriceInfo list={list}/> : null}
    </div>
  )
}

export function MapContainer({listings, center}) {
  const {isLoaded} = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_MAPS_API_KEY
  });

  const centerM = useMemo(() => (center), [])
  const history = useHistory()

  const priceCardOnClick = (e, list) => {
    e.preventDefault()
    history.push(`/listings/${list.id}`)
    window.scrollTo(0,0)
  }

  if (!isLoaded) return <div>Loading...</div>
  return (
    <>
      <GoogleMap zoom={11} center={centerM} mapContainerClassName="map-container" options={{styles: styles}}>
        {listings.map(list => {
          return (
            <OverlayView key = {list.id} position={{lat:list.latitute, lng:list.longitude}} mapPaneName={OverlayView.OVERLAY_MOUSE_TARGET}>
              <PriceCard list={list} onClick={(e) => priceCardOnClick(e, list)} />
            </OverlayView>
          )
        })}
      </GoogleMap>
    </>
  )
}
