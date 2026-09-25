import {
  binaryToDecimal,
  decimalToBinary,
  decimalToPaddedBinary,
  padBinary
} from '../utils/binaryConversion';

/**
 * Realiza una suma binaria.
 *
 * @param {string} binaryA
 * @param {string} binaryB
 * @returns {object}
 */
export function addBinary(binaryA, binaryB) {
  const decimalA = binaryToDecimal(binaryA);
  const decimalB = binaryToDecimal(binaryB);

  const resultDecimal = decimalA + decimalB;
  const resultBinary = decimalToBinary(resultDecimal);

  const width = Math.max(binaryA.length, binaryB.length, resultBinary.length);

  return {
    operation: 'addition',
    binaryA: padBinary(binaryA, width),
    binaryB: padBinary(binaryB, width),
    resultBinary,
    resultDecimal,
    steps: {
      firstLine: padBinary(binaryA, width),
      secondLine: padBinary(binaryB, width),
      operator: '+',
      result: resultBinary
    }
  };
}

/**
 * Calcula el complemento a 2 de un número binario
 * utilizando un ancho específico.
 *
 * @param {string} binary
 * @param {number} width
 * @returns {object}
 */
export function twosComplement(binary, width) {
  const paddedBinary = padBinary(binary, width);

  let inverted = '';

  for (const bit of paddedBinary) {
    inverted += bit === '0' ? '1' : '0';
  }

  const invertedDecimal = binaryToDecimal(inverted);
  const complementDecimal = invertedDecimal + 1;

  const resultBinary = decimalToPaddedBinary(
    complementDecimal,
    width
  );

  return {
    original: paddedBinary,
    inverted,
    plusOne: resultBinary,
    result: resultBinary
  };
}

/**
 * Realiza una resta binaria.
 *
 * Para resultados negativos utiliza complemento a 2.
 *
 * @param {string} binaryA
 * @param {string} binaryB
 * @returns {object}
 */
export function subtractBinary(binaryA, binaryB) {
  const decimalA = binaryToDecimal(binaryA);
  const decimalB = binaryToDecimal(binaryB);

  const resultDecimal = decimalA - decimalB;

  if (resultDecimal < 0) {
    const width = 6;

    const magnitudeBinary = decimalToPaddedBinary(
      Math.abs(resultDecimal),
      width
    );

    const complement = twosComplement(
      magnitudeBinary,
      width
    );

    return {
      operation: 'subtraction',
      binaryA: padBinary(binaryA, width),
      binaryB: padBinary(binaryB, width),
      resultBinary: complement.result,
      resultDecimal,
      isNegative: true,
      representation: 'two-complement',
      width,
      steps: {
        firstLine: padBinary(binaryA, width),
        secondLine: padBinary(binaryB, width),
        operator: '-',
        result: complement.result,
        magnitude: magnitudeBinary,
        inverted: complement.inverted,
        plusOne: complement.plusOne
      }
    };
  }

  const resultBinary = decimalToBinary(resultDecimal);

  const width = Math.max(
    binaryA.length,
    binaryB.length,
    resultBinary.length
  );

  return {
    operation: 'subtraction',
    binaryA: padBinary(binaryA, width),
    binaryB: padBinary(binaryB, width),
    resultBinary,
    resultDecimal,
    isNegative: false,
    representation: 'normal',
    width,
    steps: {
      firstLine: padBinary(binaryA, width),
      secondLine: padBinary(binaryB, width),
      operator: '-',
      result: resultBinary
    }
  };
}

/**
 * Realiza una multiplicación binaria.
 *
 * La multiplicación no limita el número de bits del resultado.
 *
 * @param {string} binaryA
 * @param {string} binaryB
 * @returns {object}
 */
export function multiplyBinary(binaryA, binaryB) {
  const decimalA = binaryToDecimal(binaryA);
  const decimalB = binaryToDecimal(binaryB);

  const resultDecimal = decimalA * decimalB;
  const resultBinary = decimalToBinary(resultDecimal);

  const partialProducts = [];

  const reversedMultiplier = binaryB
    .split('')
    .reverse();

  reversedMultiplier.forEach((bit, index) => {
    if (bit === '1') {
      const partial = binaryA + '0'.repeat(index);

      partialProducts.push({
        bit,
        position: index,
        value: partial
      });
    } else {
      partialProducts.push({
        bit,
        position: index,
        value: '0'
      });
    }
  });

  return {
    operation: 'multiplication',
    binaryA,
    binaryB,
    resultBinary,
    resultDecimal,
    partialProducts,
    steps: {
      firstLine: binaryA,
      secondLine: binaryB,
      operator: '×',
      result: resultBinary
    }
  };
}

/**
 * Ejecuta una operación dependiendo del operador recibido.
 *
 * @param {string} binaryA
 * @param {string} binaryB
 * @param {string} operation
 * @returns {object}
 */
export function calculateBinaryOperation(
  binaryA,
  binaryB,
  operation
) {
  switch (operation) {
    case 'addition':
      return addBinary(binaryA, binaryB);

    case 'subtraction':
      return subtractBinary(binaryA, binaryB);

    case 'multiplication':
      return multiplyBinary(binaryA, binaryB);

    default:
      throw new Error('Operación no válida.');
  }
}