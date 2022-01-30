import react from "react";
import s from "./Button.module.css";

const LoadMore = ({ buttonLoadMore }) => (
  <button className={s.load_more} onClick={buttonLoadMore} type="button">
    Load More
  </button>
);

export default LoadMore;
