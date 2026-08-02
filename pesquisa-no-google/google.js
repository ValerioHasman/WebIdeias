const destino = `https://www.google.com/search?`;

const input = inputSearch();

const google = gg("google", "Pesquisa", "web");
const googleImagem = gg("image", "Imagens", 2);
const googleVideo = gg("play-btn", "Vídeos", 7);
const googleVideo = gg("file-play", "Vídeos curtos", 39);
const googleShopping = gg("cart4", "Shopping", 28);
const googleNoticias = gg("newspaper", "Noticias", "nws");
const googleLivros = gg("book", "Livros", 36);
const googleGemini = gg("robot", "Gemini", 50);

document.body.append(
  container(
    form(input),
    listGroup(
      google,
      googleImagem,
      googleVideo,
      googleShopping,
      googleNoticias,
      googleLivros,
      googleGemini,
    )
  )
);

(function tema() {
  if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
    document.documentElement.dataset.bsTheme = "dark"
  }
})();

input.addEventListener(
  "input",
  () => {

    const text = input.value.trim();

    if (text) {
      google.setLink(text);
      googleImagem.setLink(text);
      googleVideo.setLink(text);
      googleShopping.setLink(text);
      googleNoticias.setLink(text);
      googleLivros.setLink(text);
      googleGemini.setLink(text);
    } else {
      google.removeAttribute("href");
      googleImagem.removeAttribute("href");
      googleVideo.removeAttribute("href");
      googleShopping.removeAttribute("href");
      googleNoticias.removeAttribute("href");
      googleLivros.removeAttribute("href");
      googleGemini.removeAttribute("href");
    }
  }
);

function gg(icone, label, target) {
  const a = aBlank(googleIco(icone), label);
  a.setLink = function setLink(text) {
    const param = new URLSearchParams();
    param.append("q", text);
    param.append("udm", target);
    google.href = destino + param + "#rso";
  }
  return a;
}

function aBlank(...label) {
  const a = document.createElement("a");
  a.className = "d-flex flex-wrap gap-3"
  a.append(...label, linkBlank());
  a.target = "_blank";
  return a;
}

function container(...f) {
  const div = document.createElement("div");
  div.className = "container py-3";
  div.style.maxWidth = "512px";
  div.append(...f);
  return div;
}

function listGroup(...f) {
  const div = document.createElement("div");
  div.className = "list-group my-3 gap-1";
  const frag = document.createDocumentFragment();

  for (const i of f) {
    if (i.classList)
      i.classList.add("list-group-item", "list-group-item-action", "rounded-3", "border-0");
    frag.append(i);
  }

  div.append(frag);
  return div;
}

function inputSearch() {
  const input = document.createElement("input");
  input.className = "form-control rounded-3";
  input.type = "search";
  input.name = "q";
  input.required = true;
  input.autofocus = true;
  return input;
}

function form(...f) {
  const form = document.createElement("form");
  form.append(...f);
  form.addEventListener(
    'submit',
    (ev) => {
      ev.preventDefault();
      google.click();
    }
  )
  return form;
}

function googleIco(google) {
  const i = document.createElement("i");
  i.className = `bi bi-${google}`;
  return i;
}

function linkBlank() {
  const i = document.createElement("i");
  i.className = "bi bi-box-arrow-up-right ms-auto";
  return i;
}

document.body.addEventListener(
  "click",
  () => { input.focus(); },
);
