function validacionesMiactividad() {
    const btnIngreso = document.getElementById("ringreso"),
        btnSalida = document.getElementById("rsalida");

    // impedir que se registre un ingreso sin tener una salida
    if (userD.fechaSalida == '' || userD.fechaSalida == undefined) {
        btnIngreso.disabled = true;
        btnIngreso.title = "Registra primero tu salida laboral para registrar el ingreso"
    }
}


function registrarIngreso() {
    let fechaActual = new Date();
    let idUsuario = userD.id_usuario; // Almacenar el valor en una variable local


    const data = {
        fecha_ingreso: fechaActual.getFullYear().toString().padStart(4, '0') + "-" +
            (fechaActual.getMonth() + 1).toString().padStart(2, '0') + "-" +
            fechaActual.getDate().toString().padStart(2, '0') + ' ' + fechaActual.getHours().toString().padStart(2, '0') + ':' +
            fechaActual.getMinutes().toString().padStart(2, '0'),
        fecha_salida: "",
        usuario: idUsuario // 'JT22859' // Usar la variable local en lugar de acceder directamente a userD.id_usuario
    };

    fetch("/ingresoLaboral", {
        method: 'POST',
        headers: data
    })
        .then(response => {
            if (response.ok) {
                // La solicitud se realizó con éxito (código de estado 2xx)
                //console.log("Solicitud exitosa");
                //console.log("Estado de respuesta:", response.status);
                if (response.status == 200) {
                    alert("Registro de ingreso laboral registrado existosamente")
                }
            } else {
                // La solicitud no se pudo completar (código de estado diferente de 2xx)
                // console.log("La solicitud no se pudo completar");
                // console.log("Estado de respuesta:", response.status);
                alert("Ocurrió un error")
            }
        })
        .catch(error => {
            // Error al realizar la solicitud
            console.log("Error al realizar la solicitud:", error);
        });
    window.location.reload()
}


function registrarSalida() {
    const fechaActual = new Date()

    const fecha_salidaC =  fechaActual.getFullYear().toString().padStart(4, '0') + "-" +
            (fechaActual.getMonth() + 1).toString().padStart(2, '0') + "-" +
            fechaActual.getDate().toString().padStart(2, '0') + ' ' + fechaActual.getHours().toString().padStart(2, '0') + ':' +
            fechaActual.getMinutes().toString().padStart(2, '0');
            
    fetch("/salidaLaboral", {
        method: 'POST',
        headers: {
            fecha_salida: fecha_salidaC
        }
    })
        .then(response => {
            if (response.ok) {
                if (response.status == 200) {
                    alert("Salida laboral registrado existosamente")
                }
            } else {
                alert("Ocurrió un error")
            }
        })
        .catch(error => {
            console.log("Error al realizar la solicitud:", error);
        });
    window.location.reload()
}

function iniciarActividad() {
    let fechaActual = new Date()

    fechaActual =  fechaActual.getFullYear().toString().padStart(4, '0') + "-" +
            (fechaActual.getMonth() + 1).toString().padStart(2, '0') + "-" +
            fechaActual.getDate().toString().padStart(2, '0') + ' ' + fechaActual.getHours().toString().padStart(2, '0') + ':' +
            fechaActual.getMinutes().toString().padStart(2, '0');

    let areaS = document.getElementById("area"),
        cargoS = document.getElementById("cargo"),
        actividadS = document.getElementById("actividad"),
        observacionS = document.getElementById("observaciones")
   
    let data = {
        area: areaS.value,
        cargo: cargoS.value,
        actividad: actividadS.value,
        observacion1: observacionS.value,
        observacion2: "",
        fecha_inicio: fechaActual
    }

    fetch("/iniciarActividad", {
        method: 'POST',
        headers: data
    })
        .then(response => {
            if (response.ok) {
                if (response.status == 200) {
                    alert("Actividad registrada existosamente")
                }
            } else {
                alert("Ocurrió un error")
            }
        })
        .catch(error => {
            console.log("Error al realizar la solicitud:", error);
        });
}

validacionesMiactividad()