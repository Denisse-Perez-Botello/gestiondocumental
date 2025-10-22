document.addEventListener('DOMContentLoaded', () => {
    // 1. Referencias a elementos del DOM
    const tableBody = document.querySelector('.table-container tbody');
    const uploadLabel = document.getElementById('uploadLabel');
    const fileViewer = document.getElementById('fileViewer');
    const cardTitle = document.querySelector('.card h2');
    const btnConfirmar = document.querySelector('.btn-confirmar');
    
    // Referencia al grupo de casillas
    const areaCheckboxes = document.querySelectorAll('#area-checkboxes input[name="area"]');

    // MOCK: Datos de ejemplo (Asegúrate que 'area' sea un arreglo de strings)
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
            area: [] // Ninguna por defecto
        }
    };

    /* --- LÓGICA DE MANEJO DE CHECKBOXES --- */

    /**
     * Obtiene los valores de las casillas marcadas.
     * @returns {string[]} Arreglo con los nombres de las áreas seleccionadas.
     */
    const getSelectedAreas = () => {
        // Busca todas las casillas con el name="area" que estén marcadas
        return Array.from(areaCheckboxes)
                    .filter(checkbox => checkbox.checked)
                    .map(checkbox => checkbox.value);
    };


    /* --- LÓGICA DE INTERACCIÓN TABLA Y FORMULARIO --- */

    /**
     * Carga el documento simulado y los datos del formulario, marcando las casillas.
     */
    const cargarDatosDispersión = (docType) => {
        const data = documentosMock[docType];

        if (!data) {
            console.error('Datos del documento no encontrados.');
            return;
        }

        // 1. Limpiar y marcar las casillas
        areaCheckboxes.forEach(checkbox => {
            // Marca la casilla si su valor está incluido en el arreglo de áreas del documento
            checkbox.checked = data.area.includes(checkbox.value);
        });
        
        // 2. Ocultar placeholder y mostrar visor
        uploadLabel.style.display = 'none';
        fileViewer.style.display = 'block';

        // 3. Cargar el documento en el iframe
        fileViewer.src = data.fileUrl; 
        
        // 4. Actualizar título y Asunto
        cardTitle.textContent = data.title;
        document.getElementById('asunto').value = data.asunto;

        // 5. Habilitar la confirmación
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
        
        const documentType = row.cells[0].textContent.trim();
        cargarDatosDispersión(documentType);
    };

    // Agregar el listener a la tabla
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
        
        console.log('Documento dispersado a las áreas:', areasDestino);
        alert(`✅ Documento dispersado con éxito a: ${areasDestino.join(', ')}.`);
        
        // Lógica para enviar datos al servidor aquí...
    });
});