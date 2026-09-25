# Calculadora-Binaria
binary-calculator/
│
├── public/
│   └── favicon.svg
│
├── src/
│   │
│   ├── assets/
│   │   └── styles/
│   │       └── main.css
│   │
│   ├── components/
│   │   ├── BinaryInput.vue
│   │   ├── OperationSelector.vue
│   │   ├── ResultPanel.vue
│   │   ├── OperationSteps.vue
│   │   └── ConversionDisplay.vue
│   │
│   ├── composables/
│   │   └── useBinaryCalculator.js
│   │
│   ├── services/
│   │   └── binaryOperations.js
│   │
│   ├── utils/
│   │   ├── binaryValidation.js
│   │   ├── binaryConversion.js
│   │   └── formatBinary.js
│   │
│   ├── App.vue
│   ├── main.js
│   └── ...
│
├── index.html
├── package.json
├── vite.config.js
├── netlify.toml
└── README.md


# Binary Calculator

Calculadora educativa para operaciones binarias.

## Features

- Suma binaria
- Resta binaria
- Complemento a 2
- Multiplicación binaria
- Conversión binario/decimal
- Validación de entradas
- Visualización del procedimiento

## Technologies

- Vue 3
- Vite
- Bootstrap 5
- JavaScript
- Vitest