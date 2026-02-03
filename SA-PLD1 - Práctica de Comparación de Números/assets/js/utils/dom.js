// ========================================
// MÓDULO DE UTILIDADES DOM
// ========================================

/**
 * Crea un elemento HTML con clases y contenido
 * @param {string} tag - Nombre del tag HTML
 * @param {Array<string>} classes - Array de clases CSS
 * @param {string} innerHTML - Contenido HTML interno
 * @returns {HTMLElement}
 */
export function createElement(tag, classes = [], innerHTML = '') {
    const element = document.createElement(tag);
    
    if (classes.length > 0) {
        element.classList.add(...classes);
    }
    
    if (innerHTML) {
        element.innerHTML = innerHTML;
    }
    
    return element;
}

/**
 * Muestra un elemento
 * @param {HTMLElement} element - Elemento a mostrar
 */
export function show(element) {
    if (element) {
        element.style.display = 'block';
    }
}

/**
 * Oculta un elemento
 * @param {HTMLElement} element - Elemento a ocultar
 */
export function hide(element) {
    if (element) {
        element.style.display = 'none';
    }
}

/**
 * Limpia el contenido de un elemento
 * @param {HTMLElement} element - Elemento a limpiar
 */
export function clearContent(element) {
    if (element) {
        element.innerHTML = '';
    }
}

/**
 * Añade una clase a un elemento
 * @param {HTMLElement} element - Elemento
 * @param {string} className - Clase a añadir
 */
export function addClass(element, className) {
    if (element) {
        element.classList.add(className);
    }
}

/**
 * Remueve una clase de un elemento
 * @param {HTMLElement} element - Elemento
 * @param {string} className - Clase a remover
 */
export function removeClass(element, className) {
    if (element) {
        element.classList.remove(className);
    }
}

/**
 * Obtiene un elemento del DOM
 * @param {string} selector - Selector CSS
 * @returns {HTMLElement|null}
 */
export function getElement(selector) {
    return document.querySelector(selector);
}

/**
 * Obtiene todos los elementos que coinciden con el selector
 * @param {string} selector - Selector CSS
 * @returns {NodeList}
 */
export function getAllElements(selector) {
    return document.querySelectorAll(selector);
}