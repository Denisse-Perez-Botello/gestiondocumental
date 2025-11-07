document.addEventListener('DOMContentLoaded', () => {

    /* ========================================================= */
    /* 1. FUNCIONALIDAD PRINCIPAL: NAVEGACIÓN LATERAL (VISTAS)    */
    /* (Se requieren ajustes en el HTML para usar data-target y content-view) */
    /* ========================================================= */
    
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
    /* 2. FUNCIONALIDAD MENU LATERAL (COLAPSAR/EXPANDIR)          */
    /* ========================================================= */
    
    const menuToggler = document.getElementById('menu-toggler');
    const sidebar = document.getElementById('sidebar');
    
    if (menuToggler && sidebar) {
        menuToggler.addEventListener('click', () => {
            sidebar.classList.toggle('collapsed'); 
            // Si hay otros elementos que deben cambiar, se añadirían aquí (ej: mainContentWrapper.classList.toggle('expanded-view');)
        });
    }

    /* ========================================================= */
    /* 3. FUNCIONALIDAD DE MENÚS DESPLEGABLES NOTIFICACIONES     */
    /* ========================================================= */
    
    // Notificaciones
    const notificationContainer = document.querySelector('.notification-dropdown-container');
    const notificationMenu = document.querySelector('.notification-menu');
    // Se obtiene el elemento badge
    const notificationBadge = document.querySelector('.notification-badge');


    /*
     * Se actualiza el contador visible en el badge de notificación.
     * @param {number} count - El número de notificaciones.
     */
    function updateNotificationCount(count) {
        if (!notificationBadge) return;

        // Asegura que el conteo no sea negativo
        count = Math.max(0, count);

        // Actualiza el atributo data-count y el texto visible (ejemp. '99+')
        notificationBadge.setAttribute('data-count', count);
        // Usamos el texto del data-count para mantener la lógica simple
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

            // Al abrir el menú, las notificaciones se visualizan
            if (notificationMenu.classList.contains('visible')) {
                // Reinicia a cero visualmente
                updateNotificationCount(0); 
                //Aquí se debería llamar a la función del backend para marcar las notificaciones como leídas en la BD.
                // Ejemplo: marcarNotificacionesLeidas();
            }
        });

        // Cierra al hacer clic en cualquier parte del cuerpo
        document.body.addEventListener('click', () => {
            notificationMenu.classList.remove('visible');
        });
        
        // Simulación de que al cargar la página hay 3 notificaciones nuevas:
        updateNotificationCount(3); 
    }


    /* ========================================================= */
    /* 4. FUNCIONALIDAD CONFIGURACIÓN (GLOBAL)                   */
    /* (Las funciones se hacen globales para ser accesibles desde el onclick en el HTML) */
    /* ========================================================= */
    
    // Función para enviar correo de prueba SMTP
    window.enviar = function() {
        alert('Correo de prueba enviado al remitente configurado.');
    }

    // Función para guardar plantilla de correo
    window.guardarPlantilla = function() {
        const tipo = document.getElementById('tipoPlantilla')?.value;
        const asunto = document.getElementById('asuntoCorreo')?.value;
        const cuerpo = document.getElementById('cuerpoCorreo')?.value;
        
        if (asunto && cuerpo) {
            alert(`Plantilla para "${tipo}" guardada correctamente.`);
        } else {
            alert('Por favor completa los campos de asunto y cuerpo antes de guardar.');
        }
    }

    // Función para enviar correo de prueba con la plantilla
    window.enviarPlantilla = function() {
        alert('Se ha enviado un correo de prueba con la plantilla seleccionada.');
    }

});