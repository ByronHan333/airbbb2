import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"

function ListingIndexPage() {
  const dispatch = useDispatch()
  const listings = useSelector(state => state.listings)

  useEffect(() => {
    dispatch()
  },[dispatch])


  return (
    <ul>
      {listings.map((listing) => {
        return <li key={listing.id}> {listing.name} </li>
      })}
    </ul>
  )
}

export default ListingIndexPage;
