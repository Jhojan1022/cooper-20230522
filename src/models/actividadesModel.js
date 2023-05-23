const fs = require('fs');
const path = require('path');
const archivoActividades = path.join(__dirname, "../database/actividades.json");
const archivoActividadesCoord = path.join(__dirname, "../database/actividades_coordinaciones.json");
const archivoUsuariosActividades = path.join(__dirname, "../database/usuarios_actividades.json");

function getActivities() {
  return new Promise((resolve, reject) => {
    fs.readFile(archivoActividades, 'utf8', function (err, data) {
      if (err) {
        reject(err);
      } else {
        try {
          const activities = JSON.parse(data); // Parsear el contenido del archivo como JSON
          resolve(activities); // Resolver la promesa con los datos obtenidos
        } catch (error) {
          reject(error); // Rechazar la promesa si hay un error al parsear el JSON
        }
      }
    });
  });
}

function getActivitiesCoordinacion() {
  return new Promise((resolve, reject) => {
    fs.readFile(archivoActividadesCoord, 'utf8', function (err, data) {
      if (err) {
        reject(err);
      } else {
        try {
          const activitiesCoordinacion = JSON.parse(data); // Parsear el contenido del archivo como JSON
          resolve(activitiesCoordinacion); // Resolver la promesa con los datos obtenidos
        } catch (error) {
          reject(error); // Rechazar la promesa si hay un error al parsear el JSON
        }
      }
    });
  });
}

async function getActivitiesUser(s) {
  let user = s;
  let activities = await getActivities();
  let activitiesCoord = await getActivitiesCoordinacion();

  return new Promise((resolve, reject) => {
    resolve({ activities, activitiesCoord });
  });
}

function iniciarActividad(data) {
  let auM = fs.readFileSync(archivoUsuariosActividades);
  let au = JSON.parse(auM);

  au.usuarios_actividades.push(data)

  fs.writeFile(archivoUsuariosActividades, JSON.stringify(data), function (err) {
    if (err) throw err;
    console.log('Archivo usuarios_actividades modificado!');
  })
  console.log(au)
}



module.exports = {
  getActivities,
  getActivitiesCoordinacion,
  getActivitiesUser,
  iniciarActividad
}








