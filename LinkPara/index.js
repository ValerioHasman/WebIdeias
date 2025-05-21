"use strict";

const input = document.querySelector("input[id=file]");
const input1 = document.querySelector("input[id=inp1]");
const btn1 = document.querySelector("button[id=btn1]");
const a1 = document.querySelector("a[id=a1]");
const input2 = document.querySelector("input[id=inp2]");
const btn2 = document.querySelector("button[id=btn2]");
const a2 = document.querySelector("a[id=a2]");
const numcaracbase = document.querySelector("[data-caracteres=base64]");
const numcaracuri = document.querySelector("[data-caracteres=encodeURIComponent]");

input.addEventListener("click", limpaResultado);

btn1.addEventListener("click", copiar1);
btn2.addEventListener("click", copiar2);

function copiar1() {
  input1.focus();
  retornoDeCopiar(navigator.clipboard.writeText(input1.value), this);
}

function copiar2() {
  input2.focus();
  retornoDeCopiar(navigator.clipboard.writeText(input2.value), this);
}

/**
 * @param {Promise<void>} promise
 * @param {HTMLButtonElement} button */
function retornoDeCopiar(promise, button) {
  button.disabled = true;
  const span = button.querySelector("span");
  promise
    .then(() => { span.className = "icon-check"; })
    .catch((err) => {
      console.error(err);
      span.className = "icon-erro"
    })
    .finally(() => {
      setTimeout(() => {
        span.className = "icon-copy";
        button.disabled = false;
      }, 2000);
    });
}

input.addEventListener("change", function (event) {
  const file = event.target.files[0];
  lerComoTexto(file);
  lerComoBufferDeMatriz(file);
});

/** @param {File} file */
function lerComoTexto(file) {
  console.log(file)
  const reader = new FileReader();
  reader.onload = function (ev) { inserirDados(ev.target.result, file.type) };
  reader.readAsText(file);
}

/** @param {File} file */
function lerComoBufferDeMatriz(file = File()) {
  const reader = new FileReader();
  reader.onload = function (ev) { inserirDadosBin(ev.target.result, file.type) };
  reader.readAsArrayBuffer(file);
}

function inserirDados(result, type) {
  const urlenco = `data:${type},${encodeURIComponent(result)}`;
  input2.value = urlenco;
  a2.href = urlenco;
  numcaracuri.innerHTML = urlenco.length;
}

/** @param {ArrayBuffer} result */
function inserirDadosBin(result, type) {
  const urlbase = `data:${type};base64,${paraBase64bin(result)}`;
  input1.value = urlbase;
  a1.href = urlbase;
  numcaracbase.innerHTML = urlbase.length;
}

/** @param {ArrayBuffer} result */
function paraBase64bin(buffer) {
  let binary = '';
  const bytes = new Uint8Array(buffer);
  for (let i = 0; i < bytes.byteLength; i++) {
    binary += String.fromCodePoint(bytes[i]);
  }
  return btoa(binary);
}

function limpaResultado() {
  input.parentElement.style.display = "none";
  input.value = "";
  input1.value = "";
  input2.value = "";
  a1.href = "./";
  a2.href = "./";
  numcaracbase.innerHTML = "";
  numcaracuri.innerHTML = "";
}

window.addEventListener("focus", () => {
  input.parentElement.style.display = "";
});