import React, { useState } from 'react';
import { Modal } from '../../context/Modal';
import SignupForm from './SignupForm';

function SignupFormModal() {
  const [showModal, setShowModal] = useState(false);

  const handleClick = (e) => {
    console.log("in close")
    e.stopPropagation()
    setShowModal(false)
  }

  return (
    <>
      <div className='signupFormModalButton' onClick={() => setShowModal(true)}>Sign Up</div>
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
