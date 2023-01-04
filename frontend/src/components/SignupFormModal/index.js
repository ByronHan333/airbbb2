import React, { useState } from 'react';
import { Modal } from '../../context/Modal';
import SignupForm from './SignupForm';

function SignupFormModal() {
  const [showModal, setShowModal] = useState(false);

  const handleClick = (e) => {
    e.stopPropagation()
    setShowModal(false)
  }

  return (
    <>
      <div className="signupFormModalButton clickable" onClick={() => setShowModal(true)}>Sign Up</div>
      {showModal && (
        // <Modal onClose={() => setShowModal(false)}>
        <Modal onClose={handleClick}>
          <SignupForm />
        </Modal>
      )}
    </>
  );
}

export default SignupFormModal;
