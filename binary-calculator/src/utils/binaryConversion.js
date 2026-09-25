/**
 * Convierte un número binario positivo a decimal.
 *
 * @param {string} binary
 * @returns {number}
 */
export function binaryToDecimal(binary) {
  if (!binary || !/^[01]+$/.test(binary)) {
    return NaN;
  }

  return parseInt(binary, 2);
}

/**
 * Convierte un número decimal positivo a binario.
 *
 * @param {number} decimal
 * @returns {string}
 */
export function decimalToBinary(decimal) {
  if (!Number.isInteger(decimal) || decimal < 0) {
    return '';
  }

  return decimal.toString(2);
}

/**
 * Agrega ceros a la izquierda hasta alcanzar
 * una cantidad determinada de bits.
 *
 * @param {string} binary
 * @param {number} width
 * @returns {string}
 */
export function padBinary(binary, width) {
  return binary.padStart(width, '0');
}

/**
 * Convierte un decimal positivo a binario con
 * una cantidad específica de bits.
 *
 * @param {number} decimal
 * @param {number} width
 * @returns {string}
 */
export function decimalToPaddedBinary(decimal, width) {
  return padBinary(decimalToBinary(decimal), width);
}

/**
 * Convierte un número binario en su representación
 * decimal como texto.
 *
 * @param {string} binary
 * @returns {string}
 */
export function formatBinaryToDecimal(binary) {
  const decimal = binaryToDecimal(binary);

  if (Number.isNaN(decimal)) {
    return '';
  }

  return decimal.toString();
}