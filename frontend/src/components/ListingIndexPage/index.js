import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import * as listingsActions from '../../store/listing'
import SingleListingGrid from '../SingleListingGrid'
import Map from '../Map'
import './ListingIndexPage.css'
import { useHistory } from "react-router-dom"

export default function ListingIndexPage() {
  const dispatch = useDispatch()
  const listings = useSelector(state => state.listings)
  const history = useHistory()

  useEffect(() => {
    dispatch(listingsActions.fetchListings())
  },[dispatch])

  const handleClick = (listingId) => {
    // e.preventDefault()
    history.push(`/listings/${listingId}`)
    window.scrollTo(0,0)
  }

  return (
    <div className="index">
      <div className="index-listings">
        <ul className="index-ul">
        {Object.values(listings).map(home => {
          return (
          <li key={home.id} className="home-card cursor" onClick={()=>handleClick(home.id)}>
            <SingleListingGrid home={home}/>
          </li>
          )
        })}
        </ul>
      </div>
      <div className="index-map">
        {/* <h1>Map</h1> */}
        <Map />
      </div>
    </div>
  )
}
