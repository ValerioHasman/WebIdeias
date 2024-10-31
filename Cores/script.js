import Cores from "./Cores.js";

cor.addEventListener("change", () => {
  inputtexto.value = cor.value;
});
inputtexto.addEventListener("change", () => {
  cor.value = inputtexto.value;
});
buscarCor.addEventListener("submit", (event) => {
  event.preventDefault();
  btnsubmit.disabled = true;
  exibir()
    .finally(() => {
      btnsubmit.disabled = false;
    });
});

exibir();

async function exibir() {
  const cores = new Cores(cor.value);
  inputtexto.value = cores.emHexadecimal();
  resultadoRGB.innerText = cores.emRGB(cores.negativo());
  cornegativa.style.backgroundColor = cores.emHexadecimal(cores.negativo());
  resultadoHEXA.innerText = cores.emHexadecimal(cores.negativo());
}

