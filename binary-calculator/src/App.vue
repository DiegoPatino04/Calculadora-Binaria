<script setup>
import BinaryInput from './components/BinaryInput.vue';
import OperationSelector from './components/OperationSelector.vue';
import OperationSteps from './components/OperationSteps.vue';

import { useBinaryCalculator } from './composables/useBinaryCalculator';

const {
  binaryA,
  binaryB,
  operation,
  result,
  error,
  decimalA,
  decimalB,
  canCalculate,
  updateBinaryA,
  updateBinaryB,
  setOperation,
  calculate,
  clearCalculator
} = useBinaryCalculator();
</script>

<template>
  <div class="container py-5">
    <h1 class="mb-4">
      Calculadora Binaria
    </h1>

    <div class="row g-3 mb-3">
      <div class="col-md-6">
        <BinaryInput
          label="Número A"
          :model-value="binaryA"
          :decimal-value="decimalA"
          @update:model-value="updateBinaryA"
        />
      </div>

      <div class="col-md-6">
        <BinaryInput
          label="Número B"
          :model-value="binaryB"
          :decimal-value="decimalB"
          @update:model-value="updateBinaryB"
        />
      </div>
    </div>

    <div class="mb-3">
      <OperationSelector
        :model-value="operation"
        @update:model-value="setOperation"
      />
    </div>

    <div class="d-flex gap-2 mb-4">
      <button
        type="button"
        class="btn btn-primary"
        :disabled="!canCalculate"
        @click="calculate"
      >
        Calcular
      </button>

      <button
        type="button"
        class="btn btn-outline-secondary"
        @click="clearCalculator"
      >
        Limpiar
      </button>
    </div>

    <div
      v-if="error"
      class="alert alert-danger"
    >
      {{ error }}
    </div>

    <OperationSteps :result="result" />
  </div>
</template>