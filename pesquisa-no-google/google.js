const destino = `https://www.google.com/search?`;

const input = inputSearch();

const links = [
  gg("google", "Pesquisa", "web"),
  gg("image", "Imagens", 2),
  gg("play-btn", "Vídeos", 7),
  gg("file-play", "Vídeos curtos", 39),
  gg("cart4", "Shopping", 28),
  gg("newspaper", "Noticias", "nws"),
  gg("book", "Livros", 36),
  gg("robot", "Gemini", 50),
];

document.body.append(
  container(
    form(input),
    listGroup(
      ...links
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

    if (text)
      for(const link of links)
        link.setLink(text);
    else
      for(const link of links)
        link.removeAttribute("href");
  }
);

function gg(icone, label, target) {
  const a = aBlank(googleIco(icone), label);
  a.setLink = function setLink(text) {
    const param = new URLSearchParams();
    param.append("q", text);
    param.append("udm", target);
    a.href = destino + param + "#rso";
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
      links[0].click();
    }
  );
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

document.documentElement.addEventListener(
  "click",
  () => { input.focus(); },
);
