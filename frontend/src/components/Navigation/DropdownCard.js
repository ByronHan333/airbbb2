import { useDispatch } from "react-redux";
import * as sessionActions from '../../store/session';
import LoginFormModal from '../LoginFormModal';
import SignupFormModal from '../SignupFormModal';


const DropdownCard = ({user}) => {
  const dispatch = useDispatch()
  const logout = (e) => {
    e.preventDefault();
    dispatch(sessionActions.logout());
  };

  console.log(user)
  let ul;
  if (user) {
    ul = <ul className='dropdown-profile'>
      <li>Trips</li>
      <li>Create Listing</li>
      <li><div onClick={logout}>Log Out</div></li>
    </ul>
  } else {
    ul = <ul className='dropdown-profile' >
      <li><LoginFormModal /></li>
      <li><SignupFormModal /></li>
      <li>Demo Login</li>
    </ul>
  }

  return (
    <>
    {ul}
    </>
  )
}

export default DropdownCard;
