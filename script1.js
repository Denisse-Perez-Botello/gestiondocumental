// Variables globales
let rhIP = null;

// Simulación de storage
const STORAGE_KEY = "rh_server_ip";

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
  console.log("Función abrirModalClave ejecutada"); // Debug
  const modal = document.getElementById("modalClave");
  if (modal) {
    modal.style.display = "flex";
    const claveInput = document.getElementById("claveInput");
    if (claveInput) {
      claveInput.focus();
    }
    console.log("Modal de clave mostrado"); // Debug
  } else {
    console.error("No se encontró el elemento modalClave");
  }
}

function cerrarModalClave() {
  console.log("Cerrando modal de clave"); // Debug
  const modal = document.getElementById("modalClave");
  if (modal) {
    modal.style.display = "none";
    const claveInput = document.getElementById("claveInput");
    if (claveInput) {
      claveInput.value = "";
    }
  }
}

function confirmarClave() {
  const clave = document.getElementById("claveInput").value;
  if (clave.trim() !== "") {
    console.log("Clave introducida:", clave);
    alert("¡Clave especial verificada!");
    cerrarModalClave();
  } else {
    alert("Por favor, introduce una clave.");
  }
}

// Funciones del modal de IP
function guardarIP() {
  const ip = document.getElementById("ipInput").value;
  const ipRegex = /^\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}$/;

  if (ipRegex.test(ip)) {
    saveIpToStorage(ip);
    rhIP = ip;
    document.getElementById("modalIP").style.display = "none";
    alert(`¡IP ${ip} guardada! Ya puedes iniciar sesión.`);
  } else {
    alert("Por favor, introduce una dirección IP válida (ej: 192.168.1.1).");
  }
}

// Función para manejar el submit del formulario
function handleSubmit(e) {
  e.preventDefault();
  const usuario = document.getElementById("usuario").value;
  const password = document.getElementById("password").value;
  const mantenerSesion = document.getElementById("mantenerSesion").checked;

  console.log("Usuario:", usuario);
  console.log("Contraseña:", password);
  console.log("Mantener sesión:", mantenerSesion);
}

// Inicialización cuando se carga la página
document.addEventListener("DOMContentLoaded", function () {
  console.log("DOM cargado"); // Debug

  // Verificar si el modal de clave existe
  const modalClave = document.getElementById("modalClave");
  console.log("Modal clave encontrado:", modalClave); // Debug

  // Agregar event listener al logo
  const logoButton = document.querySelector(".logo-button");
  if (logoButton) {
    logoButton.addEventListener("click", function () {
      console.log("Logo clickeado"); // Debug
      abrirModalClave();
    });
    console.log("Event listener agregado al logo"); // Debug
  } else {
    console.error("No se encontró el elemento logo-button");
  }

  const storedIp = loadStoredIp();
  if (storedIp) {
    rhIP = storedIp;
    console.log("IP cargada:", storedIp);
  } else {
    // Mostrar modal de IP si no hay IP guardada
    const modalIP = document.getElementById("modalIP");
    if (modalIP) {
      modalIP.style.display = "flex";
    }
  }

  // Event listener para el formulario
  const loginForm = document.getElementById("loginForm");
  if (loginForm) {
    loginForm.addEventListener("submit", handleSubmit);
  }
});

// Cerrar modales al hacer clic fuera
document.addEventListener("click", function (e) {
  if (e.target.classList.contains("modal-overlay")) {
    if (e.target.id === "modalClave") {
      cerrarModalClave();
    }
  }
});

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

  // Modals M --------------------------------------------------------------------------------------------------------------------------------------
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

/* MODAL VER DOCUMENTOS */
document.addEventListener("DOMContentLoaded", () => {
  const botonesVer = document.querySelectorAll(
    'button[data-modal-open="modalVer"]'
  );

  botonesVer.forEach((boton) => {
    boton.addEventListener("click", () => {
      const titulo = boton
        .closest("tr")
        .querySelector("td:nth-child(2)")
        ?.textContent.trim();
      const iframe = document.getElementById("vistaDocumento");
      const tituloElemento = document.getElementById("tituloDocumento");

      if (!iframe || !tituloElemento) return;

      tituloElemento.textContent = titulo;
      const imagen = document.getElementById("vistaDocumento");

      switch (titulo) {
        case "Acta constitutiva":
          imagen.src = "imagenes/Reticula ISC.jpg";
        case "Reporte 2024":
          imagen.src = "imagenes/Reticula ISC.jpg";
          break;
        default:
          imagen.src = "";
      }
    });
  });
});

