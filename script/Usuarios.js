document.addEventListener('DOMContentLoaded', () => {

    /* ========================================================= */
    /* 1. FUNCIONALIDAD PRINCIPAL: NAVEGACIÓN LATERAL (VISTAS)   */
    /* ========================================================= */
    
    // Seleccion todos los enlaces de navegación 
    const contentLinks = document.querySelectorAll('.sidebar .nav-link[data-target]');
    const allNavItems = document.querySelectorAll('.sidebar .nav-item');
    const allContentViews = document.querySelectorAll('.content-view');

    contentLinks.forEach(link => {
        link.addEventListener('click', (event) => {
            event.preventDefault(); 
            
            const targetId = link.getAttribute('data-target');
            const currentNavItem = link.closest('.nav-item');
            
            // Alterna la clase 'active' en los enlaces del menú
            allNavItems.forEach(item => item.classList.remove('active'));
            currentNavItem.classList.add('active');

            // Muestra u oculta las áreas de contenido de las vistas
            allContentViews.forEach(view => view.classList.remove('active')); // Oculta todas las vistas
            
            const targetView = document.getElementById(targetId);
            if (targetView) {
                targetView.classList.add('active'); // Muestra la vista objetivo
            }
        });
    });


    /* ========================================================= */
    /* 2. MANEJO DE MODALES (Insertar y Editar)  */
    /* ========================================================= */
    
    // Selectores para modales
    const openButtons = document.querySelectorAll("[data-modal-open]");
    const closeButtons = document.querySelectorAll("[data-modal-close]");
  
    const VISIBLE_CLASS = "is-open"; 

    // Función para abrir el modal
    const openModal = (modalId) => {
        const modal = document.getElementById(modalId);
        if (modal) {
            modal.classList.add(VISIBLE_CLASS);
            modal.setAttribute("aria-hidden", "false");
            // Enfoca el primer campo del formulario para accesibilidad/usabilidad
            const firstInput = modal.querySelector('input, select, textarea');
            if (firstInput) {
                firstInput.focus();
            }
        }
    };

    // Función para cerrar el modal
    const closeModal = (modal) => {
        if (modal) {
            modal.classList.remove(VISIBLE_CLASS);
            modal.setAttribute("aria-hidden", "true");
        }
    };

    //Eventos de Apertura
    openButtons.forEach((button) =>
        button.addEventListener("click", () => {
            const modalId = button.getAttribute("data-modal-open");
            openModal(modalId);
        })
    );

    //Eventos de Cierre
    closeButtons.forEach((button) =>
        button.addEventListener("click", () => {
         
            const modal = button.closest(".modal"); 
            closeModal(modal);
        })
    );

    //Cierre al hacer clic en el fondo oscuro
    document.addEventListener("click", (e) => {
      
        if (e.target instanceof Element && e.target.classList.contains("modal")) {
            closeModal(e.target);
        }
    });

    //Cierre con la tecla ESC
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            const openModalElement = document.querySelector(`.modal.${VISIBLE_CLASS}`);
            closeModal(openModalElement);
        }
    });


    /* ========================================================= */
    /* 3. FUNCIONALIDAD MENU LATERAL (COLAPSAR/EXPANDIR)   */
    /* ========================================================= */
    
    const menuToggler = document.getElementById('menu-toggler');
    const sidebar = document.getElementById('sidebar');
    const mainContentWrapper = document.querySelector('.main-content-wrapper');

    if (menuToggler && sidebar && mainContentWrapper) {
        menuToggler.addEventListener('click', () => {
            sidebar.classList.toggle('collapsed'); 
        });
    }

    /* ========================================================= */
    /* 4. FUNCIONALIDAD DE MENÚS DESPLEGABLES NOTIFICACIONES */
    /* ========================================================= */
    
    //Notificaciones
    const notificationContainer = document.querySelector('.notification-dropdown-container');
    const notificationMenu = document.querySelector('.notification-menu');

    if (notificationContainer && notificationMenu) {
        notificationContainer.addEventListener('click', (event) => {
            event.stopPropagation();
            notificationMenu.classList.toggle('visible');
        });
        // Cierra al hacer clic en cualquier parte del cuerpo
        document.body.addEventListener('click', () => {
            notificationMenu.classList.remove('visible');
        });
    }
    
    // Menús de Estado en Tabla
    const dropdownActions = document.querySelectorAll('.dropdown-action');

    function closeAllStatusMenus(currentOpenMenu = null) {
        document.querySelectorAll('.dropdown-content').forEach(menu => {
            if (menu !== currentOpenMenu) {
                menu.style.display = 'none';
            }
        });
    }

    dropdownActions.forEach(actionContainer => {
        const toggleButton = actionContainer.querySelector('.dropdown-toggle-status');
        const dropdownContent = actionContainer.querySelector('.dropdown-content');
        
        if (toggleButton && dropdownContent) {
            toggleButton.addEventListener('click', (event) => {
                event.stopPropagation();
                closeAllStatusMenus(dropdownContent);
                dropdownContent.style.display = (dropdownContent.style.display === 'block') ? 'none' : 'block';
            });

            // Lógica para botones de Activar/Desactivar (simulación)
            dropdownContent.querySelectorAll('button').forEach(button => {
                button.addEventListener('click', () => {
                    console.log('Acción realizada:', button.textContent.trim());
                    dropdownContent.style.display = 'none';
                });
            });
        }
    });
    
    // Cierra menús de estado al hacer clic en otro lado
    document.body.addEventListener('click', closeAllStatusMenus);
});