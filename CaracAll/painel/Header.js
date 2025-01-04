import NReact from "../../NReact.js";

/**
 * @param {HTMLElement} props
 * @param {...HTMLElement|string} list 
 */
export default function Header(props = {}, ...list) {
  const header = NReact("header", props, list);
  header.classList.add("py-2", "sticky-top", "container-fluid", "bg-secondary-subtle");
  return header;
}