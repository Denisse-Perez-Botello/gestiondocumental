// ======== Esperar a que el DOM esté listo ========
document.addEventListener('DOMContentLoaded', function() {
  
  // ======== Abrir el modal al hacer clic en la gráfica ========
  const grafico = document.getElementById("graficoPrincipal");
  if (grafico) {
    grafico.addEventListener("click", function() {
      // Actualizar datos del modal antes de abrir
      actualizarDatosModal();
      document.getElementById("modalDetalles").classList.add("is-open");
    });
  }
});

// ======== Actualizar datos del modal según período ========
function actualizarDatosModal() {
  const anio = document.getElementById("filtroAnio").value;
  const mes = document.getElementById("filtroMes").value;
  
  // Aquí actualizarías la tabla con datos reales del período seleccionado
  console.log(`Modal abierto para ${mes}/${anio}`);
}

// ======== Cerrar el modal ========
function cerrarModal() {
  document.getElementById("modalDetalles").classList.remove("is-open");
}

// ======== Filtro de tabla ========
function filtrarTabla() {
  const areaSeleccionada = document.getElementById("filtroArea").value.toLowerCase();
  const statusSeleccionado = document.getElementById("filtroStatus").value.toLowerCase();
  const filas = document.querySelectorAll("#tablaDetalles tbody tr");

  filas.forEach(fila => {
    const area = fila.children[0].textContent.toLowerCase();
    const status = fila.children[4].textContent.toLowerCase();

    const coincideArea = !areaSeleccionada || area.includes(areaSeleccionada);
    const coincideStatus = !statusSeleccionado || status.includes(statusSeleccionado);

    fila.style.display = (coincideArea && coincideStatus) ? "" : "none";
  });
}