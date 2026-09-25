<script setup>
import ConversionDisplay from './ConversionDisplay.vue';

defineProps({
  result: {
    type: Object,
    default: null
  }
});
</script>

<template>
  <div
    v-if="result"
    class="result-panel card border-0 shadow-sm"
  >
    <div class="card-body">

      <div class="d-flex justify-content-between align-items-center mb-3">
        <h2 class="h5 mb-0">
          Resultado
        </h2>

        <span
          v-if="result.isNegative"
          class="badge text-bg-warning"
        >
          Resultado negativo
        </span>
      </div>

      <div class="result-main text-center py-3">
        <div class="result-binary">
          {{ result.resultBinary }}₂
        </div>

        <div class="result-decimal">
          {{ result.resultDecimal }}₁₀
        </div>
      </div>

      <div class="row g-3 mt-2">

        <div class="col-md-6">
          <ConversionDisplay
            title="Entrada A"
            :binary="result.binaryA"
            :decimal="result.binaryA
              ? parseInt(result.binaryA, 2)
              : 0"
          />
        </div>

        <div class="col-md-6">
          <ConversionDisplay
            title="Entrada B"
            :binary="result.binaryB"
            :decimal="result.binaryB
              ? parseInt(result.binaryB, 2)
              : 0"
          />
        </div>

      </div>

      <div
        v-if="result.isNegative"
        class="alert alert-info mt-4 mb-0"
      >
        <strong>Complemento a 2:</strong>

        El resultado negativo se representa utilizando
        6 bits en complemento a 2. Esto permite representar
        las diferencias negativas posibles entre dos números
        de entrada de máximo 5 bits.
      </div>

    </div>
  </div>
</template>