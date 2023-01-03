import React, { useContext, useEffect, useRef, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import LoginFormModal from '../LoginFormModal';
import SignupFormModal from '../SignupFormModal';
import logo from "../../assets/images/logo.png"
import emptyU from "../../assets/images/emptyUser.png"
import demoU from "../../assets/images/demoUser.png"
import './Navigation.css'
import { useDispatch } from 'react-redux';
import * as sessionActions from '../../store/session';
import { ModalContext } from '../../context/Modal';

const Button = ({user, onClick}) => {
  let img;
  if (user) {
    img = <img src={demoU} className='profile-small' alt="nan" />
  } else {
    img = <img src={emptyU} className='profile-small' alt="nan" />
  }

  return (
    <div onClick={onClick}>
      <i className="fa-solid fa-bars" />
      {img}
    </div>
  )
}

const DropdownCard = ({user}) => {
  const dispatch = useDispatch()
  const logout = (e) => {
    e.preventDefault();
    dispatch(sessionActions.logout());
  };

  let ul;
  if (user) {
    ul = <ul className='profile-ul'>
      <li>Messages</li>
      <li>Trips</li>
      <li>Account</li>
      <li><button onClick={logout}>Log Out</button></li>
    </ul>
  } else {
    ul = <ul className='profile-ul' >
      <li><LoginFormModal /></li>
      <li><SignupFormModal /></li>
      <li>Demo Login</li>
    </ul>
  }

  return (
    <div>
      {ul}
    </div>
  )
}


function Navigation() {
  const sessionUser = useSelector(state => state.session.user);
  const [showDropdown, setshowDropdown] = useState(false)
  const drop = useRef(null)
  const value = useContext(ModalContext);
  // console.log(value)



  useEffect(() => {
    console.log(value?.children.length)

    const handleClick = (e) => {
      if (!e.target.closest(`.${drop.current.className}`) && showDropdown && !value?.children.length) {
        setshowDropdown(false)
      }
    }

    document.addEventListener('click', handleClick);

    return () => {
      document.removeEventListener('click', handleClick)
    }
  })

  return (
    <div className='nav-container'>
      <NavLink className='logo-nav' exact to='/'>
        <img src={logo} alt="nan" className='logo-img'/>
        <p className='logo-text'>airbbb</p>
      </NavLink>
      <div className='search'>
        <div className='search-anywhere'>Anywhere</div>
        <div className='search-anyweek'>Any week</div>
        <div className='search-addguest'>Add guests</div>
        <i class="fa-solid fa-magnifying-glass search-mag"></i>
      </div>
      <div className='dropdown' ref={drop}>
        <Button className='dropdown-button' user={sessionUser} onClick={() => setshowDropdown(showDropdown => !showDropdown)}/>
        {showDropdown && <DropdownCard className='dropdown-card' user={sessionUser}/>}
      </div>
    </div>
  );
}

export default Navigation;
