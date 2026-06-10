import obterMatrizCores from './obterMatrizCores.js';

/**
 * @param {Object} options
 * @param {number} [options.size=200] - Tamanho do canvas
 * @returns {{range: HTMLInputElement, canvas: HTMLCanvasElement, getColor: () => {r: number, g: number, b: number}, setHue: (value: number) => void}}
 */
export default function triangleColorPicker(options = {}) {
  const size = options.size || 200;
  const matrizCores = obterMatrizCores();

  let hueAtual = 0;
  let corSelecionada = { r: 255, g: 0, b: 0 };
  let posicaoSelecionada = null;

  const range = rangeHue();
  const { canvas, ctx } = canvasElemento();
  const vertices = verticesTriangulo();

  function rangeHue() {
    const input = document.createElement('input');
    input.className = "form-range range-espectro-hue";
    input.type = 'range';
    input.min = '0';
    input.max = String(matrizCores.length - 1);
    input.value = '0';
    input.style.width = `${size}px`;
    return input;
  }

  function canvasElemento() {
    const canvas = document.createElement('canvas');
    canvas.width = size;
    canvas.height = size;
    const ctx = canvas.getContext('2d');
    return { canvas, ctx };
  }

  function verticesTriangulo() {
    const altura = size * 0.85;
    const margemTop = size * 0.08;
    const centroX = size / 2;

    return {
      topo: { x: centroX, y: margemTop },
      esquerda: { x: centroX - altura / 2, y: margemTop + altura },
      direita: { x: centroX + altura / 2, y: margemTop + altura }
    };
  }

  function calcularBaricentricas(x, y) {
    const { topo, esquerda, direita } = vertices;

    const denom = (esquerda.y - direita.y) * (topo.x - direita.x) +
      (direita.x - esquerda.x) * (topo.y - direita.y);

    const u = ((esquerda.y - direita.y) * (x - direita.x) +
      (direita.x - esquerda.x) * (y - direita.y)) / denom;

    const v = ((direita.y - topo.y) * (x - direita.x) +
      (topo.x - direita.x) * (y - direita.y)) / denom;

    const w = 1 - u - v;

    return { u, v, w };
  }

  function dentroDoTriangulo(coords) {
    return coords.u >= 0 && coords.v >= 0 && coords.w >= 0;
  }

  function interpolarCor(coords) {
    const corBase = matrizCores[hueAtual];
    return {
      r: Math.round(corBase.r * coords.u + 255 * coords.v),
      g: Math.round(corBase.g * coords.u + 255 * coords.v),
      b: Math.round(corBase.b * coords.u + 255 * coords.v)
    };
  }

  function desenharIndicador() {
    if (!posicaoSelecionada) return;

    ctx.beginPath();
    ctx.arc(posicaoSelecionada.x, posicaoSelecionada.y, 6, 0, Math.PI * 2);
    ctx.strokeStyle = '#000';
    ctx.lineWidth = 2;
    ctx.stroke();

    ctx.beginPath();
    ctx.arc(posicaoSelecionada.x, posicaoSelecionada.y, 4, 0, Math.PI * 2);
    ctx.strokeStyle = '#fff';
    ctx.lineWidth = 2;
    ctx.stroke();
  }

  function desenharTriangulo() {
    ctx.clearRect(0, 0, size, size);

    const imageData = ctx.createImageData(size, size);
    const data = imageData.data;

    for (let y = 0; y < size; y++) {
      for (let x = 0; x < size; x++) {
        const coords = calcularBaricentricas(x, y);

        if (dentroDoTriangulo(coords)) {
          const cor = interpolarCor(coords);
          const idx = (y * size + x) * 4;
          data[idx] = cor.r;
          data[idx + 1] = cor.g;
          data[idx + 2] = cor.b;
          data[idx + 3] = 255;
        }
      }
    }

    ctx.putImageData(imageData, 0, 0);
    desenharIndicador();
  }

  function obterCorNaPosicao(x, y) {
    const coords = calcularBaricentricas(x, y);
    if (dentroDoTriangulo(coords)) {
      return interpolarCor(coords);
    }
    return null;
  }

  function atualizarCorSelecionada() {
    if (posicaoSelecionada) {
      const cor = obterCorNaPosicao(posicaoSelecionada.x, posicaoSelecionada.y);
      if (cor) {
        corSelecionada = cor;
      }
    }
  }

  function selecionarCor(e) {
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const cor = obterCorNaPosicao(x, y);
    if (cor) {
      corSelecionada = cor;
      posicaoSelecionada = { x, y };
      desenharTriangulo();
      canvas.dispatchEvent(new CustomEvent('colorchange', { bubbles: true, detail: corSelecionada }));
    }
  }

  function registrarEventos() {
    range.addEventListener('input', () => {
      hueAtual = parseInt(range.value);
      atualizarCorSelecionada();
      desenharTriangulo();
      canvas.dispatchEvent(new CustomEvent('colorchange', { bubbles: true, detail: corSelecionada }));
    });

    canvas.addEventListener('click', selecionarCor);

    let arrastando = false;
    canvas.addEventListener('mousedown', (e) => {
      arrastando = true;
      selecionarCor(e);
    });
    canvas.addEventListener('mousemove', (e) => {
      if (arrastando) selecionarCor(e);
    });
    canvas.addEventListener('mouseup', () => arrastando = false);
    canvas.addEventListener('mouseleave', () => arrastando = false);
  }

  registrarEventos();
  desenharTriangulo();

  return {
    range,
    canvas,
    getColor: () => ({ ...corSelecionada }),
    setHue: (value) => {
      hueAtual = Math.max(0, Math.min(value, matrizCores.length - 1));
      range.value = String(hueAtual);
      desenharTriangulo();
    },
    onColorChange: (callback) => {
      canvas.addEventListener('colorchange', (e) => callback(e.detail));
    }
  };
}
