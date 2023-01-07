export function valida(input) {
    const tipoDeInput = input.dataset.tipo;
    if (validadores[tipoDeInput]) {
        validadores[tipoDeInput](input)
    }

    if (input.validity.valid) {
        input.parentElement.classList.remove("input-container--invalid")
        input.parentElement.querySelector(".input-message-error").innerHTML = ""
    }else {
        input.parentElement.classList.add("input-container--invalid")
        input.parentElement.querySelector(".input-message-error").innerHTML = mostrarMensajeDeError(tipoDeInput, input)
    }
}

const tipoDeErrores = [
    "valueMissing",
    "typeMismatch",
    "patternMismatch",
    "customError"
]

const mensajesDeError = {
    nombre: {
        valueMissing: "El campo nombre no puede estar vacío"
    },
    email: {
        valueMissing: "El campo correo no puede estar vacío",
        typeMismatch: "El correo no es valido"
    },
    password: {
        valueMissing: "El campo contraseña no puede estar vacío",
        patternMismatch: "Al menos 6 caracteres, 12 maximo una letra en mayuscula y una en minuscula sin caracteres especiales y algun numero"
    },
    nacimiento: {
        valueMissing: "Este campo no puede estar vacío",
        customError: "Debes tener al menos 18 años de edad"
    },
    number: {
        valueMissing: "Este campo no puede estar vacío",
        patternMismatch: "El formato requerido es xxxxxxxxxx 10 numeros"
    },
    direccion: {
        valueMissing: "Este campo no puede estar vacío",
        patternMismatch: "La direccion debe de tener entre 10 a 40 caracteres"
    },
    region: {
        valueMissing: "Este campo no puede estar vacío",
        patternMismatch: "La region debe de tener entre 3 a 40 caracteres"
    },
    comuna: {
        valueMissing: "Este campo no puede estar vacío",
        patternMismatch: "La comuna debe de tener entre 3 a 40 caracteres"
    },
}

const validadores = {
    nacimiento: (input) => validarNacimiento(input),
}

function mostrarMensajeDeError(tipoDeInput, input) {
    let mensaje = ""
    tipoDeErrores.forEach((error) => {
        if (input.validity[error]) {
            mensaje = mensajesDeError[tipoDeInput][error]
        }
    })
    return mensaje
}

function validarNacimiento(input) {
    const fechaCliente = new Date(input.value);
    let mensaje = "";
    if(!mayorDeEdad(fechaCliente)) {
        mensaje = "Debes tener al menos 18 años de edad"
    }

    input.setCustomValidity(mensaje)
}

function mayorDeEdad(fecha) {
    const fechaActual = new Date();
    const diferenciaFechas = new Date(
        fecha.getUTCFullYear() + 18,
        fecha.getUTCMonth(),
        fecha.getUTCDate()
    );
    return diferenciaFechas <= fechaActual
}

// vamos a otro curso y volveremos 03. validacon de fechas mejorando el codigo, recodatorio para luego volver y saber donde quede