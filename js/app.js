// variables

const presupuestoUsuario = prompt("¿cual es tu presupuesto semanal?");
let cantidadPresupuesto;

// clases
// clase de presupuesto
class Presupuesto {
    constructor(presupuesto) {
        this.presupuesto = Number(presupuesto);
        this.restante = Number(presupuesto);
    }
    // metodo para ir restando del presupuesto actual
    presupuestoRestante(cantidad = 0) {
        return (this.restante -= Number(cantidad));
    }
}

// clase de interfaz todo lo relacionado con el presupuesto

class Interfaz {
    insertarPresupuesto(cantidad) {
        const presupuestoSpan = document.querySelector('span#total');
        const restanteSpan = document.querySelector('span#restante');

        presupuestoSpan.innerHTML = `${cantidad}`;
        restanteSpan.innerHTML = `${cantidad}`;

    }

}

// event listeners
document.addEventListener("DOMContentLoaded", function () {
    if (presupuestoUsuario === null || presupuestoUsuario === "") {
        window.location.reload();
    } else {
        // instanciar el presupuesto
        cantidadPresupuesto = new Presupuesto(presupuestoUsuario);

        console.log(cantidadPresupuesto);
        // insertar el presupuesto a la interfaz
        const ui = new Interfaz();
        ui.insertarPresupuesto(cantidadPresupuesto.presupuesto);
    }
});