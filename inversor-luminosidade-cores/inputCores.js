import Elemento from "./Elemento.js";
import obterMatrizCores, { tratarRGBParaHexa } from "./obterMatrizCores.js";
import triangleColorPicker from "./triangleColorPicker.js";

export default function inputCores() {

  const span = Elemento.span({ className: "font-monospace user-select-all" }, "#000000");

  const picker = triangleColorPicker({ size: 200 });

  const input = Elemento.button(
    {
      className: "form-control rounded-3",
      type: "button"
    },
    span
  );

  const popOverContainer = Elemento.div(
    { className: "p-1 border border-secondary border-opacity-10 rounded-3 shadow bg-body user-select-none bg-body-tertiary" },
    Elemento.div(
      { className: "card mb-2 rounded-4 border-secondary border-opacity-10" },
      picker.canvas,
    ),
    picker.range,
  );

  picker.onColorChange((cor) => {

    span.textContent = "#" + tratarRGBParaHexa(cor.r, cor.g, cor.b);

  });

  return Elemento.span(
    {},
    ...aplicarAncoraPopOver(
      input,
      popOverContainer
    )
  );
}


/**
 * @param {HTMLElement} divAlvo
 * @param {HTMLElement} recipiente
 */
function aplicarAncoraPopOver(divAlvo, recipiente) {
  const id = crypto.randomUUID();

  divAlvo.setAttribute('popovertarget', id);
  divAlvo.style.setProperty("anchor-name", `--${id}`);

  recipiente.addEventListener('click', e => e.preventDefault());

  recipiente.classList.add("ancorado-ao-botao-cor", "popover-on-cor");
  recipiente.id = id;
  recipiente.popover = "auto";
  recipiente.style.setProperty("position-anchor", `--${id}`);

  return [
    divAlvo, recipiente
  ];
}