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
        rows: 5
      }
    );

    function aplicarPopOver() {
      
    }

    const lista = Object.getOwnPropertyNames(globalThis).sort();

    const listGroup = _div(
      { className: "list-group" }
    );

    textarea.addEventListener(
      "input",
      () => {
        const pos = textarea.selectionStart;
        const texto = textarea.value;

        const esquerda = texto.slice(0, pos);

        const palavras = esquerda.split(/\s+/);
        const ultimaPalavra = palavras[palavras.length - 1];

        console.log(ultimaPalavra);

        const meus = lista.filter(palavra => palavra.startsWith(ultimaPalavra));

        console.log(meus);

        listGroup.replaceChildren(
          ...meus.map(
            nome => (
              _button(
                {
                  className: "list-group-item list-group-item-action py-0"
                },
                nome
              )
            )
          )
        );

      }
    );

    const content = _div();


    const dialog = _dialog(
      {
        className: "border rounded-3"
      },
      _div(
        {},
        content
      ),
      _div(
        {},
        "Executar:"
      ),
      textarea,
      _div(
        {
          className: "d-flex mt-3 gap-3"
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
              eval(valor);
            }
          },
          "Executar"
        )
      )
    );

    function adicionarAoPainel(msg, type) {
      content.appendChild(
        _div(
          {},
          _pre(
            {
              className: `bg-${type}-subtle border-bottom m-0`
            },
            objetoTextoSimplificado(msg).trimStart()
          )
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

    function objetoTextoSimplificado(objeto, indentacao = 0) {

      if (objeto && typeof objeto === "object") {
        const lista = [];

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

    dialog.showModal();

  }
)();