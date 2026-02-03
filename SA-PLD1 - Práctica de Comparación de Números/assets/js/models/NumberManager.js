// ========================================
// MODELO: NUMBER MANAGER
// Maneja toda la lógica de negocio relacionada con los números
// ========================================

import { CONFIG, MESSAGES } from '../config/constants.js';
import { verificarNumerosIguales } from '../utils/validation.js';

export class NumberManager {
    constructor() {
        this.numeros = [];
        this.contador = 0;
    }
    
    /**
     * Agrega un número al array
     * @param {number} numero - Número a agregar
     * @returns {boolean} - true si se agregó, false si ya hay 3
     */
    agregarNumero(numero) {
        if (this.contador >= CONFIG.MAX_NUMBERS) {
            return false;
        }
        
        this.numeros.push(numero);
        this.contador++;
        return true;
    }
    
    /**
     * Obtiene todos los números
     * @returns {Array<number>}
     */
    getNumeros() {
        return [...this.numeros];
    }
    
    /**
     * Obtiene el contador actual
     * @returns {number}
     */
    getContador() {
        return this.contador;
    }
    
    /**
     * Verifica si ya se completaron los 3 números
     * @returns {boolean}
     */
    estaCompleto() {
        return this.contador === CONFIG.MAX_NUMBERS;
    }
    
    /**
     * Ordena los números de mayor a menor
     * @returns {Array<number>}
     */
    ordenarMayorAMenor() {
        return [...this.numeros].sort((a, b) => b - a);
    }
    
    /**
     * Ordena los números de menor a mayor
     * @returns {Array<number>}
     */
    ordenarMenorAMayor() {
        return [...this.numeros].sort((a, b) => a - b);
    }
    
    /**
     * Verifica si hay números iguales
     * @returns {Object} - { hayIguales: boolean, todosIguales: boolean, mensaje: string }
     */
    verificarIguales() {
        const { hayIguales, todosIguales } = verificarNumerosIguales(this.numeros);
        
        let mensaje = '';
        
        if (todosIguales) {
            mensaje = MESSAGES.equal.all;
        } else if (hayIguales) {
            mensaje = MESSAGES.equal.some;
        }
        
        return { hayIguales, todosIguales, mensaje };
    }
    
    /**
     * Obtiene el mensaje de label según la posición
     * @param {number} posicion - Posición (1, 2, 3)
     * @returns {string}
     */
    getLabelPorPosicion(posicion) {
        switch(posicion) {
            case 1:
                return MESSAGES.labels.first;
            case 2:
                return MESSAGES.labels.second;
            case 3:
                return MESSAGES.labels.third;
            default:
                return '';
        }
    }
    
    /**
     * Reinicia el manager
     */
    reiniciar() {
        this.numeros = [];
        this.contador = 0;
    }
    
    /**
     * Imprime los resultados en consola
     */
    imprimirEnConsola() {
        console.log(MESSAGES.console.separator);
        console.log(`${MESSAGES.console.mayorAMenor} ${this.ordenarMayorAMenor().join(', ')}`);
        console.log(`${MESSAGES.console.menorAMayor} ${this.ordenarMenorAMayor().join(', ')}`);
        
        const { hayIguales, mensaje } = this.verificarIguales();
        if (hayIguales) {
            console.log(mensaje);
        }
    }
}