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




// ======== DATOS SIMULADOS POR AÑO Y MES ========
const datosPorPeriodo = {
    "2025-3": {
        enTiempo: 120,
        pendiente: 40,
        vencido: 15,
        barras: [
            { area: "Recursos Humanos", verde: 50, amarillo: 20, rojo: 10 },
            { area: "Contabilidad Técnica", verde: 40, amarillo: 35, rojo: 15 },
            { area: "Presidencia", verde: 55, amarillo: 25, rojo: 20 },
            { area: "Obras Públicas", verde: 30, amarillo: 60, rojo: 70 },
            { area: "Ley de Archivo", verde: 20, amarillo: 40, rojo: 10 },
            { area: "Turismo", verde: 20, amarillo: 35, rojo: 10 }
        ]
    },
    "2025-2": {
        enTiempo: 95,
        pendiente: 32,
        vencido: 18,
        barras: [
            { area: "Recursos Humanos", verde: 45, amarillo: 25, rojo: 12 },
            { area: "Contabilidad Técnica", verde: 38, amarillo: 30, rojo: 18 },
            { area: "Presidencia", verde: 50, amarillo: 28, rojo: 15 },
            { area: "Obras Públicas", verde: 35, amarillo: 55, rojo: 65 },
            { area: "Ley de Archivo", verde: 25, amarillo: 38, rojo: 12 },
            { area: "Turismo", verde: 22, amarillo: 32, rojo: 8 }
        ]
    },
    "2024-12": {
        enTiempo: 110,
        pendiente: 28,
        vencido: 12,
        barras: [
            { area: "Recursos Humanos", verde: 55, amarillo: 18, rojo: 8 },
            { area: "Contabilidad Técnica", verde: 42, amarillo: 32, rojo: 10 },
            { area: "Presidencia", verde: 60, amarillo: 22, rojo: 15 },
            { area: "Obras Públicas", verde: 28, amarillo: 65, rojo: 75 },
            { area: "Ley de Archivo", verde: 18, amarillo: 42, rojo: 8 },
            { area: "Turismo", verde: 25, amarillo: 30, rojo: 12 }
        ]
    }
};

// ======== NOMBRES DE MESES ========
const nombresMeses = [
    "Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio",
    "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"
];

// ======== FUNCIÓN PARA ACTUALIZAR EL DASHBOARD ========
function actualizarDashboard() {
    const anio = document.getElementById("filtroAnio").value;
    const mes = document.getElementById("filtroMes").value;
    const nombreMes = nombresMeses[parseInt(mes) - 1];
    
    // Crear clave del período
    const periodo = `${anio}-${mes}`;
    
    // Obtener datos del período (o usar datos por defecto)
    const datos = datosPorPeriodo[periodo] || datosPorPeriodo["2025-3"];
    
    // ========== ACTUALIZAR TEXTO DEL PERÍODO ==========
    document.getElementById("periodoTexto").textContent = `Datos de ${nombreMes} ${anio}`;
    
    // ========== ACTUALIZAR CÍRCULOS DE PROGRESO ==========
    actualizarCirculo("circuloEnTiempo", "valorEnTiempo", datos.enTiempo, "#4CAF50");
    actualizarCirculo("circuloPendiente", "valorPendiente", datos.pendiente, "#FFC107");
    actualizarCirculo("circuloVencido", "valorVencido", datos.vencido, "#F44336");
    
    // ========== ACTUALIZAR GRÁFICA DE BARRAS ==========
    actualizarBarras(datos.barras);
    
    console.log(`Dashboard actualizado: ${nombreMes} ${anio}`);
}

// ======== FUNCIÓN PARA ACTUALIZAR UN CÍRCULO ========
function actualizarCirculo(idCirculo, idValor, valor, color) {
    const circulo = document.getElementById(idCirculo);
    const spanValor = document.getElementById(idValor);
    
    // Actualizar valor
    spanValor.textContent = valor;
    
    // Calcular grados (máximo 360)
    const total = 175; // Total de documentos (puedes ajustar esto)
    const porcentaje = (valor / total) * 100;
    const grados = (porcentaje / 100) * 360;
    
    // Actualizar el círculo con conic-gradient
    circulo.style.background = `conic-gradient(${color} 0deg, ${color} ${grados}deg, #e0e0e0 ${grados}deg)`;
}

// ======== FUNCIÓN PARA ACTUALIZAR BARRAS ========
function actualizarBarras(barras) {
    const contenedor = document.querySelector(".barras-contenedor-horizontal");
    
    // Limpiar barras existentes
    contenedor.innerHTML = "";
    
    // Crear nuevas barras
    barras.forEach(barra => {
        const divBarra = document.createElement("div");
        divBarra.className = "barra-area horizontal";
        
        divBarra.innerHTML = `
            <div class="segmento green" style="width: ${barra.verde}%;"></div>
            <div class="segmento yellow" style="width: ${barra.amarillo}%;"></div>
            <div class="segmento red" style="width: ${barra.rojo}%;"></div>
        `;
        
        contenedor.appendChild(divBarra);
    });
    
    // Agregar eje X al final
    const ejeX = document.createElement("div");
    ejeX.className = "eje-x-labels";
    ejeX.innerHTML = `
        <div>0</div>
        <div>25</div>
        <div>50</div>
        <div>75</div>
        <div>100</div>
    `;
    document.querySelector(".grafico-principal").appendChild(ejeX);
}

// ======== CARGAR DATOS INICIALES AL CARGAR LA PÁGINA ========
document.addEventListener("DOMContentLoaded", function() {
    // Configurar valores iniciales
    document.getElementById("filtroAnio").value = "2025";
    document.getElementById("filtroMes").value = "3";
    
    // Cargar datos iniciales
    actualizarDashboard();
    
    // Configurar evento para abrir modal
    const grafico = document.getElementById("graficoPrincipal");
    if (grafico) {
        grafico.addEventListener("click", function() {
            document.getElementById("modalDetalles").classList.add("is-open");
        });
    }
});

});