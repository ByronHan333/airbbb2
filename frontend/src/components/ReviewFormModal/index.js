import React, { useState } from 'react';
import { Modal } from '../../context/Modal';
import ReviewForm from '../Reviews/ReviewForm'
import LoginForm from '../LoginFormModal/LoginForm';
import { useSelector } from 'react-redux';
import './ReviewFormModal.css'

export default function ReviewFormModal({text, trip, listing, review}) {
  const [showModal, setShowModal] = useState(false);
  const sessionUser = useSelector(state => state.session.user)

  const handleClick = (e) => {
    e.stopPropagation()
    setShowModal(false)
  }

  return (
    <div>
      <div className={`review-update-button clickable bold`} onClick={() => setShowModal(true)}>{text}</div>
      {showModal && (
        <Modal onClose={handleClick}>
          {sessionUser ? <ReviewForm sessionUser={sessionUser} trip={trip} listing={listing} review={review}/> : <LoginForm />}
        </Modal>
      )}
    </div>
  );
}
