// ========================================
// VARIABLES GLOBALES
// ========================================
let numeros = []; // Array para almacenar los 3 números
let contador = 0; // Contador de números ingresados

// ========================================
// ELEMENTOS DEL DOM
// ========================================
const form = document.getElementById('numeroForm');
const input = document.getElementById('numeroInput');
const numeroCount = document.getElementById('numeroCount');
const progressFill = document.getElementById('progressFill');
const progressText = document.getElementById('progressText');
const btnReiniciar = document.getElementById('btnReiniciar');
const tarjetasContainer = document.getElementById('tarjetasContainer');
const numerosIngresados = document.getElementById('numerosIngresados');
const mensajeIguales = document.getElementById('mensajeIguales');
const resultados = document.getElementById('resultados');
const mayorAMenor = document.getElementById('mayorAMenor');
const menorAMayor = document.getElementById('menorAMayor');

// ========================================
// FUNCIÓN: VALIDAR NÚMERO
// ========================================
function validarNumero(valor) {
    // Regex para validar números (enteros y decimales, positivos y negativos)
    const regex = /^-?\d+\.?\d*$/;
    
    if (valor.trim() === '') {
        alert('❌ Por favor ingresa un número');
        return false;
    }
    
    if (!regex.test(valor)) {
        alert('❌ Por favor ingresa un número válido (ejemplo: 4 o 2.5)');
        return false;
    }
    
    return true;
}

// ========================================
// FUNCIÓN: AGREGAR NÚMERO
// ========================================
function agregarNumero(e) {
    e.preventDefault();
    
    const valor = input.value;
    
    // Validar
    if (!validarNumero(valor)) {
        return;
    }
    
    // Convertir a número
    const numero = parseFloat(valor);
    
    // Agregar al array
    numeros.push(numero);
    contador++;
    
    // Actualizar progreso
    actualizarProgreso();
    
    // Crear tarjeta del número ingresado
    crearTarjetaNumero(numero, contador);
    
    // Limpiar input
    input.value = '';
    
    // Si ya tenemos 3 números, mostrar resultados
    if (contador === 3) {
        mostrarResultados();
        input.disabled = true;
        document.querySelector('.btn-primary').disabled = true;
    } else {
        // Actualizar el label para el siguiente número
        numeroCount.textContent = contador + 1;
        input.focus();
    }
}

// ========================================
// FUNCIÓN: ACTUALIZAR PROGRESO
// ========================================
function actualizarProgreso() {
    const porcentaje = (contador / 3) * 100;
    progressFill.style.width = porcentaje + '%';
    progressText.textContent = `${contador}/3`;
}

// ========================================
// FUNCIÓN: CREAR TARJETA DE NÚMERO
// ========================================
function crearTarjetaNumero(numero, posicion) {
    // Mostrar la sección si está oculta
    numerosIngresados.style.display = 'block';
    
    const tarjeta = document.createElement('div');
    tarjeta.classList.add('tarjeta-numero');
    tarjeta.classList.add('fade-in'); // Animación
    
    let etiqueta = '';
    
    if (contador === 1) {
        etiqueta = 'Primer número';
    } else if (contador === 2) {
        etiqueta = 'Segundo número';
        // Actualizar tarjetas con mayor/menor
        actualizarComparacion();
    } else if (contador === 3) {
        etiqueta = 'Tercer número';
    }
    
    tarjeta.innerHTML = `
        <span class="tarjeta-label">${etiqueta}</span>
        <span class="tarjeta-numero-valor">${numero}</span>
    `;
    
    tarjetasContainer.appendChild(tarjeta);
}

// ========================================
// FUNCIÓN: ACTUALIZAR COMPARACIÓN (2 números)
// ========================================
function actualizarComparacion() {
    const tarjetas = tarjetasContainer.querySelectorAll('.tarjeta-numero');
    
    if (numeros.length === 2) {
        const num1 = numeros[0];
        const num2 = numeros[1];
        
        if (num1 > num2) {
            tarjetas[0].innerHTML = `
                <span class="tarjeta-label">Mayor</span>
                <span class="tarjeta-numero-valor">${num1}</span>
            `;
            tarjetas[1].innerHTML = `
                <span class="tarjeta-label">Menor</span>
                <span class="tarjeta-numero-valor">${num2}</span>
            `;
        } else if (num2 > num1) {
            tarjetas[0].innerHTML = `
                <span class="tarjeta-label">Menor</span>
                <span class="tarjeta-numero-valor">${num1}</span>
            `;
            tarjetas[1].innerHTML = `
                <span class="tarjeta-label">Mayor</span>
                <span class="tarjeta-numero-valor">${num2}</span>
            `;
        } else {
            // Son iguales
            tarjetas[0].innerHTML = `
                <span class="tarjeta-label">Números iguales</span>
                <span class="tarjeta-numero-valor">${num1}</span>
            `;
            tarjetas[1].innerHTML = `
                <span class="tarjeta-label">Números iguales</span>
                <span class="tarjeta-numero-valor">${num2}</span>
            `;
        }
    }
}

