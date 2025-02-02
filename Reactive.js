/** Cria um elemento HTML e anexa os itens do array.
 * @template {keyof HTMLElementTagNameMap} K
 * @param {K} tagName - O nome da tag do elemento a ser criado. 
 * @param {HTMLElementTagNameMap[K]} props - Um array de itens para anexar ao elemento criado.
 * @param {(Node | string)[]} nodulo - Um array de itens para anexar ao elemento criado.
 * @returns {HTMLElementTagNameMap[K]} - O elemento HTML criado. */
function NReact(tagName, props = {}, nodulo = []) {
  const element = document.createElement(tagName);
  element.append(...nodulo);
  atriburir(element, props);
  return element;
}

/**
 * @param {HTMLElement} props1 - 1, quem recebe
 * @param {HTMLElement} props2 - 2, quem doa
 */
function atriburir(props1 = this, props2) {
  for (const prop in props2) {
    if (typeof props2[prop] == "object" && !(props2[prop] instanceof Node)) {
      atriburir(props1[prop], props2[prop]);
    } else {
      props1[prop] = props2[prop]
    }
  }
  return props1;
}

/**
 * @param {string} caminho
 * @param {string} raiz
 */
function Urli(caminho = "", raiz = null) {
  caminho = caminho[0] == "/" ? caminho : "/" + caminho;
  if (raiz) {
    return raiz + caminho;
  }
  const arr = (import.meta.url).split("/");
  arr.pop();
  return arr.join("/") + caminho;
}

