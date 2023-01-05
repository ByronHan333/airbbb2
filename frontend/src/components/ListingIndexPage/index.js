import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import * as listingsActions from '../../store/listing'
import defaultHome from "../../assets/images/defaultHome.png"
import './ListingIndexPage.css'

function ListingIndexPage() {
  const dispatch = useDispatch()
  const listings = useSelector(state => state.listings)

  useEffect(() => {
    dispatch(listingsActions.fetchListings())
  },[dispatch])


  let homeList = Object.values(listings).map(home => {
    console.log(home)
    return <li key={home.id} className="home-card">
      <ul className="home-card-ul">
        {/* <li><img src={home.photoUrls[0]} className="home-profile-pic" alt="nan"/></li> */}
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

export default ListingIndexPage;
