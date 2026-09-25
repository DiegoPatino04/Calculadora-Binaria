<script setup>
import { computed } from 'vue';

import {
  validateBinaryInput
} from '../utils/binaryValidation';

const props = defineProps({
  modelValue: {
    type: String,
    default: ''
  },

  label: {
    type: String,
    default: 'Número'
  },

  decimalValue: {
    type: [Number, null],
    default: null
  }
});

const emit = defineEmits([
  'update:modelValue'
]);

const validation = computed(() => {
  if (props.modelValue === '') {
    return {
      valid: false,
      message: ''
    };
  }

  return validateBinaryInput(props.modelValue);
});

function handleInput(event) {
  const value = event.target.value;

  const sanitized = value
    .replace(/[^01]/g, '')
    .slice(0, 5);

  // Fuerza que el input muestre siempre el valor limpio,
  // aunque Vue no vuelva a renderizar por sí solo.
  event.target.value = sanitized;

  emit('update:modelValue', sanitized);
}

const inputClass = computed(() => {
  if (props.modelValue === '') {
    return '';
  }

  return validation.value.valid
    ? 'is-valid'
    : 'is-invalid';
});
</script>

<template>
  <div class="binary-input">
    <label class="form-label fw-semibold">
      {{ label }}
    </label>

    <div class="input-group">
      <input
        :value="modelValue"
        type="text"
        inputmode="numeric"
        autocomplete="off"
        maxlength="5"
        class="form-control form-control-lg binary-field"
        :class="inputClass"
        placeholder="Ej. 10101"
        @input="handleInput"
      />

      <span class="input-group-text">
        ₂
      </span>
    </div>

    <div
      v-if="modelValue && validation.valid"
      class="form-text text-success"
    >
      {{ modelValue }}₂ =
      {{ decimalValue }}₁₀
    </div>

    <div
      v-if="modelValue && !validation.valid"
      class="invalid-feedback d-block"
    >
      {{ validation.message }}
    </div>

    <div
      v-if="!modelValue"
      class="form-text"
    >
      Máximo 5 bits. Solo se permiten 0 y 1.
    </div>
  </div>
</template>