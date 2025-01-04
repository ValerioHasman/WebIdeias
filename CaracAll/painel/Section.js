import NReact from "../../NReact.js";

/**
 * @param {HTMLPreElement} props
 * @param {...HTMLElement|string} list 
 */
export default function Section(props = {}, ...list) {
  const section = NReact("pre", props, list);
  return section;
}