// =========================================================
// SCRIPT DE INTERFAZ: SIDEBAR Y NAVBAR
// =========================================================

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
            
            // 1. Alternar la clase 'active' en los enlaces del menú
            allNavItems.forEach(item => item.classList.remove('active'));
            currentNavItem.classList.add('active');

            allContentViews.forEach(view => view.classList.remove('active')); // Oculta todas las vistas
            
            const targetView = document.getElementById(targetId);
            if (targetView) {
                targetView.classList.add('active'); // Muestra la vista objetivo
            }
        });
    });

    /* ========================================================= */
    /* 2. FUNCIONALIDAD DE MENU LATERAL EXPANDIR */
    /* ========================================================= */
    
    const menuToggler = document.getElementById('menu-toggler');
    const sidebar = document.getElementById('sidebar');
    // const mainContentWrapper = document.querySelector('.main-content-wrapper'); 

    if (menuToggler && sidebar) {
        menuToggler.addEventListener('click', () => {
            sidebar.classList.toggle('collapsed'); 
        });
    }

    /* ========================================================= */
    /* 3. FUNCIONALIDAD DE MENÚS DESPLEGABLES (NOTIFICACIONES) */
    /* ========================================================= */
    
    const notificationContainer = document.querySelector('.notification-dropdown-container');
    const notificationMenu = document.querySelector('.dropdown-menu.notification-menu');

    if (notificationContainer && notificationMenu) {
        notificationContainer.addEventListener('click', (event) => {
            
            event.stopPropagation();
            notificationMenu.classList.toggle('visible');

            // Lógica para cerrar otros dropdowns si existen 
            const profileMenu = document.querySelector('.dropdown-menu.profile-menu');
            if (profileMenu && profileMenu.classList.contains('visible') && profileMenu !== notificationMenu) {
                profileMenu.classList.remove('visible');
            }
        });

        // Cierra el menú de notificaciones si se hace clic en cualquier lugar fuera de él
        document.body.addEventListener('click', () => {
            notificationMenu.classList.remove('visible');
        });
    }

    // funcionalidad para el Menú de Perfil/Estado si aplica
    const profileContainer = document.querySelector('.profile-info-container');
    const profileMenu = document.querySelector('.dropdown-menu.profile-menu');

    if (profileContainer && profileMenu) {
        profileContainer.addEventListener('click', (event) => {
            event.stopPropagation();
            profileMenu.classList.toggle('visible');

            // Lógica para cerrar el menú de Notificaciones si está abierto
            if (notificationMenu && notificationMenu.classList.contains('visible') && notificationMenu !== profileMenu) {
                notificationMenu.classList.remove('visible');
            }
        });
        
        // Cierra el menú de perfil si se hace clic en cualquier lugar fuera de él
        document.body.addEventListener('click', () => {
            profileMenu.classList.remove('visible');
        });
    }
});