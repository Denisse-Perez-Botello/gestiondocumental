// Variables globales
let rhIP = null;

// Simulación de storage
const STORAGE_KEY = 'rh_server_ip';

// Funciones de persistencia
function loadStoredIp() {
    // return '192.168.1.100'; // Descomenta para simular IP guardada
    return localStorage.getItem(STORAGE_KEY);
}

function saveIpToStorage(ip) {
    localStorage.setItem(STORAGE_KEY, ip);
    console.log(`[PERSISTENCIA] IP de RH guardada: ${ip}`);
}

// Funciones del modal de clave
function abrirModalClave() {
    console.log('Función abrirModalClave ejecutada'); // Debug
    const modal = document.getElementById('modalClave');
    if (modal) {
        modal.style.display = 'flex';
        const claveInput = document.getElementById('claveInput');
        if (claveInput) {
            claveInput.focus();
        }
        console.log('Modal de clave mostrado'); // Debug
    } else {
        console.error('No se encontró el elemento modalClave');
    }
}

function cerrarModalClave() {
    console.log('Cerrando modal de clave'); // Debug
    const modal = document.getElementById('modalClave');
    if (modal) {
        modal.style.display = 'none';
        const claveInput = document.getElementById('claveInput');
        if (claveInput) {
            claveInput.value = '';
        }
    }
}

function confirmarClave() {
    const clave = document.getElementById('claveInput').value;
    if (clave.trim() !== '') {
        console.log('Clave introducida:', clave);
        alert('¡Clave especial verificada!');
        cerrarModalClave();
    } else {
        alert('Por favor, introduce una clave.');
    }
}

// Funciones del modal de IP
function guardarIP() {
    const ip = document.getElementById('ipInput').value;
    const ipRegex = /^\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}$/;
    
    if (ipRegex.test(ip)) {
        saveIpToStorage(ip);
        rhIP = ip;
        document.getElementById('modalIP').style.display = 'none';
        alert(`¡IP ${ip} guardada! Ya puedes iniciar sesión.`);
    } else {
        alert('Por favor, introduce una dirección IP válida (ej: 192.168.1.1).');
    }
}

// Función para manejar el submit del formulario
function handleSubmit(e) {
    e.preventDefault();
    const usuario = document.getElementById('usuario').value;
    const password = document.getElementById('password').value;
    const mantenerSesion = document.getElementById('mantenerSesion').checked;
    
    console.log("Usuario:", usuario);
    console.log("Contraseña:", password);
    console.log("Mantener sesión:", mantenerSesion);
}

// Inicialización cuando se carga la página
document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM cargado'); // Debug
    
    // Verificar si el modal de clave existe
    const modalClave = document.getElementById('modalClave');
    console.log('Modal clave encontrado:', modalClave); // Debug
    
    // Agregar event listener al logo
    const logoButton = document.querySelector('.logo-button');
    if (logoButton) {
        logoButton.addEventListener('click', function() {
            console.log('Logo clickeado'); // Debug
            abrirModalClave();
        });
        console.log('Event listener agregado al logo'); // Debug
    } else {
        console.error('No se encontró el elemento logo-button');
    }
    
    const storedIp = loadStoredIp();
    if (storedIp) {
        rhIP = storedIp;
        console.log('IP cargada:', storedIp);
    } else {
        // Mostrar modal de IP si no hay IP guardada
        const modalIP = document.getElementById('modalIP');
        if (modalIP) {
            modalIP.style.display = 'flex';
        }
    }

    // Event listener para el formulario
    const loginForm = document.getElementById('loginForm');
    if (loginForm) {
        loginForm.addEventListener('submit', handleSubmit);
    }
});

// Cerrar modales al hacer clic fuera
document.addEventListener('click', function(e) {
    if (e.target.classList.contains('modal-overlay')) {
        if (e.target.id === 'modalClave') {
            cerrarModalClave();
        }
    }
});