// ========================================
// FUNCIÓN: MOSTRAR RESULTADOS FINALES
// ========================================
function mostrarResultados() {
    // Verificar si hay números iguales
    verificarNumerosIguales();
    
    // Ordenar de mayor a menor
    const ordenMayorAMenor = [...numeros].sort((a, b) => b - a);
    
    // Ordenar de menor a mayor
    const ordenMenorAMayor = [...numeros].sort((a, b) => a - b);
    
    // Limpiar contenedores
    mayorAMenor.innerHTML = '';
    menorAMayor.innerHTML = '';
    
    // Crear tarjetas para Mayor a Menor
    ordenMayorAMenor.forEach((num, index) => {
        const tarjeta = crearTarjetaResultado(num, index, ordenMayorAMenor.length);
        mayorAMenor.appendChild(tarjeta);
    });
    
    // Crear tarjetas para Menor a Mayor
    ordenMenorAMayor.forEach((num, index) => {
        const tarjeta = crearTarjetaResultado(num, index, ordenMenorAMayor.length);
        menorAMayor.appendChild(tarjeta);
    });
    
    // Mostrar sección de resultados
    resultados.style.display = 'block';
    
    // Mostrar botón de reiniciar
    btnReiniciar.style.display = 'block';
    
    // Imprimir en consola (requisito de la tarea)
    console.log('=== RESULTADOS ===');
    console.log('Mayor a Menor:', ordenMayorAMenor.join(', '));
    console.log('Menor a Mayor:', ordenMenorAMayor.join(', '));
}

// ========================================
// FUNCIÓN: CREAR TARJETA DE RESULTADO
// ========================================
function crearTarjetaResultado(numero, index, total) {
    const tarjeta = document.createElement('div');
    tarjeta.classList.add('tarjeta-resultado');
    tarjeta.classList.add('slide-in'); // Animación
    tarjeta.style.animationDelay = `${index * 0.1}s`;
    
    let etiqueta = '';
    
    if (index === 0) {
        etiqueta = total === 3 ? 'Mayor' : 'Primero';
    } else if (index === 1) {
        etiqueta = total === 3 ? 'Medio' : 'Segundo';
    } else if (index === 2) {
        etiqueta = 'Menor';
    }
    
    tarjeta.innerHTML = `
        <span class="resultado-label">${etiqueta}</span>
        <span class="resultado-numero">${numero}</span>
    `;
    
    return tarjeta;
}

// ========================================
// FUNCIÓN: VERIFICAR NÚMEROS IGUALES
// ========================================
function verificarNumerosIguales() {
    const num1 = numeros[0];
    const num2 = numeros[1];
    const num3 = numeros[2];
    
    // Verificar si hay al menos dos números iguales
    if (num1 === num2 || num2 === num3 || num1 === num3) {
        mensajeIguales.style.display = 'block';
        
        // También imprimir en consola
        if (num1 === num2 && num2 === num3) {
            console.log('⚠️ Los tres números son iguales');
        } else {
            console.log('⚠️ Hay números iguales en el conjunto');
        }
    }
}

// ========================================
// FUNCIÓN: REINICIAR
// ========================================
function reiniciar() {
    // Reiniciar variables
    numeros = [];
    contador = 0;
    
    // Limpiar DOM
    tarjetasContainer.innerHTML = '';
    mayorAMenor.innerHTML = '';
    menorAMayor.innerHTML = '';
    
    // Ocultar secciones
    numerosIngresados.style.display = 'none';
    mensajeIguales.style.display = 'none';
    resultados.style.display = 'none';
    btnReiniciar.style.display = 'none';
    
    // Resetear progreso
    progressFill.style.width = '0%';
    progressText.textContent = '0/3';
    
    // Resetear label
    numeroCount.textContent = '1';
    
    // Habilitar input y botón
    input.disabled = false;
    input.value = '';
    document.querySelector('.btn-primary').disabled = false;
    
    // Focus en el input
    input.focus();
    
    console.clear();
}

// ========================================
// EVENT LISTENERS
// ========================================
form.addEventListener('submit', agregarNumero);
btnReiniciar.addEventListener('click', reiniciar);

// ========================================
// MENSAJE INICIAL EN CONSOLA
// ========================================
console.log('🔢 Ordenador de Números - Lógica de Programación');
console.log('Ingresa 3 números para comenzar...');