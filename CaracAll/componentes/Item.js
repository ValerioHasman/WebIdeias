import NReact from "../../NReact.js";

/**
 * @param {HTMLDivElement} props
 * @param {...HTMLElement|string} list 
 */
export default function Item(props = {}, ...list) {
  const item = NReact("div", props, list);
  return item;
}