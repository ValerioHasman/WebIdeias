import NReact from "../../NReact.js";

/**
 * @param {HTMLDivElement} props
 * @param {...HTMLElement|string} list 
 */
export default function Div(props = {}, ...list) {
  const div = NReact("div", props, list);
  return div;
}