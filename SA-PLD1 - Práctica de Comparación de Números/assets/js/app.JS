// ========================================
// APP PRINCIPAL
// Orquesta todos los componentes y maneja el flujo
// ========================================

import { SELECTORS, MESSAGES } from './config/constants.js';
import { NumberManager } from './models/NumberManager.js';
import { FormComponent } from './components/FormComponent.js';
import { ProgressComponent } from './components/ProgressComponent.js';
import { CardComponent } from './components/CardComponent.js';
import { ResultComponent } from './components/ResultComponent.js';
import { getElement } from './utils/dom.js';

class App {
    constructor() {
        // Modelo
        this.numberManager = new NumberManager();
        
        // Componentes
        this.formComponent = new FormComponent((numero) => this.handleNumeroAgregado(numero));
        this.progressComponent = new ProgressComponent();
        this.cardComponent = new CardComponent();
        this.resultComponent = new ResultComponent();
        
        // Botón de reiniciar
        this.btnReiniciar = getElement(SELECTORS.btnReiniciar);
        
        this.init();
    }
    
    /**
     * Inicializa la aplicación
     */
    init() {
        // Event listener para reiniciar
        this.btnReiniciar.addEventListener('click', () => this.reiniciar());
        
        // Mensaje inicial en consola
        console.log(MESSAGES.console.title);
        console.log(MESSAGES.console.start);
    }
    
    /**
     * Maneja cuando se agrega un número
     * @param {number} numero - Número validado a agregar
     */
    handleNumeroAgregado(numero) {
        // Agregar el número al manager
        const agregado = this.numberManager.agregarNumero(numero);
        
        if (!agregado) {
            return; // No debería pasar, pero por si acaso
        }
        
        // Obtener datos actuales
        const contador = this.numberManager.getContador();
        const numeros = this.numberManager.getNumeros();
        
        // Actualizar progreso
        this.progressComponent.actualizar(contador);
        
        // Limpiar el input
        this.formComponent.limpiarInput();
        
        // Obtener labels para cada número
        const labels = numeros.map((_, index) => 
            this.numberManager.getLabelPorPosicion(index + 1)
        );
        
        // Actualizar las tarjetas con TODOS los números ingresados hasta ahora
        this.cardComponent.actualizarTarjetas(numeros, labels);
        
        // Verificar si ya tenemos los 3 números
        if (this.numberManager.estaCompleto()) {
            this.mostrarResultadosFinales();
        } else {
            // Actualizar el label para el siguiente número
            this.formComponent.actualizarLabel(contador + 1);
        }
    }
    
    /**
     * Muestra los resultados finales cuando se completan los 3 números
     */
    mostrarResultadosFinales() {
        // Deshabilitar formulario
        this.formComponent.deshabilitar();
        
        // Obtener datos ordenados
        const ordenMayorAMenor = this.numberManager.ordenarMayorAMenor();
        const ordenMenorAMayor = this.numberManager.ordenarMenorAMayor();
        const { hayIguales } = this.numberManager.verificarIguales();
        
        // Mostrar resultados
        this.resultComponent.mostrar(ordenMayorAMenor, ordenMenorAMayor, hayIguales);
        
        // Imprimir en consola
        this.numberManager.imprimirEnConsola();
    }
    
    /**
     * Reinicia toda la aplicación
     */
    reiniciar() {
        // Reiniciar modelo
        this.numberManager.reiniciar();
        
        // Reiniciar componentes
        this.formComponent.reiniciar();
        this.progressComponent.reiniciar();
        this.cardComponent.reiniciar();
        this.resultComponent.reiniciar();
        
        // Limpiar consola
        console.clear();
        console.log(MESSAGES.console.title);
        console.log(MESSAGES.console.start);
    }
}

// ========================================
// INICIALIZAR LA APLICACIÓN
// ========================================
document.addEventListener('DOMContentLoaded', () => {
    new App();
});