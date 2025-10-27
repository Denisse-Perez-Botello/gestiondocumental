<<<<<<< HEAD
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
=======
document.addEventListener("DOMContentLoaded", () => {
  /* ========================================================= */
  /* 1. FUNCIONALIDAD PRINCIPAL: NAVEGACIÓN LATERAL (VISTAS) */
  /* ========================================================= */

  // Selecciona todos los enlaces de navegación que tienen un target de contenido
  const contentLinks = document.querySelectorAll(
    ".sidebar .nav-link[data-target]"
  );
  const allNavItems = document.querySelectorAll(".sidebar .nav-item");
  const allContentViews = document.querySelectorAll(".content-view");

  contentLinks.forEach((link) => {
    link.addEventListener("click", (event) => {
      event.preventDefault();

      const targetId = link.getAttribute("data-target");
      const currentNavItem = link.closest(".nav-item");

      allNavItems.forEach((item) => item.classList.remove("active"));
      currentNavItem.classList.add("active");

      allContentViews.forEach((view) => view.classList.remove("active"));
      const targetView = document.getElementById(targetId);
      if (targetView) targetView.classList.add("active");
    });
  });

  /* ========================================================= */
  /* 2. FUNCIONALIDAD: TOGGLE DE SIDEBAR (COLAPSAR/EXPANDIR) */
  /* ========================================================= */
  const menuToggler = document.getElementById("menu-toggler");
  const sidebar = document.getElementById("sidebar");

  if (menuToggler && sidebar) {
    menuToggler.addEventListener("click", () => {
      sidebar.classList.toggle("collapsed");
    });
  }

  /* ========================================================= */
  /* 3. MENÚS DESPLEGABLES (NOTIFICACIONES Y ESTADO) */
  /* ========================================================= */

  // 3.1 Notificaciones
  const notificationContainer = document.querySelector(
    ".notification-dropdown-container"
  );
  const notificationMenu = document.querySelector(".notification-menu");

  if (notificationContainer && notificationMenu) {
    notificationContainer.addEventListener("click", (event) => {
      event.stopPropagation();
      notificationMenu.classList.toggle("visible");
    });
    document.body.addEventListener("click", () => {
      notificationMenu.classList.remove("visible");
    });
  }

  // 3.2 Menús de estado en Tabla
  const dropdownActions = document.querySelectorAll(".dropdown-action");

  function closeAllStatusMenus(currentOpenMenu = null) {
    document.querySelectorAll(".dropdown-content").forEach((menu) => {
      if (menu !== currentOpenMenu) menu.style.display = "none";
    });
  }

  dropdownActions.forEach((actionContainer) => {
    const toggleButton = actionContainer.querySelector(
      ".dropdown-toggle-status"
    );
    const dropdownContent = actionContainer.querySelector(".dropdown-content");

    if (toggleButton && dropdownContent) {
      toggleButton.addEventListener("click", (event) => {
        event.stopPropagation();
        closeAllStatusMenus(dropdownContent);
        dropdownContent.style.display =
          dropdownContent.style.display === "block" ? "none" : "block";
      });

      // Lógica para botones de Activar/Desactivar (simulación)
      dropdownContent.querySelectorAll("button").forEach((button) => {
        button.addEventListener("click", () => {
          console.log("Acción realizada:", button.textContent.trim());
          dropdownContent.style.display = "none";
        });
      });
    }
  });

  // Cierra menús de estado al hacer clic en el cuerpo
  document.body.addEventListener("click", closeAllStatusMenus);

  // Modals
  const openers = document.querySelectorAll("[data-modal-open]");
  const closers = document.querySelectorAll("[data-modal-close]");
  openers.forEach((op) =>
    op.addEventListener("click", () => {
      const modal = document.getElementById(op.getAttribute("data-modal-open"));
      modal?.classList.add("show");
      modal?.setAttribute("aria-hidden", "false");
    })
  );
  closers.forEach((cl) =>
    cl.addEventListener("click", () => {
      const modal = cl.closest(".modal");
      modal?.classList.remove("show");
      modal?.setAttribute("aria-hidden", "true");
    })
  );
  document.addEventListener("click", (e) => {
    if (e.target instanceof Element && e.target.classList.contains("modal")) {
      e.target.classList.remove("show");
      e.target.setAttribute("aria-hidden", "true");
    }
  });
});

//PRUEBA DE SCRIPT PARA VISUALIZAR DOCUMENTOS
document.addEventListener("DOMContentLoaded", () => {
  // Asignar evento a todos los botones "Ver"
  const botonesVer = document.querySelectorAll(
    'button[data-modal-open="modalVer"]'
  );
  botonesVer.forEach((boton, index) => {
    boton.addEventListener("click", () => {
      const titulo = boton
        .closest("tr")
        .querySelector("td:nth-child(2)")
        .textContent.trim();
      const iframe = document.getElementById("vistaDocumento");
      const tituloElemento = document.getElementById("tituloDocumento");
      tituloElemento.textContent = titulo;

      // Asigna la ruta del documento según su título
      if (titulo === "Acta constitutiva") {
        iframe.src = "../documentos/Reticula ISC.pdf";
      } else if (titulo === "Reporte 2024") {
        iframe.src = "../documentos/Reticula ISC.pdf";
      } else {
        iframe.src = "";
      }
    });
  });
});
>>>>>>> 7e75d8ff9beb982d6ac8c69523556195ee99fdf8
