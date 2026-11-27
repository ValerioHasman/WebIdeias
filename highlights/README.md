# highlights

Busca client-side com **destaque de termos** sobre um dataset grande, em
JavaScript puro (ES modules, sem build). Digite no campo e a lista filtra em
tempo real, realçando os trechos que casam — **ignorando acento e caixa**, mas
preservando o texto original.

## Destaques

- 🔎︎ **Busca insensível a acento e caixa** por substring, multi-termo (lógica "E").
- ✨︎ **Destaque preservando o original**: busca `sao` acha e exibe **São**.
- ⏯︎ **Renderização incremental não-bloqueante**: cede a thread periodicamente e
  renderiza em lotes, então a UI não trava mesmo varrendo o dataset inteiro.
- ⏱︎ **Debounce** na digitação e **cancelamento** de buscas obsoletas.
- 🔄︎ **Feedback de estado** via spinner (eventos `buscando`/`carregado`).
- 🎨︎ UI em **Bootstrap 5.3** (via CDN) + ícones; sem passo de build.

## Stack

- **JavaScript (ES modules)** — sem bundler, sem dependências instaladas.
- **Bootstrap 5.3** e **Bootstrap Icons** (CDN, ver `index.html`).
- **`Elemento.js`** — helper próprio para criar elementos DOM de forma declarativa.

## Estrutura

```
highlights/
├─ index.html              # entrada: carrega Bootstrap + main.js (type="module")
├─ main.js                 # monta a UI e liga os dados ao buscador
├─ main.css                # estilos próprios (anel de foco, monitor de trava)
├─ Elemento.js             # helper de criação de elementos DOM
├─ dadosFull.txt           # pseudo-dados (~59 MB, uma frase por linha)
└─ SearchHighlight/
   └─ SearchHighlight.js   # o motor de busca + destaque  (ver README da pasta)
```

## Como rodar

O app usa **ES modules + `fetch`**, então precisa ser servido por **HTTP**
(não funciona abrindo o `index.html` via `file://`). Qualquer servidor estático
serve:

```sh
npx serve -p 6546
# abra http://localhost:6546/
```

> O `dadosFull.txt` tem ~59 MB; o primeiro carregamento busca e transforma o
> arquivo inteiro em memória.

## Como funciona (visão geral)

- **`main.js`** é a *fiação*: cria o campo de busca, a lista, instancia o
  `SearchHighlight` e define **o formato dos dados** (o que é pesquisável e como
  cada resultado é renderizado) via callbacks. Não contém lógica de busca.
- **`SearchHighlight/`** é o *motor* reutilizável e agnóstico de layout — toda a
  busca, normalização e destaque vivem ali. **[Veja o README do componente](SearchHighlight/README.md).**
- **`Elemento.js`** é o utilitário de DOM usado para montar a árvore.
- **`main.css`** traz o anel de foco estilo *form-adorn* do Bootstrap
  (`label.form-control:focus-within`) e o estilo do monitor de trava.

### Peças de UI e diagnóstico

- **Barra sticky** com `label.form-control` (padrão *form-adorn*): input
  `form-control-plaintext` sem borda + ícone de busca, que vira **spinner**
  enquanto busca.
- **Lista de resultados** (`list-group`): cada item mostra o índice, o primeiro
  nome destacado, o **tempo de render em ms** (via `msPrint`), a frase e a data.
- **Monitor de Trava**: um bloco que anima a cada 3 s; se a thread principal
  travar, ele **congela** — um detector visual de *jank* durante a busca.
- **Pseudo-API**: `dadosPseudoApi()` simula uma API, montando objetos
  `{ nome, primeiroNome, data, indice }` com data aleatória (`dataAleatoria`).

## Testes

O app é exercitado por testes **E2E com Playwright** que batem na página servida
(em `localhost:6546`) — validando o destaque, o feedback de estado e o
comportamento sob o dataset grande. O ambiente de testes fica **fora deste
repositório** (para manter o projeto sem dependências).
