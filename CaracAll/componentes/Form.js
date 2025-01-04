import NReact from "../../NReact.js";

/**
 * @param {HTMLFormElement} props
 * @param {...HTMLElement|string} list 
 */
export default function Form(props = {}, ...list) {
  const form = NReact("form", props, [NReact("fieldset", {}, list)]);
  return form;
}