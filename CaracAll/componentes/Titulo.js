import NReact, { Urli } from "../../NReact.js";
import Div from "./Div.js";

/**
 * @param {HTMLFormElement} props
 * @param {...HTMLElement|string} list 
 */
export default function Titulo(props = {}, ...list) {
  const titulo = Div({ className: "pt-2 container-fluid bg-secondary-subtle" },
    NReact("img", { src: Urli("CaracAll/favicon.png"), style: {width: "2rem", float: "left", marginRight: "1rem"} }),
    NReact("h1", { className: "m-0" }, list)
  )
  return titulo;
}