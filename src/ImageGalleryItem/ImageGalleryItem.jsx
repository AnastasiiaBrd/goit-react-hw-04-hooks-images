import react from "react";
import s from "./ImageGalleryItem.module.css";

const ImageGalleryItem = ({ smallImage, largeImage, onClickImage }) => {
  return (
    <li className={s.gallery_item}>
      <img
        className={s.gallery_image}
        onClick={() => {
          onClickImage(largeImage);
        }}
        src={smallImage}
        alt=""
      />
    </li>
  );
};

export default ImageGalleryItem;
