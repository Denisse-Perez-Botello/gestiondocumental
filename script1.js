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
