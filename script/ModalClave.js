// ===== Modal de Clave =====
const CLAVE_ESPECIAL = "clave123"; // Clave temporal

function abrirModalClave() {
  const modal = document.getElementById("modalClave");
  if (modal) {
    modal.style.display = "flex";
    const claveInput = document.getElementById("claveInput");
    if (claveInput) claveInput.focus();

    const mensaje = document.getElementById("mensajeClave");
    if (mensaje) {
      mensaje.style.display = "none";
      mensaje.textContent = "";
    }
  }
}

function cerrarModalClave() {
  const modal = document.getElementById("modalClave");
  if (modal) {
    modal.style.display = "none";
    const claveInput = document.getElementById("claveInput");
    if (claveInput) claveInput.value = "";

    const mensaje = document.getElementById("mensajeClave");
    if (mensaje) {
      mensaje.style.display = "none";
      mensaje.textContent = "";
    }
  }
}

function confirmarClave() {
  const clave = document.getElementById("claveInput").value.trim();
  const mensaje = document.getElementById("mensajeClave");

  if (clave === "") {
    mensaje.textContent = "Por favor, introduce una clave.";
    mensaje.style.color = "orange";
    mensaje.style.display = "block";
    return;
  }

  if (clave === CLAVE_ESPECIAL) {
    mensaje.textContent = "Clave verificada correctamente.";
    mensaje.style.color = "green";
    mensaje.style.display = "block";

    setTimeout(() => {
      cerrarModalClave();
      window.location.href = "registroRH.html";
    }, 1000);
  } else {
    mensaje.textContent = "Clave incorrecta. Intenta nuevamente.";
    mensaje.style.color = "red";
    mensaje.style.display = "block";
    document.getElementById("claveInput").value = "";
  }
}
