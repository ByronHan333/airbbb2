import { useState } from "react";
import { useDispatch } from "react-redux";
import { NavLink, Redirect } from "react-router-dom";
import * as sessionActions from '../../store/session';
import LoginFormModal from '../LoginFormModal';
import SignupFormModal from '../SignupFormModal';


const DropdownCard = ({user}) => {
  const dispatch = useDispatch()
  const [errors, setErrors] = useState([]);
  const logout = (e) => {
    e.preventDefault();
    dispatch(sessionActions.logout());
  };

  const demoLogin = (e) => {
    e.preventDefault();
    return dispatch(sessionActions.login({ credential:"username", password:"password" }))
    .catch(async (res) => {
      let data;
      try {
        // .clone() essentially allows you to read the response body twice
        data = await res.clone().json();
      } catch {
        data = await res.text(); // Will hit this case if the server is down
      }
      if (data?.errors) setErrors(data.errors);
      else if (data) setErrors([data]);
      else setErrors([res.statusText]);
    });
  }

  let ul;
  if (user) {
    ul = <ul className='dropdown-profile'>
      <li><NavLink className="clickable" style={{ textDecoration: 'none', color: 'black' }} to="/trips">Trips</NavLink></li>
      <li><NavLink className="clickable" style={{ textDecoration: 'none', color: 'black' }} to="/listings">Listings</NavLink></li>
      <li><NavLink className="clickable" style={{ textDecoration: 'none', color: 'black' }} to="/" onClick={logout}>Log Out</NavLink></li>
    </ul>
  } else {
    ul = <ul className='dropdown-profile' >
      <li><LoginFormModal text={"Log In"} /></li>
      <li><SignupFormModal /></li>
      <li><div className="clickable" onClick={demoLogin} >Demo Login</div></li>
    </ul>
  }

  return (
    <>
    {ul}
    </>
  )
}

export default DropdownCard;
