// ========================================
// COMPONENTE: FORMULARIO
// Maneja la entrada de números del usuario
// ========================================

import { SELECTORS } from '../config/constants.js';
import { validarNumero } from '../utils/validation.js';
import { getElement } from '../utils/dom.js';

export class FormComponent {
    constructor(onNumeroAgregado) {
        this.form = getElement(SELECTORS.form);
        this.input = getElement(SELECTORS.input);
        this.numeroCount = getElement(SELECTORS.numeroCount);
        this.btnSubmit = getElement(SELECTORS.btnSubmit);
        this.onNumeroAgregado = onNumeroAgregado; // Callback
        
        this.init();
    }
    
    /**
     * Inicializa el componente
     */
    init() {
        this.form.addEventListener('submit', (e) => this.handleSubmit(e));
    }
    
    /**
     * Maneja el submit del formulario
     * @param {Event} e - Evento de submit
     */
    handleSubmit(e) {
        e.preventDefault();
        
        const valor = this.input.value;
        const validacion = validarNumero(valor);
        
        if (!validacion.valid) {
            alert(validacion.message);
            return;
        }
        
        // Ejecutar callback con el número validado
        this.onNumeroAgregado(validacion.number);
    }
    
    /**
     * Limpia el input
     */
    limpiarInput() {
        this.input.value = '';
        this.input.focus();
    }
    
    /**
     * Actualiza el label del contador
     * @param {number} numero - Número a mostrar (1, 2, 3)
     */
    actualizarLabel(numero) {
        this.numeroCount.textContent = numero;
    }
    
    /**
     * Deshabilita el formulario
     */
    deshabilitar() {
        this.input.disabled = true;
        this.btnSubmit.disabled = true;
    }
    
    /**
     * Habilita el formulario
     */
    habilitar() {
        this.input.disabled = false;
        this.btnSubmit.disabled = false;
        this.limpiarInput();
    }
    
    /**
     * Reinicia el formulario
     */
    reiniciar() {
        this.habilitar();
        this.actualizarLabel(1);
    }
}