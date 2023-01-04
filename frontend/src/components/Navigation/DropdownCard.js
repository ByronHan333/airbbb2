import { useDispatch } from "react-redux";
import { NavLink, Redirect } from "react-router-dom";
import * as sessionActions from '../../store/session';
import LoginFormModal from '../LoginFormModal';
import SignupFormModal from '../SignupFormModal';


const DropdownCard = ({user}) => {
  const dispatch = useDispatch()
  const logout = (e) => {
    e.preventDefault();
    dispatch(sessionActions.logout());
  };

  let ul;
  if (user) {
    ul = <ul className='dropdown-profile'>
      <li><NavLink className="clickable" style={{ textDecoration: 'none', color: 'black' }} to="/trips">Trips</NavLink></li>
      <li><NavLink className="clickable" style={{ textDecoration: 'none', color: 'black' }} to="/listings">Listings</NavLink></li>
      <li><NavLink className="clickable" style={{ textDecoration: 'none', color: 'black' }} to="/" onClick={logout}>Log Out</NavLink></li>
    </ul>
  } else {
    ul = <ul className='dropdown-profile' >
      <li><LoginFormModal /></li>
      <li><SignupFormModal /></li>
      <li className="clickable">Demo Login</li>
    </ul>
  }

  return (
    <>
    {ul}
    </>
  )
}

export default DropdownCard;
