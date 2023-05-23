const actividadesModel = require("../models/actividadesModel");

const usuariosModel = require("../models/usuariosModel");




async function getActividades(req, res) {
    //let actividadesM = JSON.parse(await actividadesModel.getActivities())
    //console.log(actividadesM.actividades)
    res.send("Actividades")
}

async function getActivitiesUser(s) {
    let user = s;
    return new Promise(async (resolve, reject) => {
        let actividadesM = await actividadesModel.getActivities(); // Obtener las actividades
        let activitiesCoord = await actividadesModel.getActivitiesCoordinacion(); // Obtener las coordinaciones de actividades

        const actCoord = activitiesCoord.actividades_coordinaciones.map((actividadC) => {
            return actividadesM.actividades.find((actividad) => actividad.id_actividad === actividadC.actividades_id_actividad 
            && Number(actividadC.coordinaciones_id_coordinacion) == s.coordinacion)
        });

        const actividadesFiltradas = actCoord.filter((actividad) => actividad !== undefined);
        // const act = actividadesM.actividades.find((actividad) => actividad.id_actividad === 1)
        resolve(actividadesFiltradas);
    });
}

function iniciarActividad(req, res) {
    let data = {
        area: req.headers.area,
        cargo: req.headers.cargo,
        actividad: req.headers.actividad,
        observacion1: req.headers.observacion1,
        observacion2: "",
        fecha_inicio: req.headers.fecha_inicio,
        fecha_fin: ""
    }

    actividadesModel.iniciarActividad(data)
    res.status(200).send("OK");
}

module.exports = {
    getActividades,
    getActivitiesUser,
    iniciarActividad
}