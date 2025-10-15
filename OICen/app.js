import { db, ref, onValue, set, push, remove, update } from "./firebase-config.js";

const tablaBody = document.getElementById("tabla-body");
const btnAgregar = document.getElementById("btn-agregar");

const alumnos = ["Paola", "Tiago", "Patricio", "Matías"];
const ejerciciosRef = ref(db, "ejercicios");

// Escucha cambios en tiempo real
onValue(ejerciciosRef, (snapshot) => {
  tablaBody.innerHTML = "";
  const data = snapshot.val();
  if (!data) return;
  Object.keys(data).forEach((id) => {
    const ej = data[id];
    const fila = document.createElement("tr");
    fila.innerHTML = `
      <td><a href="${ej.enunciado}" target="_blank">${ej.nombre}</a></td>
      ${alumnos.map(al => `
        <td>
          <input type="number" min="0" max="100" value="${ej.puntajes?.[al] || 0}" data-id="${id}" data-al="${al}">
        </td>`).join("")}
      <td>
        <a href="${ej.kit}" target="_blank">Kit</a> |
        <button data-del="${id}" style="background:red;color:white;border:none;border-radius:5px;">✖</button>
      </td>
    `;
    tablaBody.appendChild(fila);
  });
  aplicarColores();
});

function aplicarColores() {
  document.querySelectorAll("td input").forEach(input => {
    const val = parseInt(input.value);
    input.style.backgroundColor = val === 0 ? "#ff6666" : val === 100 ? "#66ff66" : "#fff366";
  });
}

// Actualiza puntaje
tablaBody.addEventListener("input", (e) => {
  if (e.target.matches("input")) {
    const id = e.target.dataset.id;
    const alumno = e.target.dataset.al;
    const valor = parseInt(e.target.value);
    update(ref(db, `ejercicios/${id}/puntajes`), { [alumno]: valor });
    aplicarColores();
  }
});

// Eliminar ejercicio
tablaBody.addEventListener("click", (e) => {
  if (e.target.dataset.del) {
    remove(ref(db, "ejercicios/" + e.target.dataset.del));
  }
});

// Agregar nuevo ejercicio
btnAgregar.addEventListener("click", () => {
  const nombre = document.getElementById("nombre-ej").value;
  const enunciado = document.getElementById("link-enunciado").value;
  const kit = document.getElementById("link-kit").value;
  if (!nombre || !enunciado || !kit) return alert("Completa todos los campos");
  push(ejerciciosRef, {
    nombre, enunciado, kit,
    puntajes: { Paola: 0, Tiago: 0, Patricio: 0, Matías: 0 }
  });
  document.getElementById("nombre-ej").value = "";
  document.getElementById("link-enunciado").value = "";
  document.getElementById("link-kit").value = "";
});
