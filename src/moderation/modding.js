const path = require('path');
const fs = require('fs');
const {MensajeWelcome, MensajeGang, embedmuted, embedlogfc, embednomute} = require('../embeds')



function moddingListener(client){
  
    // Ruta relativa al archivo 'fechasdesilencio.js'
    const rutaArchivo = path.join(__dirname, 'fechasdesilencio.js');

    //SISTEMA DE COMPROBACIÓN DE SILENCIOS + DESMUTEO AUTOMATICO:

    setInterval(() => {
        comprobarFechasExpiradas();
    }, 60000); //cada minuto
  
  function comprobarFechasExpiradas() {
        fs.readFile(rutaArchivo, 'utf8', (err, data) => {
        if (err) {
            console.error('Error al leer el archivo:', err);
        } else {
            let datos = JSON.parse(data); // Convertir los datos del archivo a un objeto
    
            const fechaActual = new Date();
            for (const usuarioId in datos) {
            if (datos.hasOwnProperty(usuarioId)) {
                const fechaSancion = new Date(datos[usuarioId]);
                if (fechaSancion <= fechaActual) {
                // La fecha ha expirado, elimina la sanción del usuario
                eliminarSancion(usuarioId, datos);
                } else {
                
                }
            }
            }
        }
        });
    }


    function eliminarSancion(usuarioId, datos) {
        // Lógica para eliminar la sanción del usuario

        delete datos[usuarioId]; // Eliminar el usuario y su fecha de la tabla
    
        // Escribir los datos actualizados en el archivo
        delete datos[usuarioId];
        fs.writeFile(rutaArchivo, JSON.stringify(datos), (err) => {
            if (err) {
            console.error('Error al escribir el archivo:', err);
            } else {
            console.log('Archivo actualizado correctamente.');

            const userId = usuarioId;
            const roleIduser = process.env.USERROL;
            const roleIdsilent = process.env.SILENTROL;
            const guild = client.guilds.cache.get(process.env.SERVERGUILD);
            const member = guild.members.cache.get(userId);
            const role2remove = guild.roles.cache.get(roleIdsilent);
            const role2add = guild.roles.cache.get(roleIduser);
            member.roles.remove([role2remove])
            .then(() => {
                member.roles.add([role2add])
                .then(() => {
                    const memberr = guild.members.cache.get(userId);
                    const usernames = memberr.user.username
                    const canal = client.channels.cache.get(process.env.NOTISTAFFCHANNEL); //canal de sanciones discord del discord de Staff
                    const {unmute, unmute2user} = embednomute(usernames, userId)
                    canal.send({embeds: [unmute]})
                    .then(() => {
                        
                        client.users.send(userId, {embeds: [unmute2user]})
                        .then(() => {                    
                            console.log(`Se ha eliminado la sanción del usuario ${usuarioId}`);
                        })
                        .catch((errore) =>{
                            if(errore){
                            console.log(`Se ha eliminado la sanción del usuario ${usuarioId}`);
                            }
                        })

                    })
                })
            })
            .catch((error) => {
                console.log(error)
            })
        }
    })
    }
}











module.exports = {moddingListener}