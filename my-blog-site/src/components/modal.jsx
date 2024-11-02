import React from "react";
import Modal from 'react-modal';

Modal.setAppElement('#root');

const CustomModal = ({ isOpen, onClose, content, title }) => {
    return (
        <Modal
            isOpen={isOpen}
            onRequestClose={onClose}
            className="modal" // Custom styles for the modal
            overlayClassName="overlay" // Custom styles for overlay
            contentLabel="Blog Modal"
        >
            <h2 className="text-lg font-bold mb-4">{title}</h2> {/* Use the title prop here */}
            <p>{content}</p>
            <button onClick={onClose} className="mt-4 bg-blue-500 text-white px-4 py-2 rounded">
                Close
            </button>
        </Modal>
    );
};

export default CustomModal;