/**
 * @typedef {Object} R
 * @property {(propriedades: Partial<HTMLAnchorElement>, ...nodulo: (Node | string)[]) => HTMLAnchorElement} a
 * @property {(propriedades: Partial<HTMLElement>, ...nodulo: (Node | string)[]) => HTMLElement} abbr
 * @property {(propriedades: Partial<HTMLElement>, ...nodulo: (Node | string)[]) => HTMLElement} address
 * @property {(propriedades: Partial<HTMLAreaElement>, ...nodulo: (Node | string)[]) => HTMLAreaElement} area
 * @property {(propriedades: Partial<HTMLElement>, ...nodulo: (Node | string)[]) => HTMLElement} article
 * @property {(propriedades: Partial<HTMLElement>, ...nodulo: (Node | string)[]) => HTMLElement} aside
 * @property {(propriedades: Partial<HTMLAudioElement>, ...nodulo: (Node | string)[]) => HTMLAudioElement} audio
 * @property {(propriedades: Partial<HTMLElement>, ...nodulo: (Node | string)[]) => HTMLElement} b
 * @property {(propriedades: Partial<HTMLBaseElement>, ...nodulo: (Node | string)[]) => HTMLBaseElement} base
 * @property {(propriedades: Partial<HTMLElement>, ...nodulo: (Node | string)[]) => HTMLElement} bdi
 * @property {(propriedades: Partial<HTMLElement>, ...nodulo: (Node | string)[]) => HTMLElement} bdo
 * @property {(propriedades: Partial<HTMLQuoteElement>, ...nodulo: (Node | string)[]) => HTMLQuoteElement} blockquote
 * @property {(propriedades: Partial<HTMLBodyElement>, ...nodulo: (Node | string)[]) => HTMLBodyElement} body
 * @property {(propriedades: Partial<HTMLBRElement>, ...nodulo: (Node | string)[]) => HTMLBRElement} br
 * @property {(propriedades: Partial<HTMLButtonElement>, ...nodulo: (Node | string)[]) => HTMLButtonElement} button
 * @property {(propriedades: Partial<HTMLCanvasElement>, ...nodulo: (Node | string)[]) => HTMLCanvasElement} canvas
 * @property {(propriedades: Partial<HTMLTableCaptionElement>, ...nodulo: (Node | string)[]) => HTMLTableCaptionElement} caption
 * @property {(propriedades: Partial<HTMLElement>, ...nodulo: (Node | string)[]) => HTMLElement} cite
 * @property {(propriedades: Partial<HTMLElement>, ...nodulo: (Node | string)[]) => HTMLElement} code
 * @property {(propriedades: Partial<HTMLTableColElement>, ...nodulo: (Node | string)[]) => HTMLTableColElement} col
 * @property {(propriedades: Partial<HTMLTableColElement>, ...nodulo: (Node | string)[]) => HTMLTableColElement} colgroup
 * @property {(propriedades: Partial<HTMLDataElement>, ...nodulo: (Node | string)[]) => HTMLDataElement} data
 * @property {(propriedades: Partial<HTMLDataListElement>, ...nodulo: (Node | string)[]) => HTMLDataListElement} datalist
 * @property {(propriedades: Partial<HTMLElement>, ...nodulo: (Node | string)[]) => HTMLElement} dd
 * @property {(propriedades: Partial<HTMLModElement>, ...nodulo: (Node | string)[]) => HTMLModElement} del
 * @property {(propriedades: Partial<HTMLDetailsElement>, ...nodulo: (Node | string)[]) => HTMLDetailsElement} details
 * @property {(propriedades: Partial<HTMLElement>, ...nodulo: (Node | string)[]) => HTMLElement} dfn
 * @property {(propriedades: Partial<HTMLDialogElement>, ...nodulo: (Node | string)[]) => HTMLDialogElement} dialog
 * @property {(propriedades: Partial<HTMLDivElement>, ...nodulo: (Node | string)[]) => HTMLDivElement} div
 * @property {(propriedades: Partial<HTMLDListElement>, ...nodulo: (Node | string)[]) => HTMLDListElement} dl
 * @property {(propriedades: Partial<HTMLElement>, ...nodulo: (Node | string)[]) => HTMLElement} dt
 * @property {(propriedades: Partial<HTMLElement>, ...nodulo: (Node | string)[]) => HTMLElement} em
 * @property {(propriedades: Partial<HTMLEmbedElement>, ...nodulo: (Node | string)[]) => HTMLEmbedElement} embed
 * @property {(propriedades: Partial<HTMLFieldSetElement>, ...nodulo: (Node | string)[]) => HTMLFieldSetElement} fieldset
 * @property {(propriedades: Partial<HTMLElement>, ...nodulo: (Node | string)[]) => HTMLElement} figcaption
 * @property {(propriedades: Partial<HTMLElement>, ...nodulo: (Node | string)[]) => HTMLElement} figure
 * @property {(propriedades: Partial<HTMLElement>, ...nodulo: (Node | string)[]) => HTMLElement} footer
 * @property {(propriedades: Partial<HTMLFormElement>, ...nodulo: (Node | string)[]) => HTMLFormElement} form
 * @property {(propriedades: Partial<HTMLHeadingElement>, ...nodulo: (Node | string)[]) => HTMLHeadingElement} h1
 * @property {(propriedades: Partial<HTMLHeadingElement>, ...nodulo: (Node | string)[]) => HTMLHeadingElement} h2
 * @property {(propriedades: Partial<HTMLHeadingElement>, ...nodulo: (Node | string)[]) => HTMLHeadingElement} h3
 * @property {(propriedades: Partial<HTMLHeadingElement>, ...nodulo: (Node | string)[]) => HTMLHeadingElement} h4
 * @property {(propriedades: Partial<HTMLHeadingElement>, ...nodulo: (Node | string)[]) => HTMLHeadingElement} h5
 * @property {(propriedades: Partial<HTMLHeadingElement>, ...nodulo: (Node | string)[]) => HTMLHeadingElement} h6
 * @property {(propriedades: Partial<HTMLHeadElement>, ...nodulo: (Node | string)[]) => HTMLHeadElement} head
 * @property {(propriedades: Partial<HTMLElement>, ...nodulo: (Node | string)[]) => HTMLElement} header
 * @property {(propriedades: Partial<HTMLElement>, ...nodulo: (Node | string)[]) => HTMLElement} hgroup
 * @property {(propriedades: Partial<HTMLHRElement>, ...nodulo: (Node | string)[]) => HTMLHRElement} hr
 * @property {(propriedades: Partial<HTMLHtmlElement>, ...nodulo: (Node | string)[]) => HTMLHtmlElement} html
 * @property {(propriedades: Partial<HTMLElement>, ...nodulo: (Node | string)[]) => HTMLElement} i
 * @property {(propriedades: Partial<HTMLIFrameElement>, ...nodulo: (Node | string)[]) => HTMLIFrameElement} iframe
 * @property {(propriedades: Partial<HTMLImageElement>, ...nodulo: (Node | string)[]) => HTMLImageElement} img
 * @property {(propriedades: Partial<HTMLInputElement>, ...nodulo: (Node | string)[]) => HTMLInputElement} input
 * @property {(propriedades: Partial<HTMLModElement>, ...nodulo: (Node | string)[]) => HTMLModElement} ins
 * @property {(propriedades: Partial<HTMLElement>, ...nodulo: (Node | string)[]) => HTMLElement} kbd
 * @property {(propriedades: Partial<HTMLLabelElement>, ...nodulo: (Node | string)[]) => HTMLLabelElement} label
 * @property {(propriedades: Partial<HTMLLegendElement>, ...nodulo: (Node | string)[]) => HTMLLegendElement} legend
 * @property {(propriedades: Partial<HTMLLIElement>, ...nodulo: (Node | string)[]) => HTMLLIElement} li
 * @property {(propriedades: Partial<HTMLLinkElement>, ...nodulo: (Node | string)[]) => HTMLLinkElement} link
 * @property {(propriedades: Partial<HTMLElement>, ...nodulo: (Node | string)[]) => HTMLElement} main
 * @property {(propriedades: Partial<HTMLMapElement>, ...nodulo: (Node | string)[]) => HTMLMapElement} map
 * @property {(propriedades: Partial<HTMLElement>, ...nodulo: (Node | string)[]) => HTMLElement} mark
 * @property {(propriedades: Partial<HTMLMenuElement>, ...nodulo: (Node | string)[]) => HTMLMenuElement} menu
 * @property {(propriedades: Partial<HTMLMetaElement>, ...nodulo: (Node | string)[]) => HTMLMetaElement} meta
 * @property {(propriedades: Partial<HTMLMeterElement>, ...nodulo: (Node | string)[]) => HTMLMeterElement} meter
 * @property {(propriedades: Partial<HTMLElement>, ...nodulo: (Node | string)[]) => HTMLElement} nav
 * @property {(propriedades: Partial<HTMLElement>, ...nodulo: (Node | string)[]) => HTMLElement} noscript
 * @property {(propriedades: Partial<HTMLObjectElement>, ...nodulo: (Node | string)[]) => HTMLObjectElement} object
 * @property {(propriedades: Partial<HTMLOListElement>, ...nodulo: (Node | string)[]) => HTMLOListElement} ol
 * @property {(propriedades: Partial<HTMLOptGroupElement>, ...nodulo: (Node | string)[]) => HTMLOptGroupElement} optgroup
 * @property {(propriedades: Partial<HTMLOptionElement>, ...nodulo: (Node | string)[]) => HTMLOptionElement} option
 * @property {(propriedades: Partial<HTMLOutputElement>, ...nodulo: (Node | string)[]) => HTMLOutputElement} output
 * @property {(propriedades: Partial<HTMLParagraphElement>, ...nodulo: (Node | string)[]) => HTMLParagraphElement} p
 * @property {(propriedades: Partial<HTMLPictureElement>, ...nodulo: (Node | string)[]) => HTMLPictureElement} picture
 * @property {(propriedades: Partial<HTMLPreElement>, ...nodulo: (Node | string)[]) => HTMLPreElement} pre
 * @property {(propriedades: Partial<HTMLProgressElement>, ...nodulo: (Node | string)[]) => HTMLProgressElement} progress
 * @property {(propriedades: Partial<HTMLQuoteElement>, ...nodulo: (Node | string)[]) => HTMLQuoteElement} q
 * @property {(propriedades: Partial<HTMLElement>, ...nodulo: (Node | string)[]) => HTMLElement} rp
 * @property {(propriedades: Partial<HTMLElement>, ...nodulo: (Node | string)[]) => HTMLElement} rt
 * @property {(propriedades: Partial<HTMLElement>, ...nodulo: (Node | string)[]) => HTMLElement} ruby
 * @property {(propriedades: Partial<HTMLElement>, ...nodulo: (Node | string)[]) => HTMLElement} s
 * @property {(propriedades: Partial<HTMLElement>, ...nodulo: (Node | string)[]) => HTMLElement} samp
 * @property {(propriedades: Partial<HTMLScriptElement>, ...nodulo: (Node | string)[]) => HTMLScriptElement} script
 * @property {(propriedades: Partial<HTMLElement>, ...nodulo: (Node | string)[]) => HTMLElement} search
 * @property {(propriedades: Partial<HTMLElement>, ...nodulo: (Node | string)[]) => HTMLElement} section
 * @property {(propriedades: Partial<HTMLSelectElement>, ...nodulo: (Node | string)[]) => HTMLSelectElement} select
 * @property {(propriedades: Partial<HTMLSlotElement>, ...nodulo: (Node | string)[]) => HTMLSlotElement} slot
 * @property {(propriedades: Partial<HTMLElement>, ...nodulo: (Node | string)[]) => HTMLElement} small
 * @property {(propriedades: Partial<HTMLSourceElement>, ...nodulo: (Node | string)[]) => HTMLSourceElement} source
 * @property {(propriedades: Partial<HTMLSpanElement>, ...nodulo: (Node | string)[]) => HTMLSpanElement} span
 * @property {(propriedades: Partial<HTMLElement>, ...nodulo: (Node | string)[]) => HTMLElement} strong
 * @property {(propriedades: Partial<HTMLStyleElement>, ...nodulo: (Node | string)[]) => HTMLStyleElement} style
 * @property {(propriedades: Partial<HTMLElement>, ...nodulo: (Node | string)[]) => HTMLElement} sub
 * @property {(propriedades: Partial<HTMLElement>, ...nodulo: (Node | string)[]) => HTMLElement} summary
 * @property {(propriedades: Partial<HTMLElement>, ...nodulo: (Node | string)[]) => HTMLElement} sup
 * @property {(propriedades: Partial<HTMLTableElement>, ...nodulo: (Node | string)[]) => HTMLTableElement} table
 * @property {(propriedades: Partial<HTMLTableSectionElement>, ...nodulo: (Node | string)[]) => HTMLTableSectionElement} tbody
 * @property {(propriedades: Partial<HTMLTableCellElement>, ...nodulo: (Node | string)[]) => HTMLTableCellElement} td
 * @property {(propriedades: Partial<HTMLTemplateElement>, ...nodulo: (Node | string)[]) => HTMLTemplateElement} template
 * @property {(propriedades: Partial<HTMLTextAreaElement>, ...nodulo: (Node | string)[]) => HTMLTextAreaElement} textarea
 * @property {(propriedades: Partial<HTMLTableSectionElement>, ...nodulo: (Node | string)[]) => HTMLTableSectionElement} tfoot
 * @property {(propriedades: Partial<HTMLTableCellElement>, ...nodulo: (Node | string)[]) => HTMLTableCellElement} th
 * @property {(propriedades: Partial<HTMLTableSectionElement>, ...nodulo: (Node | string)[]) => HTMLTableSectionElement} thead
 * @property {(propriedades: Partial<HTMLTimeElement>, ...nodulo: (Node | string)[]) => HTMLTimeElement} time
 * @property {(propriedades: Partial<HTMLTitleElement>, ...nodulo: (Node | string)[]) => HTMLTitleElement} title
 * @property {(propriedades: Partial<HTMLTableRowElement>, ...nodulo: (Node | string)[]) => HTMLTableRowElement} tr
 * @property {(propriedades: Partial<HTMLTrackElement>, ...nodulo: (Node | string)[]) => HTMLTrackElement} track
 * @property {(propriedades: Partial<HTMLElement>, ...nodulo: (Node | string)[]) => HTMLElement} u
 * @property {(propriedades: Partial<HTMLUListElement>, ...nodulo: (Node | string)[]) => HTMLUListElement} ul
 * @property {(propriedades: Partial<HTMLElement>, ...nodulo: (Node | string)[]) => HTMLElement} var
 * @property {(propriedades: Partial<HTMLVideoElement>, ...nodulo: (Node | string)[]) => HTMLVideoElement} video
 * @property {(propriedades: Partial<HTMLElement>, ...nodulo: (Node | string)[]) => HTMLElement} wbr
 * @property {(caminho: string, raiz: string) => string} Urli
*/

/** @type {R} */
const R = new Proxy({}, {
  get: (obj, tagName) => {
    if(tagName === "Urli"){
      return Urli;
    }
    return (propriedades, ...nodulo) => {
      return NReact(tagName, propriedades, nodulo);
    };
  },
});

export default R;