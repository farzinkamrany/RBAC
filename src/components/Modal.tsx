interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50"
      onClick={onClose}
    >
      <div
        className="bg-white p-4 rounded max-w-full max-h-full"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          className="mb-2 px-2 py-1 bg-red-600 text-white rounded"
          onClick={onClose}
        >
          بستن
        </button>
        {children}
      </div>
    </div>
  );
};

export default Modal;
