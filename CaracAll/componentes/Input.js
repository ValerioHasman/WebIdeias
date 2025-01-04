import NReact from "../../NReact.js";

/**
 * @param {HTMLInputElement} props
 * @param {...HTMLElement|string} list 
 */
export default function Input(props = {}, ...list) {
  const input = NReact("input", props, list);
  return input;
}