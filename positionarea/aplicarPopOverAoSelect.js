import Elemento, { execute } from "../Elemento.js";

/**
 * @param {HTMLSelectElement} select
 */
export default function aplicarPopOverAoSelect(select, { autoSort = true } = {}) {

  function carregarOpcoesSort(containerList) {
    const options = Array.from(containerList.querySelectorAll('&>option:not([hidden]):not(:disabled)'));
    const optgroups = Array.from(containerList.querySelectorAll('&>optgroup:not([hidden]):not(:disabled)'));
    const frag = document.createDocumentFragment();

    options.sort(
      (a, b) => {
        return a.text.localeCompare(b.text, "pt-BR", { sensitivity: 'base' });
      }
    );

    optgroups.sort(
      (a, b) => {
        return a.label.localeCompare(b.label, "pt-BR", { sensitivity: 'base' });
      }
    );

    for (const item of options) {
      frag.append(botaoSelecionavel(item));
    }

    for (const item of optgroups) {
      frag.append(
        objetoAgrupador(
          item,
          carregarOpcoesSort(item)
        )
      );
    }

    return frag;
  }

  function carregarOpcoesBasico(containerList) {
    const itens = Array.from(containerList.querySelectorAll('&>*'));
    const frag = document.createDocumentFragment();

    for (const item of itens) {
      if (!(item.hidden || item.disabled)) {
        if (item instanceof HTMLOptionElement) {
          frag.append(botaoSelecionavel(item));
        } else if (item instanceof HTMLOptGroupElement || item instanceof HTMLSelectElement) {
          frag.append(
            objetoAgrupador(
              item,
              carregarOpcoesBasico(item)
            )
          );
        }
      }
    }

    return frag;
  }


  const inputSearch = Elemento.input(
    {
      form: "_",
      type: "search",
      className: "form-control form-control-sm rounded-3",
      oninput: (e) => {
        const termo = e.target.value;
        const botoes = popOverContainer.querySelectorAll('.list-group button');

        for (const botao of botoes)
          if (compareIncludes(termo, botao.textContent))
            botao.style.display = "";
          else
            botao.style.display = "none";

      }
    }
  );

  const popOverContainer = Elemento.div(
    { className: "p-1 border border-secondary border-opacity-10 rounded-3 shadow bg-body" },
    Elemento.search(
      { className: "mb-1 sticky-top" },
      inputSearch
    ),
    Elemento.div(
      { className: "list-group select-pai mt-2" },
      defineControles(
        autoSort ? carregarOpcoesSort(select) : carregarOpcoesBasico(select)
      )
    )
  );

  function botaoSelecionavel(opt) {
    return execute(
      Elemento.button(
        {
          type: "button",
          className: "list-group-item list-group-item-action border-0 rounded-3 py-1",
          onmouseenter: function () {
            if (inputSearch.matches(':not(:focus)')) {
              this.focus();
            }
          },
          onclick: function () {
            inputSearch.value = "";
            popOverContainer.hidePopover();
            for (const b of popOverContainer.querySelectorAll('.list-group button')) {
              b.style.display = "";
            }
            select.value = opt.value;
            select.dispatchEvent(new Event("input", { bubbles: true }));
            select.dispatchEvent(new Event("change", { bubbles: true }));
            recalcular(this);
            select.focus();
          }
        },
        opt.text,
        "\u00A0"
      ),
      (botao) => {
        if (opt.selected)
          botao.classList.add("active");
      }
    )
  }

  /** @param {HTMLButtonElement} btn */
  function recalcular(btn) {
    btn.closest(".select-pai")
      .querySelectorAll(".active")
      .forEach(e => e.classList.remove("active"));
    btn.classList.add("active");
  }

  popOverContainer.addEventListener(
    "toggle",
    (ev) => {
      if (ev.newState == "open") {
        inputSearch.focus();
        const ativo = popOverContainer.querySelector("button.active");
        if (ativo)
          ativo.scrollIntoView({ block: "center" });
      }
    }
  );

  return aplicarAncoraSelectPopOver(
    select,
    popOverContainer
  );
}


/**
 * @param {HTMLSelectElement} elementoSelect
 * @param {HTMLElement} recipiente
 */
function aplicarAncoraSelectPopOver(elementoSelect, recipiente) {
  const id = crypto.randomUUID();

  elementoSelect.setAttribute('popovertarget', id);
  elementoSelect.style.setProperty("anchor-name", `--${id}`);

  elementoSelect.addEventListener(
    "mousedown", (e) => e.preventDefault()
  );

  elementoSelect.addEventListener(
    "click",
    (ev) => {
      ev.preventDefault();
      recipiente.showPopover();
    }
  );

  recipiente.classList.add("ancorado-select-ao-botao");
  recipiente.id = id;
  recipiente.popover = "auto";
  recipiente.style.setProperty("position-anchor", `--${id}`);

  return [
    elementoSelect, recipiente
  ];
}


function compareIncludes(buscador, recipiente) {
  const fragmentos = limparString(buscador).split("\u0020");
  const frase = limparString(recipiente);

  for (const fragmento of fragmentos) {
    if (!frase.includes(fragmento)) {
      return false
    }
  }
  return true;
}


export function limparString(string) {
  return String(string).normalize('NFD').replace(/\p{Mn}/gu, "").toLowerCase();
}

/** @param {DocumentFragment} container */
function defineControles(container) {
  const botoes = Array.from(container.querySelectorAll("button"));

  for (const botao of botoes) {

    botao.addEventListener(
      "keydown",
      (ev) => {

        if (ev.key === "ArrowUp" || ev.key === "ArrowLeft") {
          if (focarNaDirecao(botao, botoes, -1))
            ev.preventDefault();
        } else if (ev.key === "ArrowDown" || ev.key === "ArrowRight") {
          if (focarNaDirecao(botao, botoes, +1))
            ev.preventDefault();
        }

      }
    )

  }

  return container;
}

/**
 * @param {HTMLButtonElement} botao
 * @param {HTMLButtonElement[]} botoes
 * @param {number} passo
 */
function focarNaDirecao(botao, botoes, passo) {

  let indice = botoes.indexOf(botao) + passo;

  while (botoes[indice]) {
    if (window.getComputedStyle(botoes[indice]).display !== "none") {
      botoes[indice].focus();
      return true;
    }
    indice += passo;
  }

  return false;
}

/**
 * @param {HTMLOptGroupElement} item
 * @param {DocumentFragment} itens
 */
function objetoAgrupador(item, itens) {
  return Elemento.div(
    { className: "list-group ps-2" },
    Elemento.div({ className: "fw-bold small list-group-item border-0 py-1" }, item.label),
    itens
  )
}
