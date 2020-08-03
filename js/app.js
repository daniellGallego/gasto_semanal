// variables 

const presupuestoUsuario = prompt('¿cual es tu presupuesto semanal?');
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
        return this.restante == Number(cantidad);

    }

}



// event listeners
document.addEventListener('DOMContentLoaded', function () {

    if (presupuestoUsuario === null || presupuestoUsuario === "") {
        window.location.reload();
    } else {
        // instanciar el presupuesto
        cantidadPresupuesto = new Presupuesto(presupuestoUsuario);

        console.log(cantidadPresupuesto)
    }
});