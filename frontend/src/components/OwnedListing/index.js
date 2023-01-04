import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux"
import * as listingsActions from '../../store/listing'
import defaultHome from "../../assets/images/defaultHome.png"

const OwnedListing = () => {
  const sessionUser = useSelector(state => state.session.user);
  const listings = useSelector(state => state.listings);
  const [ownedListings, setOwnedListings] = useState();
  const dispatch = useDispatch();

  // let ownedListings;

  useEffect(() => {
    if (sessionUser) {
      dispatch(listingsActions.fetchListings())
      setOwnedListings(Object.values(listings).filter(l => l.hostId==sessionUser.id))
      console.log(ownedListings)
    }
  },[])

  let homeList;
  console.log(ownedListings)

  homeList = ownedListings?.map(home => {
    return <li key={home.id} className="home-card">
      <ul className="home-card-ul">
        <li><img src={defaultHome} className="home-profile-pic" alt="nan"/></li>
        <li><p>{home.title}</p></li>
        <li><p>{home.description}</p></li>
        <li><p>${home.price} night</p></li>
      </ul>
    </li>
  })

  console.log(homeList)


  return (
    <div className="index">
      <h1>Hello from OwnedListing</h1>
      <ul className="index-ul">
        {homeList}
      </ul>
    </div>
  )
}

export default OwnedListing
