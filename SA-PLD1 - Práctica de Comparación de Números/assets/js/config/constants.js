// ========================================
// CONSTANTES DE CONFIGURACIÓN
// ========================================

export const CONFIG = {
    MAX_NUMBERS: 3,
    MIN_NUMBERS: 0,
};

// ========================================
// SELECTORES DEL DOM
// ========================================

export const SELECTORS = {
    // Formulario
    form: '#numeroForm',
    input: '#numeroInput',
    numeroCount: '#numeroCount',
    btnSubmit: '.btn-primary',
    
    // Progreso
    progressFill: '#progressFill',
    progressText: '#progressText',
    
    // Botones
    btnReiniciar: '#btnReiniciar',
    
    // Secciones
    numerosIngresados: '#numerosIngresados',
    tarjetasContainer: '#tarjetasContainer',
    mensajeIguales: '#mensajeIguales',
    resultados: '#resultados',
    
    // Resultados
    mayorAMenor: '#mayorAMenor',
    menorAMayor: '#menorAMayor',
};

// ========================================
// MENSAJES
// ========================================

export const MESSAGES = {
    validation: {
        empty: '❌ Por favor ingresa un número',
        invalid: '❌ Por favor ingresa un número válido (ejemplo: 4 o 2.5)',
    },
    
    labels: {
        first: 'El primer número es',
        second: 'El segundo número es',
        third: 'El tercer número es',
    },
    
    positions: {
        mayor: 'Mayor',
        medio: 'Medio',
        menor: 'Menor',
    },
    
    equal: {
        all: '⚠️ Los tres números son iguales',
        some: '⚠️ Hay números iguales en el conjunto',
        warning: '⚠️ ¡Tienes números iguales!',
    },
    
    console: {
        title: '🔢 Ordenador de Números - Lógica de Programación',
        start: 'Ingresa 3 números para comenzar...',
        separator: '=== RESULTADOS ===',
        mayorAMenor: 'Mayor a Menor:',
        menorAMayor: 'Menor a Mayor:',
    },
};

// ========================================
// CLASES CSS
// ========================================

export const CSS_CLASSES = {
    tarjetaNumero: 'tarjeta-numero',
    tarjetaResultado: 'tarjeta-resultado',
    fadeIn: 'fade-in',
    slideIn: 'slide-in',
};

// ========================================
// REGEX
// ========================================

export const REGEX = {
    number: /^-?\d+\.?\d*$/,
};