import { render } from "@testing-library/react";
import react, { Component } from "react";
import { BiSearchAlt } from "react-icons/bi";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import s from "./Searchbar.module.css";

export default class Searchbar extends Component {
  state = {
    imageName: "",
  };
  handleNameChange = (event) => {
    this.setState({ imageName: event.currentTarget.value.toLowerCase() });
  };
  handleSubmit = (event) => {
    event.preventDefault();
    if (this.state.imageName.trim() === "") {
      return toast.error("Введите запрос поиска");
    }
    this.props.submitForm(this.state.imageName);
    this.setState({ imageName: "" });
  };
  render() {
    return (
      <header className={s.searchbar}>
        <form className={s.form} onSubmit={this.handleSubmit}>
          <button type="submit" className={s.button}>
            {" "}
            <span className={s.button_label}>
              <BiSearchAlt />
            </span>
          </button>

          <input
            className={s.input}
            type="text"
            value={this.state.imageName}
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
            onChange={this.handleNameChange}
          />
        </form>
      </header>
    );
  }
}
