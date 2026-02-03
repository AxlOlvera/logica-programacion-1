// ========================================
// MÓDULO DE VALIDACIÓN
// ========================================

import { REGEX, MESSAGES } from '../config/constants.js';

/**
 * Valida si un valor es un número válido
 * @param {string} valor - El valor a validar
 * @returns {Object} - { valid: boolean, message: string, number: number|null }
 */
export function validarNumero(valor) {
    // Verificar si está vacío
    if (valor.trim() === '') {
        return {
            valid: false,
            message: MESSAGES.validation.empty,
            number: null,
        };
    }
    
    // Verificar si es un número válido
    if (!REGEX.number.test(valor)) {
        return {
            valid: false,
            message: MESSAGES.validation.invalid,
            number: null,
        };
    }
    
    // Convertir a número
    const numero = parseFloat(valor);
    
    return {
        valid: true,
        message: '',
        number: numero,
    };
}

/**
 * Verifica si hay números iguales en un array
 * @param {Array<number>} numeros - Array de números
 * @returns {Object} - { hayIguales: boolean, todosIguales: boolean }
 */
export function verificarNumerosIguales(numeros) {
    if (numeros.length < 2) {
        return { hayIguales: false, todosIguales: false };
    }
    
    const [num1, num2, num3] = numeros;
    
    // Verificar si todos son iguales
    const todosIguales = num1 === num2 && num2 === num3;
    
    // Verificar si hay al menos dos iguales
    const hayIguales = num1 === num2 || num2 === num3 || num1 === num3;
    
    return { hayIguales, todosIguales };
}