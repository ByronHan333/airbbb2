import React, { useState } from 'react';
import { Modal } from '../../context/Modal';
import ReviewForm from '../Reviews/ReviewForm'
import LoginForm from '../LoginFormModal/LoginForm';
import { useSelector } from 'react-redux';
import './ReviewFormModal.css'

export default function ReviewFormModal() {
  const [showModal, setShowModal] = useState(false);
  const sessionUser = useSelector(state => state.session.user)

  const handleClick = (e) => {
    e.stopPropagation()
    setShowModal(false)
  }

  return (
    <div className='review-form-outer-modal'>
      <div className="review-create-button clickable" onClick={() => setShowModal(true)}>Write review</div>
      {showModal && (
        <Modal onClose={handleClick}>
          {sessionUser ? <ReviewForm /> : <LoginForm />}
        </Modal>
      )}
    </div>
  );
}
