/**
 * Decompõe uma string de regex em um array de partes lógicas.
 * @param {string} pattern
 * @returns {string[]} - Array com as partes decompostas
 */
export function decomporRegex(pattern) {
  const regexToken = /(\^|\$|\\?.(?:\{.*?\})?|\\?.)/g;


  if (pattern instanceof RegExp) {

    const patternStr = pattern.toString();

    const list = patternStr.match(regexToken) || [];

    list.shift();
    list.pop();
    return list;
  }

  return pattern.match(regexToken) || [];
}

const resultado = decomporRegex(`^\\d{3}\\.\\d{3}\\.\\d{3}-\\d{2}$`);

console.log(resultado);