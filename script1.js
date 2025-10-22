document.addEventListener('DOMContentLoaded', () => {

    /* ========================================================= */
    /* 1. FUNCIONALIDAD PRINCIPAL: NAVEGACIÓN LATERAL (VISTAS) */
    /* ========================================================= */
    
    // Selecciona todos los enlaces de navegación que tienen un target de contenido
    const contentLinks = document.querySelectorAll('.sidebar .nav-link[data-target]');
    const allNavItems = document.querySelectorAll('.sidebar .nav-item');
    const allContentViews = document.querySelectorAll('.content-view');

    contentLinks.forEach(link => {
        link.addEventListener('click', (event) => {
            event.preventDefault(); 
            
            const targetId = link.getAttribute('data-target');
            const currentNavItem = link.closest('.nav-item');
            
            // 1. Alternar la clase 'active' en los enlaces del menú (resaltado)
            allNavItems.forEach(item => item.classList.remove('active'));
            currentNavItem.classList.add('active');

            // 2. Mostrar u ocultar las áreas de contenido (vistas)
            allContentViews.forEach(view => view.classList.remove('active')); // Oculta todas las vistas
            
            const targetView = document.getElementById(targetId);
            if (targetView) {
                targetView.classList.add('active'); // Muestra la vista objetivo
            }
        });
    });

    /* ========================================================= */
    /* 2. FUNCIONALIDAD: TOGGLE DE SIDEBAR (COLAPSAR/EXPANDIR) */
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
    /* 3. FUNCIONALIDAD: MENÚS DESPLEGABLES (NOTIFICACIONES Y ESTADO) */
    /* ========================================================= */
    
    // 3.1 Notificaciones
    const notificationContainer = document.querySelector('.notification-dropdown-container');
    const notificationMenu = document.querySelector('.notification-menu');

    if (notificationContainer && notificationMenu) {
        notificationContainer.addEventListener('click', (event) => {
            event.stopPropagation();
            notificationMenu.classList.toggle('visible');
        });
        document.body.addEventListener('click', () => {
            notificationMenu.classList.remove('visible');
        });
    }
    
    // 3.2 Menús de Estado en Tabla
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
                closeAllStatusMenus(dropdownContent); // Cierra otros
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
    
    // Cierra menús de estado al hacer clic en el cuerpo
    document.body.addEventListener('click', closeAllStatusMenus);
});