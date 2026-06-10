(
  function () {
    "use strict";

    function NReact(tagName, props = {}, nodulo = []) {
      const element = document.createElement(tagName);
      element.append(...nodulo);
      element.a = a;
      element.a(props);
      return element;
    }

    function execute(it, ...funs) {
      for (const fun of funs)
        fun(it);
      return it;
    }


    function a(nvsProps, paraObj, pai) {
      const esteElmt = this ?? paraObj;
      for (const prop in nvsProps) {
        if (
          typeof esteElmt[prop] != "function" &&
          typeof nvsProps[prop] == "object" &&
          !(nvsProps[prop] instanceof Node)
        ) {
          a(nvsProps[prop], esteElmt[prop], pai ?? esteElmt);
        } else if (
          typeof esteElmt[prop] == "function" &&
          Array.isArray(nvsProps[prop])
        ) {
          esteElmt[prop](...nvsProps[prop]);
        } else {
          try {
            esteElmt[prop] = nvsProps[prop];
          } catch (err) {
            esteElmt.setAttribute(prop, nvsProps[prop]);
          }
        }
      }
      return esteElmt;
    }

    function _div(props = {}, ...nodulo) {
      return NReact("div", props, nodulo);
    }
    function _pre(props = {}, ...nodulo) {
      return NReact("pre", props, nodulo);
    }

    function _dialog(props = {}, ...nodulo) {
      return NReact("dialog", props, nodulo);
    }
    function _style(props = {}, ...nodulo) {
      return NReact("style", props, nodulo);
    }

    function _textarea(props = {}, ...nodulo) {
      return NReact("textarea", props, nodulo);
    }

    function _button(props = {}, ...nodulo) {
      return NReact("button", props, nodulo);
    }

    /** @type {HTMLTextAreaElement} */
    const textarea = _textarea(
      {
        className: "form-control font-monospace",
        style: {
          resize: "both"
        },
        rows: 5,
        cols: 50
      }
    );

    function criarSugestoes(texto, pos) {
      const esquerda = texto.slice(0, pos);
      const tokenMatch = /(?:^|\s)([\w$\.]+)$/.exec(esquerda);
      if (!tokenMatch) return [];

      const token = tokenMatch[1];
      const ultimaParte = token.includes('.') ? token.slice(token.lastIndexOf('.') + 1) : token;
      const objectPath = token.includes('.') ? token.slice(0, token.lastIndexOf('.')) : null;

      if (objectPath) {
        try {
          const objeto = Function(`"use strict"; return ${objectPath}`)();
          if (objeto != null && (typeof objeto === 'object' || typeof objeto === 'function')) {
            return Object.getOwnPropertyNames(objeto).filter(prop => prop.startsWith(ultimaParte));
          }
        } catch (err) {
          // objeto não existe ou não pode ser avaliado
        }
      }

      return lista.filter(palavra => palavra.startsWith(ultimaParte));
    }

    function aplicarSugestao(nome) {
      const pos = textarea.selectionStart;
      const texto = textarea.value;
      const esquerda = texto.slice(0, pos);
      const direita = texto.slice(pos);
      const tokenMatch = /(?:^|\s)([\w$\.]+)$/.exec(esquerda);

      if (!tokenMatch) {
        textarea.value = esquerda + nome + direita;
        textarea.selectionStart = textarea.selectionEnd = esquerda.length + nome.length;
        return;
      }

      const token = tokenMatch[1];
      const prefixo = token.includes('.')
        ? esquerda.slice(0, esquerda.length - token.length + token.lastIndexOf('.') + 1)
        : esquerda.slice(0, esquerda.length - token.length);
      const novoTexto = prefixo + nome + direita;
      const novoPos = prefixo.length + nome.length;

      textarea.value = novoTexto;
      textarea.selectionStart = textarea.selectionEnd = novoPos;
    }

    const lista = Object.getOwnPropertyNames(globalThis).sort();

    const listGroup = _div(
      {
        className: "list-group border shadow-sm p-1 rounded-3",
      }
    );

    let valorRecuperar;

    textarea.addEventListener(
      "input",
      () => {
        listGroup.showPopover();
        const pos = textarea.selectionStart;
        const texto = textarea.value;

        const esquerda = texto.slice(0, pos);

        const sugestoes = criarSugestoes(texto, pos);

        listGroup.replaceChildren(
          ...sugestoes.map(
            nome => (
              _button(
                {
                  className: "list-group-item list-group-item-action py-0",
                  onclick: () => {
                    aplicarSugestao(nome);
                    listGroup.hidePopover();
                  }
                },
                nome
              )
            )
          )
        );

      }
    );

    const content = _div({ className: "d-flex flex-column gap-1" });

    const dialog = _dialog(
      {
        className: "modaldialogo"
      },
      _div(
        { className: "d-flex h-100" },
        _div(
          { className: "d-flex flex-column mh-100 m-auto bg-body card p-3 gap-2" },
          _div(
            {
              className: "overflow-auto"
            },
            content
          ),
          ...aplicarAncoraPopOver(
            _div(
              {},
              textarea,
            ),
            listGroup
          ),
          _div(
            {
              className: "d-flex mt-2 gap-3 justify-content-end"
            },
            _button(
              {
                className: "btn btn-secondary",
                onclick: () => {
                  dialog.close();
                }
              },
              "Fechar"
            ),
            _button(
              {
                className: "btn btn-secondary",
                onclick: () => {
                  const valor = textarea.value;
                  textarea.value = "";
                  valorRecuperar = valor;
                  eval(valor);
                }
              },
              "Executar"
            )
          )
        )
      )
    );

    function adicionarAoPainel(msg, type) {
      const value = valorRecuperar;
      valorRecuperar = null;
      content.appendChild(
        _div(
          { className: "d-flex" },
          execute(
            _pre(
              {
                className: `bg-${type}-subtle border-bottom m-0 p-1 col rounded-1`
              },
              objetoTexto(msg)
            ),
            (pre) => {
              setTimeout(() => {
                pre.scrollIntoView();
              });
            }
          ),
          value ? _div(
            {},
            _button(
              {
                className: "btn btn-info btn-sm fs-4 ms-1 lh-1 sticky-top ",
                onclick: () => {
                  textarea.value = value;
                }
              },
              "⟲"
            )
          ) :
            document.createDocumentFragment()
        )
      );
    }

    const metodos = [
      ['log', 'light'],
      ['warn', 'warning'],
      ['error', 'danger'],
      ['info', 'info'],
    ];

    for (const [metodo, cor] of metodos) {

      const original = console[metodo];

      console[metodo] = function (...args) {
        original.apply(console, args);

        adicionarAoPainel(args, cor);
      };

    }

    function objetoTexto(objeto) {
      const listagem = new Set();

      function objetoTextoSimplificado(objeto, indentacao = 0) {

        if (objeto && typeof objeto === "object") {
          const lista = [];

          if (listagem.has(objeto))
            return `${objeto}`;

          listagem.add(objeto);

          for (const propriedade in objeto) {
            lista.push(
              `\n${indentar(indentacao)}${propriedade}: ${objetoTextoSimplificado(objeto[propriedade], indentacao + 1)}`
            );
          }

          return lista.join('');
        }

        return `${objeto}`;
      }

      function indentar(n = 0) {
        return ('  '.repeat(n));
      }

      return objetoTextoSimplificado(objeto).trimStart();
    }



    window.onerror = function (event, source, lineno, colno, error) {
      adicionarAoPainel(
        {
          event,
          source,
          lineno,
          colno,
          message: error.message,
          stack: error.stack,
          cause: error.cause
        },
        "danger"
      );
      return false;
    };

    window.onunhandledrejection = function (event) {
      adicionarAoPainel({ reason: event.reason }, "danger");
    };

    document.body.append(
      _div(
        {},
        dialog,
        _button(
          {
            className: "btn btn-secondary",
            onclick: () => {
              dialog.showModal();
            }
          },
          "Abrir"
        )
      )
    );

    // dialog.showModal();
  }
)();


function aplicarAncoraPopOver(input, recipiente) {
  const id = crypto.randomUUID();

  input.style.setProperty("anchor-name", `--${id}`);

  recipiente.classList.add("popover-on", "ancorado-ao-botao");
  recipiente.id = id;
  recipiente.popover = "auto";
  recipiente.style.setProperty("position-anchor", `--${id}`);

  input.addEventListener(
    "click",
    () => {
      recipiente.showPopover();
    }
  );

  return [input, recipiente]

}