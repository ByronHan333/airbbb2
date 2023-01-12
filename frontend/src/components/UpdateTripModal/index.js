import React, { useState } from 'react';
import { Modal } from '../../context/Modal';
import LoginForm from './LoginForm';

export default function LoginFormModal({text}) {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <div className='loginFormModalButton clickable' onClick={() => setShowModal(true)}>{text}</div>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <LoginForm />
        </Modal>
      )}
    </>
  );
}
