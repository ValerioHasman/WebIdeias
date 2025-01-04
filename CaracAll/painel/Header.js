import NReact from "../../NReact.js";

/**
 * @param {HTMLElement} props
 * @param {...HTMLElement|string} list 
 */
export default function Header(props = {}, ...list) {
  const header = NReact("header", props, list);
  return header;
}