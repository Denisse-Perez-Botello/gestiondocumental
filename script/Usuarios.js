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
    /* 2. MANEJO DE MODALES (Insertar y Editar)    */
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
            // Lógica especial para el botón "Otorgar Privilegios" se maneja más abajo
            if (modalId !== 'modalOtorgarPrivilegios') { 
                openModal(modalId);
            }
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
    /* 4. FUNCIONALIDAD DE MENÚS DESPLEGABLES Y NOTIFICACIONES   */
    /* ========================================================= */
    
    // Notificaciones
    const notificationContainer = document.querySelector('.notification-dropdown-container');
    const notificationMenu = document.querySelector('.notification-menu');
    const notificationBadge = document.querySelector('.notification-badge');


    /*
     * Se actualiza el contador visible en el badge de notificación.
     */
    function updateNotificationCount(count) {
        if (!notificationBadge) return;

        count = Math.max(0, count);

        notificationBadge.setAttribute('data-count', count);
        notificationBadge.textContent = count > 99 ? '99+' : count.toString();

        if (count > 0) {
            notificationBadge.style.display = 'block';
        } else {
            notificationBadge.style.display = 'none';
        }
    }


    if (notificationContainer && notificationMenu) {
        notificationContainer.addEventListener('click', (event) => {
            event.stopPropagation();
            notificationMenu.classList.toggle('visible');

            if (notificationMenu.classList.contains('visible')) {
                updateNotificationCount(0); 
                // Aquí se debería llamar a la función del backend para marcar las notificaciones como leídas.
            }
        });

        document.body.addEventListener('click', () => {
            notificationMenu.classList.remove('visible');
        });
        
        // Simulacion de que al cargar la página hay 3 notificaciones nuevas:
        updateNotificationCount(3); 
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

    /* ========================================================= */
    /* 5. GESTIÓN DE SELECCIÓN DE FILAS DE USUARIOS EN LA TABLA  */
    /* ========================================================= */

    const userTableBody = document.querySelector('.table-container tbody');
    // Variable para almacenar la fila (TR) del usuario actualmente seleccionado
    let selectedRow = null; 

    if (userTableBody) {
        userTableBody.addEventListener('click', (event) => {
            // Asegúrate de que el clic fue en una fila (TR) o dentro de ella
            const clickedRow = event.target.closest('tr');

            // Verifica que sea una fila válida del body y no la barra de acciones
            if (clickedRow && userTableBody.contains(clickedRow)) {
                
                // Si ya hay una fila seleccionada, quítale la clase de selección
                if (selectedRow) {
                    selectedRow.classList.remove('selected-user');
                }

                // Si la fila clicada es la misma que ya estaba seleccionada, deselecciónala (toggle)
                if (selectedRow === clickedRow) {
                    selectedRow = null; 
                } else {
                    // Si es una fila nueva, selecciónala y actualiza la referencia
                    clickedRow.classList.add('selected-user');
                    selectedRow = clickedRow;
                    
                    // Opcional: Mostrar los datos del usuario seleccionado en consola
                    const nombre = clickedRow.cells[0].textContent;
                    const numTrabajador = clickedRow.cells[1].textContent;
                    console.log(`Usuario seleccionado: ${nombre} (No. ${numTrabajador})`);
                }
            }
        });
    }

    /* ========================================================= */
    /* 6. LÓGICA DEL BOTÓN "OTORGAR PRIVILEGIOS"                  */
    /* ========================================================= */

    const btnPrivileges = document.querySelector('.btn-privileges-override');
    const modalPrivilegiosId = 'modalOtorgarPrivilegios';

    if (btnPrivileges) {
        btnPrivileges.addEventListener('click', () => {
            if (selectedRow) {
                // Hay un usuario seleccionado, abrimos el modal
                openModal(modalPrivilegiosId);

                // Opcional: Prellenar el modal con el nombre del usuario si fuera necesario
                const nombreUsuario = selectedRow.cells[0].textContent;
                const modalTitle = document.getElementById('modal-title-privilegios');
                if (modalTitle) {
                     // Ajusta el título para indicar a qué usuario se aplicará
                    modalTitle.textContent = `Otorgar Privilegios a ${nombreUsuario}`;
                }
                
                // Aquí podrías guardar el ID del usuario seleccionado en un campo oculto del formulario del modal
                // const userId = selectedRow.dataset.userId; // Si tu TR tuviera un atributo data-user-id

            } else {
                // No hay usuario seleccionado, muestra un mensaje de alerta
                alert('Por favor, selecciona primero un usuario de la tabla haciendo clic en su fila.');
            }
        });
    }
    /* ========================================================= */
/* 7. FUNCIONALIDAD DE BÚSQUEDA DE USUARIOS EN LA TABLA      */
/* ========================================================= */

const searchInput = document.getElementById('user-search-input');
const tableRows = document.querySelectorAll('.table-container tbody tr');

if (searchInput) {
    searchInput.addEventListener('keyup', (e) => {
        // Obtiene el texto de búsqueda en minúsculas y sin espacios extra
        const searchText = e.target.value.toLowerCase().trim();

        tableRows.forEach(row => {
            // El nombre del usuario está en la primera celda (index 0)
            const userName = row.cells[0].textContent.toLowerCase(); 

            // Verifica si el nombre del usuario incluye el texto de búsqueda
            if (userName.includes(searchText)) {
                row.style.display = ''; // Muestra la fila
            } else {
                row.style.display = 'none'; // Oculta la fila
            }
        });
    });
}

});