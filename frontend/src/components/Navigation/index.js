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
import linkedin from '../../assets/images/linkedin.png'

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
        <p className='logo-text bold'>airbbb</p>
      </NavLink>
      <div className='nav-about'>
        <a href="https://www.linkedin.com/in/ziyuan-byron-han/" className='bold'>LinkedIn</a>
        <a href="https://github.com/ByronHan333" className='bold'>GitHub</a>
        <a href="https://angel.co/u/byron-han-2" className='bold'>Angelist</a>
        <a href="https://www.ziyuanhan.com/" className='bold'>Portfolio</a>
        {/* <i className="fa-solid fa-magnifying-glass search-mag"></i> */}
      </div>
      <div className='dropdown' ref={drop}>
        <DropdownButton user={sessionUser} onClick={() => setshowDropdown(showDropdown => !showDropdown)}/>
        {showDropdown && <DropdownCard user={sessionUser}/>}
      </div>
    </div>
  );
}

export default Navigation;
