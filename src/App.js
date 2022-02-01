import "./App.css";
import { Component } from "react";
import Searchbar from "./Searchbar/Searchbar";
import { ToastContainer } from "react-toastify";
import ImageGallery from "./ImageGallery/ImageGallery";
import LoadMore from "./Button/Button";
import Loader from "./Loader/Loader";
import Modal from "./Modal/Modal";

const clienId = `24371628-8321d0b014cdaba49f6b000a8&image_type=photo&orientation=horizontal`;
export default class App extends Component {
  state = {
    page: 1,
    images: [],
    imageName: "",
    isLoading: false,
    error: null,
    showModal: false,
    currentImage: "",
  };
  toggleModal = (largeImageURL) => {
    console.log(this.state.currentImage);
    this.setState(({ showModal }) => ({
      showModal: !showModal,
      currentImage: largeImageURL,
    }));
  };
  handleFormSubmit = (imageName) => {
    this.setState({ imageName: imageName, page: 1, images: [] });
  };
  loadmore = () => {
    this.setState((prevState) => {
      return {
        page: prevState.page + 1,
      };
    });
  };
  loadImages = () => {
    this.setState({ isLoading: true });
    fetch(
      `https://pixabay.com/api/?q=${this.state.imageName}&page=${this.state.page}&key=${clienId}&per_page=12`
    )
      .then((res) => res.json())
      .then((data) => {
        this.setState((prevState) => ({
          images:
            this.state.page > 1
              ? [...prevState.images, ...data.hits]
              : data.hits,
        }));
      })
      .catch((error) => this.setState({ error }))
      .finally(() => this.setState({ isLoading: false }));
  };

  componentDidMount() {
    this.loadImages();
  }
  componentDidUpdate(prevProps, prevState) {
    const prevName = prevState.imageName;
    const nextName = this.state.imageName;
    if (prevName !== nextName) {
      this.loadImages();
    } else if (prevState.page !== this.state.page) {
      this.loadImages();
    }
  }
  render() {
    return (
      <>
        <Searchbar submitForm={this.handleFormSubmit} />
        <ToastContainer autoClose={4000} />
        <ImageGallery
          images={this.state.images}
          onClickModal={this.toggleModal}
        />

        {this.state.isLoading && <Loader />}
        {this.state.images.length > 0 && (
          <LoadMore buttonLoadMore={this.loadmore} />
        )}
        {this.state.showModal && (
          <Modal
            onClose={this.toggleModal}
            largeImage={this.state.currentImage}
          />
        )}
      </>
    );
  }
}
