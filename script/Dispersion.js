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
    
   // Notificaciones
const notificationContainer = document.querySelector('.notification-dropdown-container');
const notificationMenu = document.querySelector('.notification-menu');
// Se obtiene el elemento badge
const notificationBadge = document.querySelector('.notification-badge');


/*
 * Se actualiza el contador visible en el badge de notificación.
 */
function updateNotificationCount(count) {
    if (!notificationBadge) return;

    // Asegura que el conteo no sea negativo
    count = Math.max(0, count);

    // Actualiza el atributo data-count y el texto visible (ejemp. '99+')
    notificationBadge.setAttribute('data-count', count);
    notificationBadge.textContent = count > 99 ? '99+' : count.toString();

    // La visibilidad se maneja con el CSS que usa el atributo data-count,
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
            // Ejemplo, como marcarNotificacionesLeidas();
        }
    });

    // Cierra al hacer clic en cualquier parte del cuerpo
    document.body.addEventListener('click', () => {
        notificationMenu.classList.remove('visible');
    });
    
    //Simulacion de que al cargar la página hay 3 notificaciones nuevas):
    updateNotificationCount(3); 
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

    //VARIABLES GLOBALES PARA FILTROS Y SELECCIÓN DE FILA
    let currentRow = null; 
    let currentStatusFilter = 'all'; 

    // DATOS DE EJEMPLO SIMULADOS
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
            fileViewer.srcdoc = "<p class='viewer-message error-message'>Documento no disponible.</p>";
            return;
        }

        // 1. Marcar las casillas
        areaCheckboxes.forEach(checkbox => {
            checkbox.checked = data.area.includes(checkbox.value);
        });
        
        // 2. Cargar el documento Vista Previa
        fileViewer.srcdoc = '';
        fileViewer.src = data.fileUrl;
        
        // 3. Manejo de error de carga
        fileViewer.onerror = () => {
            fileViewer.src = ''; 
            fileViewer.srcdoc = "<p class='viewer-message error-message'>⚠️ Error al cargar el documento.<br>Verifica que el archivo existe.</p>";
        };
        
        // 4. Actualizar título y Asunto
        cardTitle.textContent = data.title;
        document.getElementById('asunto').value = data.asunto;

        // 5. Confirmar
        btnConfirmar.disabled = false;
        btnConfirmar.textContent = 'Dispersar ' + data.title.split(' ')[0];
    };
        
 
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
            
            //Se usa la columna Tipo de Documento (índice 1) para obtener la clave 
            let documentCell = row.cells[1].textContent.trim(); 
            const documentType = documentCell.replace(/\.(pdf|jpg|jpeg|png)$/i, '');
            
            cargarDatosDispersión(documentType);
        };

        if (tableBody) {
            tableBody.addEventListener('click', handleRowClick);
        }
        
        // Listener del botón de dispersión
        btnConfirmar.addEventListener('click', () => {
            const areasDestino = getSelectedAreas();
            
            if (areasDestino.length === 0) {
                alert('Por favor, selecciona al menos un área de destino para la dispersión.');
                return;
            }
            
            if (!currentRow) {
                alert('Por favor, selecciona un documento de la tabla primero.');
                return;
            }
            
            // --- Lógica de Actualización de la Tabla al Dispersar ---
            
            const responseDateCellIndex = 4; // Fecha de respuesta (Columna 5)
            const statusCellIndex = 5;       // Estatus (Columna 6)
            
            // 2. Obtener la fecha actual
            const today = new Date().toLocaleDateString('es-MX', { 
                day: '2-digit', month: '2-digit', year: 'numeric' 
            });

            // 3. Actualizar las celdas de la fila
            currentRow.cells[responseDateCellIndex].textContent = today;
            currentRow.cells[statusCellIndex].textContent = 'Turnado'; 
            
            // 4. Limpiar la selección y la UI
            currentRow.classList.remove('row-selected');
            currentRow = null; 
            cardTitle.textContent = "Documento Dispersado";
            btnConfirmar.disabled = true;

            console.log('Documento dispersado a las áreas:', areasDestino);
            alert(`Documento dispersado con éxito a: ${areasDestino.join(', ')}. Estatus actualizado a "Turnado".`);
        });

    /* ========================================================= */
    /* 5. FUNCIONALIDAD MAESTRA: BÚSQUEDA, RESALTADO Y FILTRADO */
    /* ========================================================= */
    
    const searchInput = document.getElementById('document-search');
    
    // Funciones auxiliares para el resaltado
    const removeHighlight = (html) => html.replace(/<\/?mark>/g, '');
    const highlightMatches = (text, filter) => {
        if (!filter) return text;
        const regex = new RegExp(filter, 'gi');
        return text.replace(regex, (match) => `<mark>${match}</mark>`);
    };

    // FUNCIÓN MAESTRA UNIFICADA
    const applyFilters = () => {
        const textFilter = searchInput.value;
        const textFilterUpper = textFilter.toUpperCase();
        const rows = tableBody.getElementsByTagName('tr');

        for (let i = 0; i < rows.length; i++) {
            const firstCell = rows[i].getElementsByTagName('td')[0];  // Asunto/Num. Oficio
            const statusCell = rows[i].getElementsByTagName('td')[5];  // Estatus (Última columna)
            
            if (firstCell && statusCell) {
                
                // --- 1. Lógica de Estatus (Usa la variable global currentStatusFilter) ---
                const currentStatus = statusCell.textContent.trim();
                const statusMatch = (currentStatusFilter === 'all' || currentStatus === currentStatusFilter);
                
                // --- 2. Lógica de Búsqueda de Texto y Resaltado ---
                
                const subjectElement = firstCell.querySelector('div.document-subject');
                const numberElement = firstCell.querySelector('small.document-number');
                
                // Limpieza de Resaltado (antes de la comprobación)
                let subjectTextClean = subjectElement ? removeHighlight(subjectElement.innerHTML) : '';
                let numberTextClean = numberElement ? removeHighlight(numberElement.innerHTML) : '';
                
                const fullCellTextUpper = (subjectTextClean + ' ' + numberTextClean).toUpperCase();
                const textMatch = fullCellTextUpper.indexOf(textFilterUpper) > -1;

                // --- 3. Decisión Final: Mostrar/Ocultar Fila ---
                
                if (statusMatch && textMatch) {
                    rows[i].style.display = ''; // Muestra la fila

                    // Aplicar Resaltado (solo si hay texto de búsqueda)
                    if (textFilter) {
                        if (subjectElement) subjectElement.innerHTML = highlightMatches(subjectTextClean, textFilter);
                        if (numberElement) numberElement.innerHTML = highlightMatches(numberTextClean, textFilter);
                    } else {
                        // Limpiar resaltado si el campo de búsqueda está vacío
                        if (subjectElement) subjectElement.innerHTML = subjectTextClean;
                        if (numberElement) numberElement.innerHTML = numberTextClean;
                    }
                    
                } else {
                    rows[i].style.display = 'none'; // Oculta la fila
                    
                    // Asegurar que el resaltado se limpie en la fila oculta
                    if (subjectElement) subjectElement.innerHTML = subjectTextClean;
                    if (numberElement) numberElement.innerHTML = numberTextClean;
                }
            }
        }
    };

    // Event Listener que ejecuta el filtrado al escribir
    if (searchInput) {
        searchInput.addEventListener('keyup', applyFilters);
    }


    /* ========================================================= */
    /* 6. FUNCIONALIDAD: FILTRADO POR ESTATUS (CONTROLADOR UI) */
    /* ========================================================= */
    
    const statusFilterButton = document.getElementById('status-filter-button');
    const statusDropdown = document.getElementById('status-dropdown');
    const statusFilterOptions = document.querySelectorAll('.filter-option');

    if (statusFilterButton && statusDropdown) {
        
        // Función para mostrar/ocultar el dropdown
        statusFilterButton.addEventListener('click', (event) => {
            event.stopPropagation();
            statusDropdown.classList.toggle('visible');
        });

        // Cierra el dropdown si se hace clic fuera
        document.addEventListener('click', () => {
            statusDropdown.classList.remove('visible');
        });

        // Manejador de clics en las opciones del dropdown
        statusFilterOptions.forEach(option => {
            option.addEventListener('click', (event) => {
                event.preventDefault();
                event.stopPropagation();
                
                const selectedStatus = option.getAttribute('data-status');
                
                // 1. Actualiza el estado activo de la opción en la UI
                statusFilterOptions.forEach(opt => opt.classList.remove('active'));
                option.classList.add('active');
                
                // 2. Cierra el menú y ACTUALIZA la variable global
                statusDropdown.classList.remove('visible');
                currentStatusFilter = selectedStatus; 
                
                // Opcional: Actualizar el texto del botón
                const buttonText = selectedStatus === 'all' ? 'Filtrar por Estatus' : selectedStatus;
                statusFilterButton.innerHTML = `${buttonText} <span class="filter-icon">▼</span>`;
                
                // 3. Llama a la función maestra para aplicar AMBOS filtros
                applyFilters(); 
            });
        });
    }

}); // Cierre de DOMContentLoaded


