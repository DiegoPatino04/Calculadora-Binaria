/**
 * Valida si una cadena contiene únicamente bits 0 y 1.
 *
 * @param {string} value
 * @returns {boolean}
 */
export function isBinary(value) {
  return /^[01]+$/.test(value);
}

/**
 * Valida un número binario teniendo en cuenta
 * el máximo de 5 bits permitido para las entradas.
 *
 * @param {string} value
 * @returns {object}
 */
export function validateBinaryInput(value) {
  if (value === '') {
    return {
      valid: false,
      message: 'Ingrese un número binario.'
    };
  }

  if (!isBinary(value)) {
    return {
      valid: false,
      message: 'Solo se permiten los caracteres 0 y 1.'
    };
  }

  if (value.length > 5) {
    return {
      valid: false,
      message: 'El número no puede tener más de 5 bits.'
    };
  }

  return {
    valid: true,
    message: ''
  };
}

/**
 * Limpia una entrada para conservar únicamente
 * caracteres binarios y máximo 5 bits.
 *
 * @param {string} value
 * @returns {string}
 */
export function sanitizeBinaryInput(value) {
  return value
    .replace(/[^01]/g, '')
    .slice(0, 5);
}