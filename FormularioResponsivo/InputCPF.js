/**
 * Cria um input de CPF com máscara e validação
 * @param {Partial<HTMLInputElement>} props - Propriedades do input
 * @returns {HTMLInputElement}
 */
export function inputCPF(props = {}) {
  const inputElement = document.createElement("input");

  Object.assign(inputElement, {
    type: "text",
    inputMode: "numeric",
    maxLength: 14,
    placeholder: "000.000.000-00",
    // pattern: "^\\d{3}\\.\\d{3}\\.\\d{3}-\\d{2}$",
    pattern: /^\d{3}\.\d{3}\.\d{3}-\d{2}$/,
    ...props
  });

  inputElement.addEventListener("input", handleCPFInput);
  inputElement.addEventListener("keydown", handleCPFKeydown);

  return inputElement;
}

/**
 * Aplica a máscara de CPF ao valor
 * @param {string} value - Valor sem formatação
 * @returns {string} - Valor formatado
 */
function formatCPF(value) {
  const digits = value.replace(/\D/g, "").slice(0, 11);

  if (digits.length <= 3) {
    return digits;
  }
  if (digits.length <= 6) {
    return `${digits.slice(0, 3)}.${digits.slice(3)}`;
  }
  if (digits.length <= 9) {
    return `${digits.slice(0, 3)}.${digits.slice(3, 6)}.${digits.slice(6)}`;
  }
  return `${digits.slice(0, 3)}.${digits.slice(3, 6)}.${digits.slice(6, 9)}-${digits.slice(9)}`;
}

/**
 * Handler para o evento input - aplica a máscara
 * @param {InputEvent} event
 */
function handleCPFInput(event) {
  const input = event.target;
  const cursorPos = input.selectionStart;
  const oldValue = input.value;
  const oldLength = oldValue.length;

  input.value = formatCPF(input.value);

  const newLength = input.value.length;
  const diff = newLength - oldLength;

  let newCursorPos = cursorPos + diff;
  if (newCursorPos < 0) newCursorPos = 0;
  if (newCursorPos > newLength) newCursorPos = newLength;

  input.setSelectionRange(newCursorPos, newCursorPos);
}

/**
 * Handler para keydown - permite apenas números e teclas de controle
 * @param {KeyboardEvent} event
 */
function handleCPFKeydown(event) {
  const allowedKeys = [
    "Backspace",
    "Delete",
    "Tab",
    "Escape",
    "Enter",
    "ArrowLeft",
    "ArrowRight",
    "ArrowUp",
    "ArrowDown",
    "Home",
    "End"
  ];

  if (allowedKeys.includes(event.key)) {
    return;
  }

  if (event.ctrlKey || event.metaKey) {
    return;
  }

  if (!/^\d$/.test(event.key)) {
    event.preventDefault();
  }
}
