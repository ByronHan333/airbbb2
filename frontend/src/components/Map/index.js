// followed this tutorial
// https://www.youtube.com/watch?v=9e-5QHpadi0&ab_channel=GoogleMapsPlatform
// https://www.youtube.com/watch?v=2po9_CIRW7I&ab_channel=LeighHalliday
// process.env.REACT_APP_MAPS_API_KEY

import { useMemo, useEffect } from "react";
import * as listingsActions from '../../store/listing'
import { useDispatch, useSelector } from "react-redux"
import { GoogleMap, useLoadScript, OverlayView } from "@react-google-maps/api";
import './Map.css'

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

  let data = [
    {price: 100, lat:37.773972, lng:-122.431297},
    {price: 200, lat:37.888036, lng:-122.462502},
    {price: 300, lat:37.755798, lng:-122.508037},
    {price: 400, lat:37.794965, lng:-122.244873},
    {price: 500, lat:37.676954, lng:-122.394723}
  ]

  if (!isLoaded) return <div>Loading...</div>
  return <MapContainer listings={Object.values(listings)}/>
}

function PriceCard({price}) {
  return (
    <div className="map-price-card">
      <p>$ {price}</p>
    </div>
  )
}

function MapContainer({listings}) {
  const center = useMemo(() => ({lat:37.773972, lng:-122.431297}), [])

  return (
    <>
      <h1>Map</h1>
      <GoogleMap zoom={11} center={center} mapContainerClassName="map-container">
        {listings.map(list => {
          return (
            <OverlayView position={{lat:list.latitute, lng:list.longitude}} mapPaneName={OverlayView.OVERLAY_MOUSE_TARGET}>
              <PriceCard price={list.price} />
            </OverlayView>
          )
        })}
      </GoogleMap>
    </>
  )
}
