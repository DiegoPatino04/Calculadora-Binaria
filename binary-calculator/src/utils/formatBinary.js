/**
 * Agrega espacios cada cierta cantidad de bits.
 *
 * Ejemplo:
 * 10110101 -> 1011 0101
 *
 * @param {string} binary
 * @param {number} groupSize
 * @returns {string}
 */
export function groupBinary(binary, groupSize = 4) {
  if (!binary) {
    return '';
  }

  const groups = [];

  for (let i = 0; i < binary.length; i += groupSize) {
    groups.push(binary.slice(i, i + groupSize));
  }

  return groups.join(' ');
}

/**
 * Devuelve una representación con subíndice
 * para indicar que el número está en binario.
 *
 * @param {string} binary
 * @returns {string}
 */
export function formatBinary(binary) {
  return `${binary}₂`;
}

/**
 * Devuelve una representación con subíndice
 * para indicar que el número está en decimal.
 *
 * @param {number|string} decimal
 * @returns {string}
 */
export function formatDecimal(decimal) {
  return `${decimal}₁₀`;
}