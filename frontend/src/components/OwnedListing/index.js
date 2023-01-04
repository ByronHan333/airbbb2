import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux"
import { Redirect } from "react-router-dom";
import * as listingsActions from '../../store/listing'
import defaultHome from "../../assets/images/defaultHome.png"

const OwnedListing = () => {
  const sessionUser = useSelector(state => state.session.user);
  const listings = useSelector(state => state.listings);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(listingsActions.fetchListings())
  },[dispatch])

  if (!sessionUser) {
    return <Redirect to="/" />
  }

  let ownedListings = Object.values(listings).filter(l => l.hostId==sessionUser.id);

  let homeList = ownedListings?.map(home => {
    return <li key={home.id} className="home-card">
      <ul className="home-card-ul">
        <li><img src={defaultHome} className="home-profile-pic" alt="nan"/></li>
        <li><p>{home.title}</p></li>
        <li><p>{home.description}</p></li>
        <li><p>${home.price} night</p></li>
      </ul>
    </li>
  })

  return (
    <div className="index">
      <ul className="index-ul">
        {homeList}
      </ul>
    </div>
  )
}

export default OwnedListing
