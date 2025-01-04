import NReact from "../../NReact.js";
import Div from "./Div.js";

/**
 * @param {HTMLButtonElement} props
 * @param {...HTMLElement|string} list 
 */
export default function Button(props = {}, ...list) {
  const button = Div({ className: "col d-grid" }, NReact("button", props, list));
  button.firstChild.classList.add("btn");
  return button;
}