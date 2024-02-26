import React, { useEffect } from 'react';
import { createPortal } from 'react-dom';
import { Overlay, ModalBody } from './Modal.styled';

interface ModalProps {
  onClick: () => void;
  children: React.ReactNode;
}

const modalRoot = document.querySelector('#modal-root');

export const Modal: React.FC<ModalProps> = ({ onClick, children }) => {
  useEffect(() => {
    const handleEscDown = (e: KeyboardEvent) => {
      if (e.code === 'Escape') {
        onClick();
      }
    };

    window.addEventListener('keydown', handleEscDown);
    return () => {
      window.removeEventListener('keydown', handleEscDown);
    };
  }, [onClick]);
  const handleBackdropClick: React.MouseEventHandler<HTMLDivElement> = e => {
    const target = e.target as HTMLDivElement;
    if (target === e.currentTarget) {
      onClick();
    }
  };

  if (!modalRoot) return null;

  return createPortal(
    <Overlay onClick={handleBackdropClick}>
      <ModalBody>{children}</ModalBody>
    </Overlay>,
    modalRoot
  );
};
