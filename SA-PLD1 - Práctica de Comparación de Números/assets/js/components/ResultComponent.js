// ========================================
// COMPONENTE: RESULTADOS
// Maneja la visualización de resultados ordenados
// ========================================

import { SELECTORS, CSS_CLASSES, MESSAGES } from '../config/constants.js';
import { getElement, show, hide, clearContent, createElement } from '../utils/dom.js';

export class ResultComponent {
    constructor() {
        this.resultados = getElement(SELECTORS.resultados);
        this.mensajeIguales = getElement(SELECTORS.mensajeIguales);
        this.mayorAMenor = getElement(SELECTORS.mayorAMenor);
        this.menorAMayor = getElement(SELECTORS.menorAMayor);
        this.btnReiniciar = getElement(SELECTORS.btnReiniciar);
    }
    
    /**
     * Muestra los resultados finales
     * @param {Array<number>} ordenMayorAMenor - Números ordenados de mayor a menor
     * @param {Array<number>} ordenMenorAMayor - Números ordenados de menor a mayor
     * @param {boolean} hayIguales - Si hay números iguales
     */
    mostrar(ordenMayorAMenor, ordenMenorAMayor, hayIguales) {
        // Limpiar contenedores
        clearContent(this.mayorAMenor);
        clearContent(this.menorAMayor);
        
        // Crear tarjetas para Mayor a Menor
        ordenMayorAMenor.forEach((num, index) => {
            const tarjeta = this.crearTarjetaResultado(num, index, ordenMayorAMenor.length, false);
            this.mayorAMenor.appendChild(tarjeta);
        });

        // Crear tarjetas para Menor a Mayor
        ordenMenorAMayor.forEach((num, index) => {
            const tarjeta = this.crearTarjetaResultado(num, index, ordenMenorAMayor.length, true);  // ← true aquí
            this.menorAMayor.appendChild(tarjeta);
        });
        
        // Mostrar mensaje de números iguales si aplica
        if (hayIguales) {
            show(this.mensajeIguales);
        }
        
        // Mostrar sección de resultados
        show(this.resultados);
        
        // Mostrar botón de reiniciar
        show(this.btnReiniciar);
    }
    
    /**
     * Crea una tarjeta de resultado
     * @param {number} numero - El número a mostrar
     * @param {number} index - Índice en el array (0, 1, 2)
     * @param {number} total - Total de números
     * @param {boolean} invertir - Si true, invierte los labels (para menor a mayor)
     * @returns {HTMLElement}
     */
    crearTarjetaResultado(numero, index, total, invertir = false) {
        let etiqueta = '';
        
        // Si invertir es true, usar labels al revés
        if (invertir) {
            if (index === 0) {
                etiqueta = MESSAGES.positions.menor;
            } else if (index === 1) {
                etiqueta = MESSAGES.positions.medio;
            } else if (index === 2) {
                etiqueta = MESSAGES.positions.mayor;
            }
        } else {
            if (index === 0) {
                etiqueta = MESSAGES.positions.mayor;
            } else if (index === 1) {
                etiqueta = MESSAGES.positions.medio;
            } else if (index === 2) {
                etiqueta = MESSAGES.positions.menor;
            }
        }
        
        const tarjeta = createElement('div', [CSS_CLASSES.tarjetaResultado, CSS_CLASSES.slideIn], `
            <span class="resultado-label">${etiqueta}</span>
            <span class="resultado-numero">${numero}</span>
        `);
        
        // Añadir delay de animación
        tarjeta.style.animationDelay = `${index * 0.1}s`;
        
        return tarjeta;
    }
    
    /**
     * Reinicia los resultados
     */
    reiniciar() {
        clearContent(this.mayorAMenor);
        clearContent(this.menorAMayor);
        hide(this.resultados);
        hide(this.mensajeIguales);
        hide(this.btnReiniciar);
    }
}