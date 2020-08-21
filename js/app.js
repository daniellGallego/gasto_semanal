// variables

const presupuestoUsuario = prompt("¿cual es tu presupuesto semanal?");
const formulario = document.getElementById("agregar-gasto");
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

        // insertar al html
        presupuestoSpan.innerHTML = `${cantidad}`;
        restanteSpan.innerHTML = `${cantidad}`;

    };

    imprimirMensaje(mensaje, tipo) {
        const divMensaje = document.createElement("div");
        divMensaje.classList.add("text-center", "alert");
        if (tipo === "error") {
            divMensaje.classList.add("alert-danger");
        } else {
            divMensaje.classList.add("alert-success");
        }
        divMensaje.appendChild(document.createTextNode(mensaje))

        // insertar mensaje en el Dom
        document.querySelector(".primario").insertBefore(divMensaje, formulario);

        // quitar mensaje de error
        setTimeout(function () {
            document.querySelector(".primario .alert").remove();
            formulario.reset();
        }, 3000);
    }

    // insertar gastos a la lista

    agregarGastoListado(nombre, cantidad) {
        const gastosListado = document.querySelector("#gastos ul");

        // crear li

        const li = document.createElement("li");
        li.className = "list-group-item d-flex justify-content-between alig-items-center";

        // insertar el gasto
        li.innerHTML = `${nombre}
        <span class="badge badge-primary badge-pill">$ ${cantidad} </span>`
        // insertar al html
        gastosListado.appendChild(li)

    }
    // comprueba el presupuesto restante
    presupuestoRestante(cantidad) {
        const restante = document.querySelector("#restante");
        // leemos el presupuesto restante
        const presupuestoRestanteUsuario = cantidadPresupuesto.presupuestoRestante(cantidad);

        restante.innerHTML = `${presupuestoRestanteUsuario}`
        this.comprobarPresupuesto();
    }
    // cambiar de color el presupuesto restante
    comprobarPresupuesto() {
        const presupuestoTotal = cantidadPresupuesto.presupuesto;
        const presupuestoRestante = cantidadPresupuesto.restante;

        // comprobar el 25% del gasto
        if ((presupuestoTotal / 4) > presupuestoRestante) {
            const restante = document.querySelector(".restante");
            restante.classList.remove("alert-succes", "alert-warning");
            restante.classList.add("alert-danger");
        } else if ((presupuestoTotal / 2) > presupuestoRestante) {
            const restante = document.querySelector(".restante");
            restante.classList.remove("alert-succes");
            restante.classList.add("alert-warning")

        }
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

formulario.addEventListener('submit', function (e) {
    e.preventDefault();

    // leer del formulario de gastos
    const nombreGasto = document.querySelector('#gasto').value;
    const cantidadGasto = document.querySelector('#cantidad').value;

    // instanciar la interfaz
    const ui = new Interfaz();

    // comprobar que no hayan campos vacios
    if (nombreGasto === '' || cantidadGasto === '') {

        // 2 parametros mensaje y tipo
        ui.imprimirMensaje("hubo un error", "error");
    } else {
        // insertar en el html
        ui.imprimirMensaje("correcto", "correcto");
        ui.agregarGastoListado(nombreGasto, cantidadGasto);
        ui.presupuestoRestante(cantidadGasto);
    }
})