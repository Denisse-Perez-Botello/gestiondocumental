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

            // 2. Mostrar u ocultar las áreas de contenido (vistas)
            allContentViews.forEach(view => view.classList.remove('active')); // Oculta todas las vistas
            
            const targetView = document.getElementById(targetId);
            if (targetView) {
                targetView.classList.add('active'); 
            }
        });
    });

    /* ========================================================= */
    /* 2. FUNCIONALIDAD DE MENU LATERAL EXPANDIR */
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
    /* 3. FUNCIONALIDAD DE MENÚS DESPLEGABLES (NOTIFICACIONES) */
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

    /* ========================================================= */
    /* 4. FUNCIONALIDAD LÓGICA DE DISPERSIÓN (TABLA Y FORMULARIO) */
    /* ========================================================= */

    // 1. Referencias a elementos del DOM de la vista de Dispersión
    const tableBody = document.querySelector('.table-container tbody');
    const fileViewer = document.getElementById('fileViewer'); 
    const cardTitle = document.querySelector('.card h2');
    const btnConfirmar = document.querySelector('.btn-confirmar');
    
    // Referencia al grupo de casillas
    const areaCheckboxes = document.querySelectorAll('#area-checkboxes input[name="area"]');

    //Almacena la referencia a la fila (<tr>) seleccionada
    let currentRow = null; 

    // Datos de ejemplo (URL del archivo a visualizar)
    const documentosMock = {
        'Notificación de trabajos': {
            title: 'Notificación de Trabajos sobre el Derecho de Vía',
            fileUrl: 'archivos/notificacion-trabajos.pdf', 
            asunto: 'Solicitud para iniciar obras en la vía pública.',
            area: ['Secretaría Técnica', 'Jurídico'] 
        },
        'Solicitud de Viáticos': {
            title: 'Solicitud de Viáticos',
            fileUrl: 'archivos/solicitud-viaticos.pdf',
            asunto: 'Viáticos para viaje oficial a Monterrey.',
            area: ['Presidencia']
        },
        'Solicitud de uso de espacio público': {
            title: 'Solicitud de uso de espacio público',
            fileUrl: 'archivos/espacio-publico.pdf',
            asunto: 'Permiso para evento deportivo en plaza central.',
            area: ['Jurídico', 'Oficialía de Partes', 'Presidencia']
        },
        'Informe de servicios públicos': {
            title: 'Informe de servicios públicos',
            fileUrl: 'archivos/informe-servicios.pdf',
            asunto: 'Revisión trimestral de gastos de agua y luz.',
            area: []
        }
    };

    /* --- MANEJO DE CHECKBOXES --- */

    const getSelectedAreas = () => {
        return Array.from(areaCheckboxes)
                    .filter(checkbox => checkbox.checked)
                    .map(checkbox => checkbox.value);
    };


    /* --- LÓGICA DE INTERACCIÓN TABLA Y FORMULARIO --- */

    /**
     * Carga el documento simulado, los datos del formulario y se actualiza para visualizarlo.
     */
    const cargarDatosDispersión = (docType) => {
        const data = documentosMock[docType];

        if (!data) {
            console.error('Datos del documento no encontrados para la clave:', docType);
            fileViewer.srcdoc = "<p style='text-align:center; padding: 20px; color:red;'>Documento no disponible.</p>";
            return;
        }

        // 1. Marcar las casillas
        areaCheckboxes.forEach(checkbox => {
            checkbox.checked = data.area.includes(checkbox.value);
        });
        
        // 2. Cargar el documento Vista Previa
        fileViewer.src = data.fileUrl; 
        
        // 3. Actualizar título y Asunto
        cardTitle.textContent = data.title;
        document.getElementById('asunto').value = data.asunto;

        // 4. Confirmar
        btnConfirmar.disabled = false;
        btnConfirmar.textContent = 'Dispersar ' + data.title.split(' ')[0];
    };
    
    /**
     * Manejador de clic en la fila de la tabla.
     */
    const handleRowClick = (event) => {
        const row = event.target.closest('tr');
        if (!row || row.tagName !== 'TR') return;

        // Limpia selección y resalta
        document.querySelectorAll('.table-container tbody tr').forEach(r => {
            r.classList.remove('row-selected');
        });
        row.classList.add('row-selected');
        
        //Guarda la fila seleccionada globalmente
        currentRow = row;
        
        let documentName = row.cells[0].textContent.trim();
        const documentType = documentName.replace(/\.(pdf|jpg|jpeg|png)$/i, '');
        
        cargarDatosDispersión(documentType);
    };

    if (tableBody) {
        tableBody.addEventListener('click', handleRowClick);
    }
    
    // Listener del botón de dispersión
    btnConfirmar.addEventListener('click', () => {
        const areasDestino = getSelectedAreas();
        
        if (areasDestino.length === 0) {
            alert('🚫 Por favor, selecciona al menos un área de destino para la dispersión.');
            return;
        }
        
        if (!currentRow) {
            alert('🚫 Por favor, selecciona un documento de la tabla primero.');
            return;
        }
        
        // --- Lógica de Actualización de la Tabla al Dispersar ---
        
        const responseDateCellIndex = 2; 
        const statusCellIndex = 3; 
        
        // 2. Obtener la fecha actual para la columna "Fecha de respuesta"
        const today = new Date().toLocaleDateString('es-MX', { 
            day: '2-digit', month: '2-digit', year: 'numeric' 
        });

        // 3. Actualizar las celdas de la fila
        currentRow.cells[responseDateCellIndex].textContent = today;
        currentRow.cells[statusCellIndex].textContent = 'Turnado'; //Estatus
        
        // 4. Limpiar la selección y la UI
        currentRow.classList.remove('row-selected');
        currentRow = null; // Reinicia la fila seleccionada
        cardTitle.textContent = "Documento Dispersado";
        btnConfirmar.disabled = true;

        console.log('Documento dispersado a las áreas:', areasDestino);
        alert(`✅ Documento dispersado con éxito a: ${areasDestino.join(', ')}. Estatus actualizado a "Turnado".`);
    });
});