/* Organigrama*/
document.addEventListener("DOMContentLoaded", () => {
  const tabla = document.getElementById("tablaOrganigramas");
  const gestion = document.getElementById("gestion");
  const seccionOrg = document.getElementById("organigrama");
  const btnRegresar = document.getElementById("btnRegresar");
  const btnAutorizar = document.getElementById("btnConfirmarAutorizar");

  if (!tabla || !gestion || !seccionOrg) return;

  // Cambio de vistas (organigrama y gestión)
  tabla.addEventListener("click", (e) => {
    if (e.target.classList.contains("btn-editar")) {
      seccionOrg.style.display = "none";
      gestion.style.display = "block";
    }
  });

  btnRegresar?.addEventListener("click", () => {
    gestion.style.display = "none";
    seccionOrg.style.display = "block";
  });

  btnAutorizar?.addEventListener("click", () => {
    const modal = document.getElementById("modalAutorizarOrganigrama");
    if (modal) {
      modal.classList.remove("show");
      modal.setAttribute("aria-hidden", "true");
    }
  });

  tabla.addEventListener("click", (e) => {
    if (e.target.classList.contains("btn-ver")) {
      const modal = document.getElementById("modalVerOrganigrama");
      modal?.classList.add("show");
      modal?.setAttribute("aria-hidden", "false");
    }
  });
});

/* DIAGRAMA ORGANIGRAMA  */
document.addEventListener("DOMContentLoaded", () => {
  const tabla = document.getElementById("tablaOrganigramas");
  const modal = document.getElementById("modalVerOrganigrama");
  const contenedor = document.getElementById("contenedorOrganigrama");

  if (!tabla || !modal || !contenedor) return;

  const registrosSimulados = [
    { area: "Presidencia Municipal", nivel: 1, superior: null },
    { area: "H. Cabildo", nivel: 1, superior: "Presidencia Municipal" },
    {
      area: "Contraloría Municipal",
      nivel: 2,
      superior: "Presidencia Municipal",
    },
    {
      area: "Tesorería Municipal",
      nivel: 2,
      superior: "Presidencia Municipal",
    },
    {
      area: "Secretaría del Ayuntamiento",
      nivel: 2,
      superior: "Presidencia Municipal",
    },
    { area: "Secretaría Técnica", nivel: 2, superior: "Presidencia Municipal" },
    {
      area: "Dirección de Obras Públicas",
      nivel: 3,
      superior: "Secretaría Técnica",
    },
    {
      area: "Dirección de Desarrollo Urbano",
      nivel: 3,
      superior: "Secretaría Técnica",
    },
    {
      area: "Dirección de Cultura y Deporte",
      nivel: 3,
      superior: "Secretaría del Ayuntamiento",
    },
    {
      area: "Dirección de Desarrollo Social",
      nivel: 3,
      superior: "Secretaría Técnica",
    },
    {
      area: "Dirección de Protección Civil",
      nivel: 3,
      superior: "Secretaría Técnica",
    },
    {
      area: "Jefatura de Archivo y Control Documental",
      nivel: 4,
      superior: "Secretaría del Ayuntamiento",
    },
    {
      area: "Jefatura de Informática y Sistemas",
      nivel: 4,
      superior: "Secretaría Técnica",
    },
    {
      area: "Coordinación de Igualdad de Género",
      nivel: 4,
      superior: "Secretaría Técnica",
    },
  ];

  function construirArbol(registros, superior = null) {
    return registros
      .filter((r) => r.superior === superior)
      .map((r) => ({ ...r, subareas: construirArbol(registros, r.area) }));
  }

  function renderOrganigrama(arbol) {
    if (!arbol || arbol.length === 0) return "";
    let html = "<ul>";
    for (const nodo of arbol) {
      html += `<li><div class='nodo'>${nodo.area}</div>`;
      if (nodo.subareas.length > 0) html += renderOrganigrama(nodo.subareas);
      html += "</li>";
    }
    html += "</ul>";
    return html;
  }

  tabla.addEventListener("click", (e) => {
    if (e.target.classList.contains("btn-ver")) {
      const jerarquia = construirArbol(registrosSimulados);
      const organigramaHTML = renderOrganigrama(jerarquia);
      contenedor.innerHTML = `<div class="organigrama">${organigramaHTML}</div>`;
      modal.classList.add("show");
      modal.setAttribute("aria-hidden", "false");
    }
  });
});

