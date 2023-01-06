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

export default function Map() {
  const {isLoaded} = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_MAPS_API_KEY
  });

  const dispatch = useDispatch()
  const listings = useSelector(state => state.listings)
  // console.log(listings)

  useEffect(() => {
    dispatch(listingsActions.fetchListings())
  },[dispatch])

  if (!isLoaded) return <div>Loading...</div>
  return <MapContainer listings={Object.values(listings)}/>
}

function PriceCard({price, onClick}) {
  return (
    <div className="map-price-card" onClick={onClick}>
      <p>$ {price}</p>
    </div>
  )
}

function MapContainer({listings}) {
  const center = useMemo(() => ({lat:37.773972, lng:-122.431297}), [])

  const [showSingleListingGrid, setShowSingleListingGrid] = useState(false);

  useEffect(() => {
    console.log(showSingleListingGrid)

  },[showSingleListingGrid])

  const priceCardOnClick = (e) => {
    e.preventDefault()
    setShowSingleListingGrid(s => !s)
  }

  return (
    <>
      <GoogleMap zoom={11} center={center} mapContainerClassName="map-container" options={{styles: styles}}>
        {listings.map(list => {
          return (
            <OverlayView key = {list.id} position={{lat:list.latitute, lng:list.longitude}} mapPaneName={OverlayView.OVERLAY_MOUSE_TARGET}>
              <PriceCard price={list.price} onClick={priceCardOnClick} />
            </OverlayView>
          )
        })}
      </GoogleMap>
    </>
  )
}
