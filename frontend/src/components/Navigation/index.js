import React, { useContext, useEffect, useRef, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import logo from "../../assets/images/logo.png"
import './Navigation.css'
import { useDispatch } from 'react-redux';
import * as sessionActions from '../../store/session';
import { ModalContext } from '../../context/Modal';
import DropdownButton from './DropdownButton'
import DropdownCard from './DropdownCard'
import Filter from './Filter'

function Navigation() {
  const sessionUser = useSelector(state => state.session.user);
  const [showDropdown, setshowDropdown] = useState(false)
  const drop = useRef(null)
  const value = useContext(ModalContext);

  useEffect(() => {
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
      <NavLink className='logo-nav clickable' exact to='/'>
        <img src={logo} alt="nan" className='logo-img'/>
        <p className='logo-text'>airbbb</p>
      </NavLink>
      <div className='search'>
        <div className='search-anywhere'><p>Anywhere</p></div>
        <div className='search-anyweek'><p>Any week</p></div>
        <div className='search-addguest'>Add guests</div>
        <i className="fa-solid fa-magnifying-glass search-mag"></i>
      </div>
      <div className='dropdown' ref={drop}>
        <DropdownButton user={sessionUser} onClick={() => setshowDropdown(showDropdown => !showDropdown)}/>
        {showDropdown && <DropdownCard user={sessionUser}/>}
      </div>
    </div>
  );
}

export default Navigation;
