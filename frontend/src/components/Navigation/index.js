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
    img = <img src={demoU} alt="nan" className='profile-small' width={40} height={40} />
  } else {
    img = <img src={emptyU} alt="nan" className='profile-small' width={40} height={40} />
  }

  return (
    <div onClick={onClick}>
    <i className="fa-solid fa-bars" />
    <button className=''>
      {img}
    </button>
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
    <div className='dropDownCard'>
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
    <>
    <div className='left-logo'>
      <NavLink className='logo-text' exact to='/'>
        <img src={logo} alt="nan" className='logo-img' width={60} height={60} />
        <p>airbbb</p>
      </NavLink>
    </div>
    <div className='developer-info'>

    </div>
    <div className='right-dropdown' ref={drop}>
      <Button user={sessionUser} onClick={() => setshowDropdown(showDropdown => !showDropdown)}/>
      {showDropdown && <DropdownCard user={sessionUser}/>}
    </div>
    </>
  );
}

export default Navigation;
