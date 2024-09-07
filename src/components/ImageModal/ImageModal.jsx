import Modal from 'react-modal';
import css from './ImageModal.module.css';

Modal.setAppElement('#root');

const ImageModal = ({ onClose, image }) => {
  return (
    <Modal
      isOpen={!!image}
      onRequestClose={onClose}
      overlayClassName={css.ImageModal__overlay}
      contentLabel="Example Modal"
      className={css.ImageModal}
    >
      <img 
        className={css.ImageModal__image}
        src={image?.urls.regular} 
        alt={image?.alt_description} 
      />
    </Modal>
  )
}

export default ImageModal;