import NReact from "../../NReact.js";
import Div from "./Div.js";

/**
 * @param {HTMLInputElement} props
 * @param {...HTMLElement|string} list 
 */
export default function Input(props = {}, ...list) {
  const input = Div({ className: "col-md col-6" }, NReact("input", props, list));
  input.firstChild.classList.add("form-control");
  return input;
}