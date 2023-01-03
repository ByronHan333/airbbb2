import React, { useContext, useRef, useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import './Modal.css';

export const ModalContext = React.createContext();

export function ModalProvider({ children }) {
  const modalRef = useRef();
  const [value, setValue] = useState(null);

  useEffect(() => {
    setValue(modalRef.current);
  }, [])

  return (
    <>
      <ModalContext.Provider value={value}>
        {children}
      </ModalContext.Provider>
      {/* this is an empty div that holds the reference to modal component */}
      <div ref={modalRef} />
    </>
  );
}

export function Modal({ onClose, children }) {
  // modalNode grabs the empty div from line 20.
  const modalNode = useContext(ModalContext);
  if (!modalNode) return null;

  // then copies or children are appended into that modalNode.
  // Modal is basically a component that is toggled on or off.
  return ReactDOM.createPortal(
    <div id="modal">
      <div id="modal-background" onClick={onClose} />
      <div id="modal-content">
        {children}
      </div>
    </div>,
    modalNode
  );
}
