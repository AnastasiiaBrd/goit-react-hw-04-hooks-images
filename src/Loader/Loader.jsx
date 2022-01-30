import react from "react";
import { Oval } from "react-loader-spinner";
import s from "./Loader.module.css";

const Loader = () => (
  <Oval wrapperClass={s.loader} color="#00BFFF" height={80} width={80} />
);

export default Loader;
