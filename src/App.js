import "./App.css";
import { useState, useEffect } from "react";
import Searchbar from "./Searchbar/Searchbar";
import { ToastContainer } from "react-toastify";
import ImageGallery from "./ImageGallery/ImageGallery";
import LoadMore from "./Button/Button";
import Loader from "./Loader/Loader";
import Modal from "./Modal/Modal";

const clienId = `24371628-8321d0b014cdaba49f6b000a8&image_type=photo&orientation=horizontal`;
export default function App() {
  const [page, setPage] = useState(1);
  const [images, setImages] = useState([]);
  const [imageName, setImageName] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [currentImage, setCurrentImage] = useState("");

  const toggleModal = (largeImageURL) => {
    setShowModal(!showModal);
    setCurrentImage(largeImageURL);
  };
  const handleFormSubmit = (imageName) => {
    setImageName(imageName);
    setPage(1);
    setImages([]);
  };
  const loadmore = () => {
    setPage((prevPage) => {
      return prevPage + 1;
    });
  };
  useEffect(() => {
    setIsLoading(true);
    fetch(
      `https://pixabay.com/api/?q=${imageName}&page=${page}&key=${clienId}&per_page=12`
    )
      .then((res) => res.json())
      .then((data) => {
        setImages((prevImages) =>
          page > 1 ? [...prevImages, ...data.hits] : data.hits
        );
      })
      .catch((error) => setError(error))
      .finally(() => setIsLoading(false));
  }, [imageName, page]);

  return (
    <>
      <Searchbar submitForm={handleFormSubmit} />
      <ToastContainer autoClose={4000} />
      <ImageGallery images={images} onClickModal={toggleModal} />

      {isLoading && <Loader />}
      {images.length > 0 && <LoadMore buttonLoadMore={loadmore} />}
      {showModal && <Modal onClose={toggleModal} largeImage={currentImage} />}
    </>
  );
}
