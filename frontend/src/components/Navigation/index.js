import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import LoginFormModal from '../LoginFormModal';
import logo from "../../assets/images/logo.png"
import './Navigation.css'

const Button = ({onClick}) => (
  <button className='' onClick={onClick}>
    Dropdown
  </button>
)

const DropDownCard = () => (
  <div className='dropDownCard'>
    <ul className='profile-ul'>
      <li>Log in</li>
      <li>Sign up</li>
      <li>Host your home</li>
      <li>Account</li>
      <li>Help</li>
    </ul>
  </div>
)

function Navigation() {
  const sessionUser = useSelector(state => state.session.user);
  const [showDropDown, setShowDropDown] = useState(false)

  let sessionLinks;
  if (sessionUser) {
    sessionLinks = (
      <ProfileButton user={sessionUser} />
    );
  } else {
    sessionLinks = (
      <>
        <LoginFormModal />
        <NavLink to="/signup">Sign Up</NavLink>
      </>
    );
  }

  return (
    <>
    <div className='left-logo'>
      <NavLink exact to='/'>
        <img src={logo} alt="example" className='logo-img'/>
        <p className='logo-text'>airbbb</p>
      </NavLink>
    </div>
    <div className='developer-info'>
      
    </div>
    <div className='right-dropdown'>
      <Button onClick={() => setShowDropDown(showDropDown => !showDropDown)}/>
     {showDropDown && <DropDownCard />}
    </div>
    {sessionLinks}
    </>
  );
}

export default Navigation;
