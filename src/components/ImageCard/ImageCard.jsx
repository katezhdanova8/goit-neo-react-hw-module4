import css from './ImageCard.module.css';

const ImageCard = ({ image, onClick }) => {
  return (
    <li className={css.ImageCard} onClick={onClick} >
      <img
        src={image.urls.small}
        alt={image.alt_description}
      />
    </li>
  );
}

export default ImageCard;