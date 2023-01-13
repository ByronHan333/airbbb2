import defaultHome from "../../assets/images/defaultHome.png"
import './SingleListingGrid.css'

export default function SingleListingGrid({home}) {
  return (
    <div>
      <ul className="home-card-ul">
        <li><img src={home.photoUrls[0]} className="home-profile-pic" alt="nan"/></li>
        {/* <li><img src={defaultHome} className="home-profile-pic" alt="nan"/></li> */}
        <li><p className="medium home-card-li-1">{home.address}</p></li>
        <li><p className="home-card-li-2">{home.title.slice(0, 23)}...</p></li>
        <li><p className="home-card-li-3">${home.price} night</p></li>
      </ul>
    </div>
  )
}
