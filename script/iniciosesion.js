// Variables globales
let rhIP = null;

const STORAGE_KEY = 'rh_server_ip';

function loadStoredIp() {
    // return '192.168.1.100'; // Descomentar para simular IP guardada
    return localStorage.getItem(STORAGE_KEY);
}

function saveIpToStorage(ip) {
    localStorage.setItem(STORAGE_KEY, ip);
    console.log(`[PERSISTENCIA] IP de RH guardada: ${ip}`);
}

// =================================================================
//  FUNCIONES MODAL DE CLAVE 
// =================================================================

function abrirModalRegistro() {
    console.log('Abriendo Modal de Registro...');
  
    const modal = document.getElementById('modalRegistro'); 
    if (modal) {
        // El CSS usa la clase 'is-open' para mostrar el modal (display: flex)
        modal.classList.add('is-open'); 
        modal.setAttribute('aria-hidden', 'false');
    }
}

function cerrarModalRegistro() {
    console.log('Cerrando Modal de Registro...');
    const modal = document.getElementById('modalRegistro');
    if (modal) {
        modal.classList.remove('is-open');
        modal.setAttribute('aria-hidden', 'true');
    }
        // Limpiar mensajes al cerrar
        const mensaje = document.getElementById("mensajeClave");
        if (mensaje) {
            mensaje.style.display = "none";
            mensaje.textContent = "";
        }
    }



// =================================================================
// FUNCIONES MODAL DE CLAVE 
// =================================================================

const CLAVE_ESPECIAL = "clave123"; // Clave temporal

function abrirModalClave() {
    console.log('Función abrirModalClave ejecutada');
    const modal = document.getElementById("modalClave");
    if (modal) {
        modal.style.display = "flex";
        const claveInput = document.getElementById("claveInput");
        if (claveInput) claveInput.focus();

        // Limpiar mensajes y valor al abrir
        const mensaje = document.getElementById("mensajeClave");
        if (mensaje) {
            mensaje.style.display = "none";
            mensaje.textContent = "";
        }
        console.log('Modal de clave mostrado');
    } else {
        console.error('No se encontró el elemento modalClave');
    }
}

function cerrarModalClave() {
    console.log('Cerrando modal de clave');
    const modal = document.getElementById("modalClave");
    if (modal) {
        modal.style.display = "none";
        const claveInput = document.getElementById("claveInput");
        if (claveInput) claveInput.value = "";

        // Limpiar mensajes al cerrar
        const mensaje = document.getElementById("mensajeClave");
        if (mensaje) {
            mensaje.style.display = "none";
            mensaje.textContent = "";
        }
    }
}

function confirmarClave() {
    const clave = document.getElementById("claveInput").value.trim();
    const mensaje = document.getElementById("mensajeClave");

    if (clave === "") {
        mensaje.textContent = "⚠️ Por favor, introduce una clave.";
        mensaje.style.color = "orange";
        mensaje.style.display = "block";
        return;
    }

    if (clave === CLAVE_ESPECIAL) {
        mensaje.textContent = "Clave verificada correctamente. Abriendo registro...";
        mensaje.style.color = "green";
        mensaje.style.display = "block";

        setTimeout(() => {
            // Ocultar el Modal de Clave
            cerrarModalClave(); 
            
            // Abre el modal de registro
            abrirModalRegistro(); 
        }, 1000); // Espera 1 segundo para mostrar el mensaje de éxito
    } else {
        mensaje.textContent = "Clave incorrecta. Intenta nuevamente.";
        mensaje.style.color = "red";
        mensaje.style.display = "block";
        document.getElementById("claveInput").value = ""; 
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
    console.log('DOM cargado'); 
    
    // Verificacion si el modal de clave existe
    const modalClave = document.getElementById('modalClave');
    console.log('Modal clave encontrado:', modalClave); 
    
    // Event listener al logo de tlahuapan
    const logoButton = document.querySelector('.logo-button');
    if (logoButton) {
        logoButton.addEventListener('click', function() {
            console.log('Logo clickeado'); 
            abrirModalClave();
        });
        console.log('Event listener agregado al logo'); 
    } else {
        console.error('No se encontró el elemento logo-button');
    }
    // Verificar IP almacenada este es cuando se almacenan las ip para que despues pueda acceder
    /*const storedIp = loadStoredIp();
    if (storedIp) {
        rhIP = storedIp;
        console.log('IP cargada:', storedIp);
    } else {
        // Mostrar modal de IP si no hay IP guardada
        const modalIP = document.getElementById('modalIP');
        if (modalIP) {
            modalIP.style.display = 'flex';
        }
    }*/
   // (IP desactivada temporalmente)
console.log('Verificación de IP omitida (función no usada por ahora).');

   
    const loginForm = document.getElementById('loginForm');
    if (loginForm) {
        loginForm.addEventListener('submit', handleSubmit);
    }
});

