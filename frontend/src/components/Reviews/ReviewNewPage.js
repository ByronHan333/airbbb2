import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom"
import TripCard from '../TripIndexPage/TripCard'
import ReviewForm from './ReviewForm';
import { Modal } from '../../context/Modal';
import LoginForm from '../LoginFormModal/LoginForm';

export default function ReviewNewPage() {
  const location = useLocation();
  const trip = location.state.trip;
  const listing = location.state.listing;
  const sessionUser = useSelector(state => state.session.user)

  if (!sessionUser) return (
    <Modal>
      <LoginForm />
    </Modal>
  )

  return (
    <div>
      <TripCard trip={trip} listing={listing} />
      <ReviewForm sessionUser={sessionUser} trip={trip} listing={listing}  />
    </div>
  )
}
