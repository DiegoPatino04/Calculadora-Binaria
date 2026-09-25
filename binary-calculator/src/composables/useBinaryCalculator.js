import { computed, ref } from 'vue';

import {
  calculateBinaryOperation
} from '../services/binaryOperations';

import {
  binaryToDecimal
} from '../utils/binaryConversion';

import {
  validateBinaryInput,
  sanitizeBinaryInput
} from '../utils/binaryValidation';

export function useBinaryCalculator() {
  const binaryA = ref('');
  const binaryB = ref('');

  const operation = ref('addition');

  const result = ref(null);

  const error = ref('');

  const hasResult = computed(() => {
    return result.value !== null;
  });

  const decimalA = computed(() => {
    if (!binaryA.value) {
      return null;
    }

    return binaryToDecimal(binaryA.value);
  });

  const decimalB = computed(() => {
    if (!binaryB.value) {
      return null;
    }

    return binaryToDecimal(binaryB.value);
  });

  const inputAIsValid = computed(() => {
    return validateBinaryInput(binaryA.value).valid;
  });

  const inputBIsValid = computed(() => {
    return validateBinaryInput(binaryB.value).valid;
  });

  const canCalculate = computed(() => {
    return (
      inputAIsValid.value &&
      inputBIsValid.value &&
      operation.value !== ''
    );
  });

  function updateBinaryA(value) {
    binaryA.value = sanitizeBinaryInput(value);

    result.value = null;
    error.value = '';
  }

  function updateBinaryB(value) {
    binaryB.value = sanitizeBinaryInput(value);

    result.value = null;
    error.value = '';
  }

  function setOperation(value) {
    operation.value = value;

    result.value = null;
    error.value = '';
  }

  function calculate() {
    error.value = '';

    const validationA = validateBinaryInput(binaryA.value);
    const validationB = validateBinaryInput(binaryB.value);

    if (!validationA.valid) {
      error.value = `Número A: ${validationA.message}`;
      result.value = null;
      return;
    }

    if (!validationB.valid) {
      error.value = `Número B: ${validationB.message}`;
      result.value = null;
      return;
    }

    if (!operation.value) {
      error.value = 'Seleccione una operación.';
      result.value = null;
      return;
    }

    try {
      result.value = calculateBinaryOperation(
        binaryA.value,
        binaryB.value,
        operation.value
      );
    } catch (err) {
      error.value = err.message;
      result.value = null;
    }
  }

  function clearCalculator() {
    binaryA.value = '';
    binaryB.value = '';
    operation.value = 'addition';
    result.value = null;
    error.value = '';
  }

  return {
    binaryA,
    binaryB,
    operation,
    result,
    error,
    decimalA,
    decimalB,
    hasResult,
    inputAIsValid,
    inputBIsValid,
    canCalculate,
    updateBinaryA,
    updateBinaryB,
    setOperation,
    calculate,
    clearCalculator
  };
}