const textarea = document.querySelector("textarea");
const [buttom, buttonS] = document.querySelectorAll("button");
const i = buttom.querySelector("i");
const a = document.querySelector("a");

const sp = new URLSearchParams(location.search);

const objeto = Object.fromEntries(sp);

textarea.value = objeto.mnsgm ?? "";

buttom.addEventListener(
  "click",
  async () => {
    i.classList.add("bi-check2-square");
    i.classList.remove("bi-copy");
    buttom.disabled = true;
    await navigator.clipboard.writeText(textarea.value);
    await new Promise(r => setTimeout(r, 1500));
    i.classList.remove("bi-check2-square");
    i.classList.add("bi-copy");
    buttom.disabled = false;
  }
);

if (objeto.blq) {
  document.querySelectorAll(".rmv").forEach(e => e.remove());
  textarea.readOnly = true;
}

function atualizar() {
  const sp = new URLSearchParams(location.search);
  sp.set("mnsgm", textarea.value);
  sp.set("blq", true);
  a.href = location.origin + location.pathname + "/?" + sp;
}

textarea.addEventListener("change", atualizar);

atualizar();