/* Tiempo de respuesta - SEMAFORO */
document.addEventListener("DOMContentLoaded", () => {
  const tabla = document.querySelector("#tablaDocumentos");
  if (!tabla) return;

  const hoy = new Date();

  tabla.querySelectorAll("tbody tr").forEach((fila) => {
    const limiteStr = fila.getAttribute("data-fecha-limite");
    const circulo = fila.querySelector(".status-circle");
    const texto = fila.querySelector(".tiempo-texto");
    if (!limiteStr || !circulo || !texto) return;

    const limite = new Date(limiteStr);
    const diff = Math.ceil((limite - hoy) / (1000 * 60 * 60 * 24));

    circulo.classList.remove("green", "yellow", "red");

    if (diff > 3) {
      circulo.classList.add("green");
      texto.textContent = `Faltan ${diff} días`;
    } else if (diff > 0) {
      circulo.classList.add("yellow");
      texto.textContent = `Faltan ${diff} días`;
    } else {
      circulo.classList.add("red");
      texto.textContent = `Vencido hace ${Math.abs(diff)} días`;
    }
  });
});

/* Fecha de respuesta*/
document.addEventListener("DOMContentLoaded", () => {
  const botonesRespuesta = document.querySelectorAll(
    'button[data-modal-open="modalRespuesta"]'
  );
  const fechaEnvio = document.getElementById("fechaEnvio");
  const btnEnviar = document.getElementById("btnEnviarRespuesta");

  if (!botonesRespuesta.length || !fechaEnvio) return;

  botonesRespuesta.forEach((boton) => {
    boton.addEventListener("click", () => {
      const hoy = new Date();
      const opciones = { year: "numeric", month: "2-digit", day: "2-digit" };
      fechaEnvio.textContent = hoy.toLocaleDateString("es-MX", opciones);
    });
  });

  btnEnviar?.addEventListener("click", () => {
    alert(" Respuesta entregada el " + fechaEnvio.textContent);
  });
});

/*SCRIPT PARA LEY DE ARCHIVO*/
document.addEventListener("DOMContentLoaded", () => {
  const botonesGuardar = document.querySelectorAll(
    '[data-modal-open="modalConfirmar"]'
  );
  const modalConfirmar = document.getElementById("modalConfirmar");
  const mensaje = document.getElementById("mensajeConfirmacion");
  const confirmar = document.getElementById("confirmarUbicacion");
  const cambiarUbicacion = document.getElementById("cambiarUbicacion");
  const modalCambiar = document.getElementById("modalCambiarUbicacion");
  const selectNueva = document.getElementById("nuevaClasificacion");
  const guardarNueva = document.getElementById("guardarNuevaUbicacion");

  let filaSeleccionada = null;

  botonesGuardar.forEach((boton) => {
    boton.addEventListener("click", () => {
      filaSeleccionada = boton.closest("tr");
      const titulo = filaSeleccionada.children[1].textContent;
      const area = filaSeleccionada.children[2].textContent;
      const clasif = filaSeleccionada.children[3].textContent;
      const carpeta = filaSeleccionada.children[4].textContent;

      mensaje.innerHTML = `
            El documento <b>${titulo}</b> del área <b>${area}</b><br>
            se guardará en <b>${carpeta}</b><br>
            con la clasificación <b>${clasif}</b>.
          `;
    });
  });

  confirmar.addEventListener("click", () => {
    if (filaSeleccionada) {
      filaSeleccionada.classList.add("archivado");
      filaSeleccionada.querySelector("td:last-child").innerHTML =
        "<span class='badge success'>Archivado</span>";
      alert("Documento archivado correctamente.");
    }
    modalConfirmar.classList.remove("show");
  });

  cambiarUbicacion.addEventListener("click", () => {
    modalConfirmar.classList.remove("show");
    modalCambiar.classList.add("show");
  });

  guardarNueva.addEventListener("click", () => {
    if (filaSeleccionada && selectNueva.value) {
      filaSeleccionada.children[3].textContent = selectNueva.value;
      filaSeleccionada.children[4].textContent = "Archivador actualizado";
      alert("Clasificación actualizada correctamente.");
      modalCambiar.classList.remove("show");
    } else {
      alert("Selecciona una nueva clasificación antes de guardar.");
    }
  });
});
