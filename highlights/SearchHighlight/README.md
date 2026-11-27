# SearchHighlight

Motor de **busca com destaque** reutilizável e **agnóstico de layout**. Recebe um
container e uma lista de itens, filtra conforme o texto digitado (ignorando
acento e caixa) e renderiza os resultados com os termos realçados — tudo sem
travar a UI, mesmo em datasets grandes.

Estende `EventTarget`, então emite eventos de ciclo de vida (`buscando`,
`carregado`). O *como pesquisar* e o *como renderizar* são injetados por
callbacks — a classe não conhece Bootstrap nem o formato dos seus dados.

## Uso

```js
import SearchHighlight from "./SearchHighlight/SearchHighlight.js";

const lista = document.querySelector("#resultados");
const buscador = new SearchHighlight(lista);

// 1) o que é pesquisável em cada item  (DEFINA antes de atribuir `dados`)
buscador.callbackTexto = (item) => [item.primeiroNome, item.nome].join(" ");

// 2) como renderizar cada resultado (use `destacar` para realçar os termos)
buscador.callbackDestacar = (item, termos) => {
  const li = document.createElement("div");
  li.className = "list-group-item";
  li.append(buscador.destacar(item.nome, termos));
  return li;
};

// 3) feedback de estado (opcional)
buscador.addEventListener("buscando", () => mostrarSpinner());
buscador.addEventListener("carregado", () => esconderSpinner());

// 4) dados + ligação ao input
buscador.dados = await carregarDados();
input.addEventListener("input", (e) => buscador.buscar(e.target.value));
```

## API

### Construtor

`new SearchHighlight(container)`
- `container` — `HTMLElement` onde os resultados são renderizados.

Os dados são atribuídos depois, por `buscador.dados = [...]` — assim você define
`callbackTexto` antes, e o catálogo já sai com a projeção certa.

### Propriedades

| Propriedade | Tipo | Default | Descrição |
|---|---|---|---|
| `className` | `string` | `"fw-bold"` | Classe CSS aplicada ao `<span>` de destaque. |
| `vazioValido` | `boolean` | `false` | Se `true`, busca vazia mostra tudo; se `false`, limpa a lista. |

### Setters (validados)

| Setter | Tipo | Default | Descrição |
|---|---|---|---|
| `limite` | inteiro > 0 | `20` | Máximo de resultados renderizados. |
| `atraso` | inteiro > 0 (ms) | `500` | Debounce entre digitar e buscar. |
| `respiro` | inteiro > 0 | `10000` | Itens percorridos entre cada "respiro" (yield + flush parcial). Menor = UI mais responsiva, busca mais lenta. |
| `container` | `HTMLElement` | — | Troca o container de saída. |
| `dados` | `Array` | — | (Re)constrói o catálogo normalizado usando `callbackTexto`. |

### Getters

- `thread` → `number` — contador interno de buscas (token de cancelamento), somente leitura.
- `respiro` → `number`.

### Callbacks (injeção de dependência)

| Callback | Assinatura | Default | Papel |
|---|---|---|---|
| `callbackTexto` | `(item) => string` | identidade | Projeta o item no **texto pesquisável**. |
| `callbackDestacar` | `(item, termos) => Node` | `destacar(item, termos)` | Constrói o **nó DOM** de cada resultado. |

### Métodos

| Método | Retorno | Descrição |
|---|---|---|
| `buscar(texto)` | `void` | Agenda a busca (com debounce). É o que você liga ao `input`. |
| `buscarAgora(texto)` | `Promise<void>` | Executa a busca imediatamente (sem debounce). |
| `destacar(frase, termos)` | `DocumentFragment` | A frase com os termos realçados em `<span>`. |
| `highlight(fragmento)` | `HTMLSpanElement` | Envolve o conteúdo num `<span class={className}>`. |

### Eventos

Disparados pela própria classe (o `addEventListener` é tipado para autocompletar):

| Evento | Quando |
|---|---|
| `"buscando"` | No **início** de cada busca — bom para mostrar o spinner. |
| `"carregado"` | Ao **terminar** (inclusive no caminho de busca vazia). |

## Como funciona por dentro

### Pipeline de busca

1. `buscar(texto)` → **debounce** (`Agendador`, `atraso` ms).
2. `buscarAgora`:
   - incrementa `#thread` (**token de cancelamento**), limpa o container, dispara `"buscando"`;
   - percorre o `#catalogo` (um `Map` item → texto já normalizado):
     - a cada `respiro` itens, **cede a thread** (`await setTimeout`) e faz **flush parcial** do fragmento → render progressivo, sem travar a UI;
     - após cada `await`, se `#thread` mudou (nova busca entrou), **aborta**;
     - filtra com `compareIncludes` (todos os termos presentes, já normalizados);
     - renderiza via `callbackDestacar`, até atingir `limite`.
   - flush final + dispara `"carregado"`.

### Normalização e catálogo

`limparString` faz `NFD` + remove diacríticos (`\p{Mn}`) + `toLocaleLowerCase()`,
tornando a busca **insensível a acento e caixa**. O catálogo guarda o texto
**já normalizado uma única vez** (no `set dados`), então o loop quente não
re-normaliza nada por tecla.

### Algoritmo de destaque (`destacar`)

Para casar sem acento/caixa **mas exibir o texto original**:

1. Normaliza a frase **caractere a caractere**, mantendo um mapa
   `posição normalizada → índice original`.
2. Marca num **array booleano** os caracteres cobertos por qualquer termo.
3. Uma **passada única** agrupa trechos contíguos marcados em `<span>`.

Como a marcação é por caractere (não por termo), matches **sobrepostos ou
adjacentes se fundem** num único destaque — ex.: buscar `pro or` em "Pror"
produz `«Pror»`, não `«Pr«o»r»`.

## Observações / cuidados

- **Defina `callbackTexto` antes de atribuir `dados`** — o catálogo é construído
  no momento da atribuição. Se mudar `callbackTexto` depois, **reatribua `dados`**
  para reconstruir.
- O catálogo usa os itens como **chave de `Map`**, então assume itens **únicos por
  referência** (itens iguais por referência colapsariam).
- `callbackDestacar` roda no render, então pode ser trocado a qualquer momento
  antes de uma busca.
