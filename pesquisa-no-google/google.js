const destino = `https://www.google.com/search?`;

const input = inputSearch();

const google = aBlank(googleIco(), "Pesquisa");
const googleImagem = aBlank(googleIco(), "Imagens");
const googleVideo = aBlank(googleIco(), "Vídeos");
const googleShopping = aBlank(googleIco(), "Shopping");
const googleNoticias = aBlank(googleIco(), "Noticias");
const googleGemini = aBlank(googleIco(), "Gemini");

document.body.append(
  container(
    input,
    listGroup(
      google,
      googleImagem,
      googleVideo,
      googleShopping,
      googleNoticias,
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

    setGoogle(text);
    setGoogleImagem(text);
    setGoogleVideo(text);
    setGoogleShopping(text);
    setGoogleNoticias(text);
    setGoogleGemini(text);

  }
);

function setGoogle(text) {
  const param = new URLSearchParams();
  param.append("q", text);
  param.append("udm", "web");
  google.href = destino + param;
}

function setGoogleImagem(text) {
  const param = new URLSearchParams();
  param.append("q", text);
  param.append("udm", 2);
  googleImagem.href = destino + param;
}

function setGoogleVideo(text) {
  const param = new URLSearchParams();
  param.append("q", text);
  param.append("udm", 7);
  googleVideo.href = destino + param;
}

function setGoogleShopping(text) {
  const param = new URLSearchParams();
  param.append("q", text);
  param.append("udm", 28);
  googleShopping.href = destino + param + "#rso";
}

function setGoogleNoticias(text) {
  const param = new URLSearchParams();
  param.append("q", text);
  param.append("tbm", "nws");
  googleNoticias.href = destino + param;
}

function setGoogleGemini(text) {
  const param = new URLSearchParams();
  param.append("q", text);
  param.append("udm", 50);
  googleGemini.href = destino + param;
}

function aBlank(...label) {
  const a = document.createElement("a");
  a.className = "d-flex"
  a.append(...label, linkBlank());
  a.target = "_blank";
  return a;
}

function container(...f) {
  const div = document.createElement("div");
  div.className = "container py-3";
  div.style.maxWidth = "512px";
  div.append(...f);
  div.addEventListener(
    "click",
    () => { input.focus(); },
    { once: true }
  )
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
  input.autofocus = true;
  return input;
}

function googleIco() {
  const i = document.createElement("i");
  i.className = "bi bi-google me-3";
  return i;
}

function linkBlank() {
  const i = document.createElement("i");
  i.className = "bi bi-box-arrow-up-right ms-auto";
  return i;
}