// Cerrar modales 
document.addEventListener('click', function(e) {
    if (e.target.classList.contains('modal-overlay')) {
        if (e.target.id === 'modalClave') {
            cerrarModalClave();
        }
    }
});



document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM cargado'); 
    
    // Lógica de modalClave, logoButton, IP, loginForm
    
    /* ========================================================= */
    /*MANEJO DEL ENVÍO DEL FORMULARIO DE REGISTRO */
    /* ========================================================= */
    
 
    const formRegistro = document.getElementById('form-insertar-usuario');

    if (formRegistro) {
        formRegistro.addEventListener('submit', (event) => {
        
            event.preventDefault(); 
            
            console.log('Datos de registro enviados. Redirigiendo...');

        
            cerrarModalRegistro();
           //.......................................................................................................... 
            //Redirigir al usuario a la página de Usuarios.html
            window.location.href = "../vistas/Usuarios.html"; 
        });
    }


    // Cerrar modales 
    document.addEventListener('click', function(e) {
        if (e.target.classList.contains('modal-overlay')) {
            if (e.target.id === 'modalClave') {
                cerrarModalClave();
            }
        }
    });
});



// =================================================================
// FUNCIÓN PARA INICIO DE SESIÓN (SIMULADO)
// =================================================================

function handleSubmit(e) {
    e.preventDefault();

    const usuario = document.getElementById('usuario').value.trim();
    const password = document.getElementById('password').value.trim();
    const mantenerSesion = document.getElementById('mantenerSesion').checked;

    console.log("Usuario:", usuario);
    console.log("Contraseña:", password);
    console.log("Mantener sesión:", mantenerSesion);

    // ============================
    // DATOS SIMULADOS DE USUARIOS
    // ============================
    const usuariosSimulados = [
        { usuario: 'admin', password: '1234', area: 'usuarios', destino: './vistas/Usuarios.html' },
        { usuario: 'presi', password: 'abcd', area: 'dashboard', destino: './vistas/Dashboard.html' },
        { usuario: 'oficialia', password: 'fin2025', area: 'dispersion', destino: './vistas/Dispersion.html' },
        { usuario: 'area', password: 'clave', area: 'registro', destino: './vistas/documentos.html' }
    ];

    // ============================
    // VALIDAR CREDENCIALES
    // ============================
    const usuarioEncontrado = usuariosSimulados.find(u =>
        u.usuario === usuario && u.password === password
    );

    if (!usuarioEncontrado) {
        alert("Usuario o contraseña incorrectos.");
        return;
    }

    // ============================
    // GUARDAR SESIÓN (OPCIONAL)
    // ============================
    if (mantenerSesion) {
        localStorage.setItem("usuarioActivo", JSON.stringify(usuarioEncontrado));
        console.log("Sesión guardada:", usuarioEncontrado);
    } else {
        sessionStorage.setItem("usuarioActivo", JSON.stringify(usuarioEncontrado));
    }
    // ============================
    // REDIRECCIONAR SEGÚN USUARIO
    // ============================
    console.log(`Acceso permitido. Redirigiendo a ${usuarioEncontrado.destino}`);
    window.location.href = usuarioEncontrado.destino;
}
