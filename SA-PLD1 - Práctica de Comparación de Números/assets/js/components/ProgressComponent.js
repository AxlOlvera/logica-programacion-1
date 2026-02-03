// ========================================
// COMPONENTE: PROGRESO
// Maneja la barra de progreso visual
// ========================================

import { SELECTORS, CONFIG } from '../config/constants.js';
import { getElement } from '../utils/dom.js';

export class ProgressComponent {
    constructor() {
        this.progressFill = getElement(SELECTORS.progressFill);
        this.progressText = getElement(SELECTORS.progressText);
    }
    
    /**
     * Actualiza el progreso
     * @param {number} contador - Número de elementos ingresados
     */
    actualizar(contador) {
        const porcentaje = (contador / CONFIG.MAX_NUMBERS) * 100;
        this.progressFill.style.width = `${porcentaje}%`;
        this.progressText.textContent = `${contador}/${CONFIG.MAX_NUMBERS}`;
    }
    
    /**
     * Reinicia el progreso
     */
    reiniciar() {
        this.actualizar(0);
    }
}