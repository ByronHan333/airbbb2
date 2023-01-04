import emptyU from "../../assets/images/emptyUser.png"
import demoU from "../../assets/images/demoUser.png"

const DropdownButton = ({user, onClick}) => {
  let img;
  if (user) {
    img = <img src={demoU} className='profile-small' alt="nan" />
  } else {
    img = <img src={emptyU} className='profile-small' alt="nan" />
  }

  return (
    <div className='dropdown-button' onClick={onClick}>
      <i className="fa-solid fa-bars" />
      {img}
    </div>
  )
}

export default DropdownButton
