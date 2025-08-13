import { createPortal } from "react-dom";
import { useEffect } from "react";
import "./Modal.css";

interface ModalProps {
  children: React.ReactNode;
  onClose: () => void;
}

const modalRoot = document.getElementById("modal-root");

const Modal = ({ children, onClose }: ModalProps) => {
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.code === "Escape") {
        onClose();
      }
    };

    // Додаємо слухача подій
    document.addEventListener("keydown", handleKeyDown);

    // Функція очищення, яка видаляє слухача, коли компонент розмонтовується
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [onClose]); // Виконується лише при зміні onClose

  const handleBackdropClick = (event: React.MouseEvent<HTMLDivElement>) => {
    // Закриваємо модалку при кліку на бекдроп
    if (event.target === event.currentTarget) {
      onClose();
    }
  };

  return createPortal(
    <>
      <div className="backdrop" onClick={handleBackdropClick}>
        <div className="modal">{children}</div>
      </div>
    </>,
    modalRoot as Element
  );
};

export default Modal;
