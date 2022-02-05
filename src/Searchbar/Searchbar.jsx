import { render } from "@testing-library/react";
import { useState } from "react";
import { BiSearchAlt } from "react-icons/bi";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import s from "./Searchbar.module.css";

export default function Searchbar({ submitForm }) {
  const [imageName, setImageName] = useState("");

  const handleNameChange = (event) => {
    setImageName(event.currentTarget.value.toLowerCase());
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    if (imageName.trim() === "") {
      return toast.error("Введите запрос поиска");
    }
    submitForm(imageName);
    setImageName("");
  };
  return (
    <header className={s.searchbar}>
      <form className={s.form} onSubmit={handleSubmit}>
        <button type="submit" className={s.button}>
          {" "}
          <span className={s.button_label}>
            <BiSearchAlt />
          </span>
        </button>

        <input
          className={s.input}
          type="text"
          value={imageName}
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
          onChange={handleNameChange}
        />
      </form>
    </header>
  );
}
