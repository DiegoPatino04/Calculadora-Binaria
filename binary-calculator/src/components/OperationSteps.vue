<script setup>
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
    class="operation-steps card border-0 shadow-sm"
  >
    <div class="card-body">

      <h2 class="h5 mb-4">
        Procedimiento
      </h2>

      <!-- SUMA -->
      <div v-if="result.operation === 'addition'">

        <div class="operation-display">
          <div>
            {{ result.steps.firstLine }}
          </div>

          <div>
            {{ result.steps.operator }}
            {{ result.steps.secondLine }}
          </div>

          <hr />

          <div class="fw-bold">
            {{ result.steps.result }}
          </div>
        </div>

        <div class="alert alert-light border mt-3 mb-0">
          <strong>Conversión decimal:</strong>

          {{ parseInt(result.binaryA, 2) }} +
          {{ parseInt(result.binaryB, 2) }} =
          {{ result.resultDecimal }}
        </div>

      </div>

      <!-- RESTA -->
      <div v-else-if="result.operation === 'subtraction'">

        <div class="operation-display">

          <div>
            {{ result.steps.firstLine }}
          </div>

          <div>
            {{ result.steps.operator }}
            {{ result.steps.secondLine }}
          </div>

          <hr />

          <div class="fw-bold">
            {{ result.steps.result }}
          </div>

        </div>

        <div
          v-if="!result.isNegative"
          class="alert alert-light border mt-3 mb-0"
        >
          <strong>Conversión decimal:</strong>

          {{ parseInt(result.binaryA, 2) }} -
          {{ parseInt(result.binaryB, 2) }} =
          {{ result.resultDecimal }}
        </div>

        <div
          v-if="result.isNegative"
          class="mt-4"
        >
          <h3 class="h6">
            Complemento a 2 del resultado
          </h3>

          <div class="complement-step">

            <div class="step-row">
              <span>Magnitud:</span>
              <code>{{ result.steps.magnitude }}</code>
            </div>

            <div class="step-row">
              <span>Invertir bits:</span>
              <code>{{ result.steps.inverted }}</code>
            </div>

            <div class="step-row">
              <span>Sumar 1:</span>
              <code>{{ result.steps.plusOne }}</code>
            </div>

            <div class="step-row result-step">
              <span>Complemento a 2:</span>
              <code>{{ result.resultBinary }}</code>
            </div>

          </div>

          <div class="alert alert-info mt-3 mb-0">
            <strong>Resultado decimal:</strong>

            {{ parseInt(result.binaryA, 2) }} -
            {{ parseInt(result.binaryB, 2) }} =
            {{ result.resultDecimal }}
          </div>
        </div>

      </div>

      <!-- MULTIPLICACIÓN -->
      <div v-else-if="result.operation === 'multiplication'">

        <div class="operation-display multiplication-display">

          <div class="text-end">
            {{ result.binaryA }}
          </div>

          <div class="text-end">
            {{ result.steps.operator }}
            {{ result.binaryB }}
          </div>

          <hr />

          <div
            v-for="(partial, index) in result.partialProducts"
            :key="index"
            class="partial-product text-end"
          >
            {{ partial.value }}
          </div>

          <hr />

          <div class="fw-bold text-end">
            {{ result.resultBinary }}
          </div>

        </div>

        <div class="alert alert-light border mt-3 mb-0">
          <strong>Conversión decimal:</strong>

          {{ parseInt(result.binaryA, 2) }} ×
          {{ parseInt(result.binaryB, 2) }} =
          {{ result.resultDecimal }}
        </div>

      </div>

    </div>
  </div>
</template>