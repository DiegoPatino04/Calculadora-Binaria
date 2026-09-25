<script setup>
const props = defineProps({
  modelValue: {
    type: String,
    default: 'addition'
  }
});

const emit = defineEmits([
  'update:modelValue'
]);

const operations = [
  {
    value: 'addition',
    symbol: '+',
    label: 'Suma'
  },
  {
    value: 'subtraction',
    symbol: '−',
    label: 'Resta'
  },
  {
    value: 'multiplication',
    symbol: '×',
    label: 'Multiplicación'
  }
];

function selectOperation(value) {
  emit('update:modelValue', value);
}
</script>

<template>
  <div class="operation-selector">
    <label class="form-label fw-semibold">
      Operación
    </label>

    <div class="btn-group w-100" role="group">
      <button
        v-for="item in operations"
        :key="item.value"
        type="button"
        class="btn"
        :class="
          modelValue === item.value
            ? 'btn-primary'
            : 'btn-outline-primary'
        "
        @click="selectOperation(item.value)"
      >
        <span class="operation-symbol">
          {{ item.symbol }}
        </span>

        <span class="d-none d-sm-inline">
          {{ item.label }}
        </span>
      </button>
    </div>
  </div>
</template>