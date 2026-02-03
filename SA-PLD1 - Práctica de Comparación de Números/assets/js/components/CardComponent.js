// ========================================
// COMPONENTE: TARJETAS
// Maneja la creación y actualización de tarjetas de números
// ========================================

import { SELECTORS, CSS_CLASSES } from '../config/constants.js';
import { getElement, show, hide, clearContent, createElement } from '../utils/dom.js';

export class CardComponent {
    constructor() {
        this.numerosIngresados = getElement(SELECTORS.numerosIngresados);
        this.tarjetasContainer = getElement(SELECTORS.tarjetasContainer);
    }
    
    /**
     * Crea una tarjeta para un número ingresado
     * @param {number} numero - El número a mostrar
     * @param {string} label - El label (ej: "El primer número es")
     */
    crearTarjeta(numero, label) {
        // Mostrar la sección si está oculta
        show(this.numerosIngresados);
        
        const tarjeta = createElement('div', [CSS_CLASSES.tarjetaNumero, CSS_CLASSES.fadeIn], `
            <span class="tarjeta-label">${label}:</span>
            <span class="tarjeta-numero-valor">${numero}</span>
        `);
        
        this.tarjetasContainer.appendChild(tarjeta);
    }
    
    /**
     * Actualiza todas las tarjetas con los números y labels correctos
     * @param {Array<number>} numeros - Array de números ingresados
     * @param {Array<string>} labels - Array de labels correspondientes
     */
    actualizarTarjetas(numeros, labels) {
        // Limpiar todas las tarjetas
        clearContent(this.tarjetasContainer);
        
        // Crear una tarjeta por cada número
        numeros.forEach((numero, index) => {
            this.crearTarjeta(numero, labels[index]);
        });
    }
    
    /**
     * Reinicia las tarjetas
     */
    reiniciar() {
        clearContent(this.tarjetasContainer);
        hide(this.numerosIngresados);
    }
}