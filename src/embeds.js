const {Client, EmbedBuilder} = require('discord.js');






const MensajeWelcome = new EmbedBuilder()
.setColor("#faba7a")
.setTitle("⭐ **__ANUNCIO IMPORTANTE - CUÁNTICORP __** ⭐")
.setAuthor({name: 'CuánticoRP', iconURL:'https://cdn.discordapp.com/avatars/1114512596356321300/a08e76d81abd92de42247db305fae502.png'})
.setDescription("¡Hola! Como antiguo usuario de la comunidad de CuánticoRP que eres, te recordamos que volvemos a abrir mañana viernes **30 de junio** de 2023 a las **18:00** hora española. \n\nTenemos preparado un eventazo de carreras con premios, y lo más importante, una nueva versión de Cuántico con muchas novedades. Más información en nuestro Discord: https://discord.gg/NGUtJDY")
.setImage("https://media.discordapp.net/attachments/744134874675282000/1119727930705199165/Copia_de_Banner_CuanticoRP.png?width=1215&height=607")
.setFooter({text:'CuánticoRP', iconURL:'https://cdn.discordapp.com/avatars/1114512596356321300/a08e76d81abd92de42247db305fae502.png'})

const MensajeGang = new EmbedBuilder()
.setColor("Red")
.setTitle("**__CuanticoRP - V7 - PROXIMAMENTE__**")
.setAuthor({name: 'CuánticoRP', iconURL:'https://cdn.discordapp.com/avatars/1114512596356321300/a08e76d81abd92de42247db305fae502.png'})
.setDescription('Tras muchos meses trabajando, nos complace anunciar la próxima apertura de CuánticoRP - V7. Dinero inicial 200k / Vehiculo inicial / Tiendas de ropa reales / Coches reales ....')

.addFields({name: 'Gangs', value: 'Quieres tener tu propia organización? Estamos con las postulaciones abiertas. Podrás postular gratuitamente o comprar una banda Lore o Mafia.', inline: false})
.addFields({name: 'CNP', value: 'Nuestro cuerpo nacional de policia, esta que arde!. Crees que puedes dar la talla como policia? Adelante!!', inline: false})
.addFields({name: 'Mecanicos', value: 'Ganar pasta? Ese es el lema de los mecanicos de Cuantico. Ven y busca el taller que mas te guste para formar parte de su plantilla', inline: false})
.addFields({name: 'Medicos', value: 'Te va mas curar al malito? Adelante entonces!!, en nuestro cuerpo médico, dispondrás de todos los medios necesarios para divertirte', inline: false})


.setImage('https://media.discordapp.net/attachments/744134874675282000/1116045772979437608/Copia_de_peds_1.png?width=1351&height=675')
.setFooter({text:'CuánticoRP', iconURL:'https://cdn.discordapp.com/avatars/1114512596356321300/a08e76d81abd92de42247db305fae502.png'})


function embedmuted(dias, motivo, fechaFinalizacion){

    const embedsilent = new EmbedBuilder()
    .setColor("Red")
    .setTitle("**__HAS SIDO SILENCIADO__**")
    .setAuthor({name: 'CuánticoRP', iconURL:'https://cdn.discordapp.com/avatars/1114512596356321300/a08e76d81abd92de42247db305fae502.png'})
    .setDescription(`Motivo: ${motivo} \n\nLa duración de tu silencio es de: ${dias} dias \nSerás desilenciado automaticamente en fecha: ${fechaFinalizacion} \n\n*Si crees que ha sido un error o tienes cualquier duda respecto a la sancion, puedes abrir ticket y nuestro equipo administrativo te atenderá.*\n\nSaludos\n`)
    .setImage('https://media.tenor.com/7edLgkkkeD0AAAAC/im-muted-im-unmuted.gif')
    .setFooter({text:'CuánticoRP', iconURL:'https://cdn.discordapp.com/avatars/1114512596356321300/a08e76d81abd92de42247db305fae502.png'})


    return embedsilent
}

function embedlogfc(dias, motivo, adminName, adminid, victimname, victimid){
    const embedlogs = new EmbedBuilder()
    .setColor("Blue")
    .setTitle("**__Muteo Realizado__**")
    .setAuthor({name: 'CuánticoRP', iconURL:'https://cdn.discordapp.com/avatars/1114512596356321300/a08e76d81abd92de42247db305fae502.png'})
    .setDescription(`El administrador ${adminName} - (${adminid})\n ha muteado al usuario ${victimname} - (${victimid})\n Duración: ${dias} dias\n Motivo: ${motivo}\n`)
    .setImage('https://thumbs.gfycat.com/ScratchyFeminineAoudad-max-1mb.gif')
    .setFooter({text:'CuánticoRP', iconURL:'https://cdn.discordapp.com/avatars/1114512596356321300/a08e76d81abd92de42247db305fae502.png'})


    return embedlogs
}

function embednomute(username, useridd){
    const unmute = new EmbedBuilder()
    .setColor("#bf7e04")
    .setTitle("**__Usuario Desmuteado__**")
    .setAuthor({name: 'CuánticoRP', iconURL:'https://cdn.discordapp.com/avatars/1114512596356321300/a08e76d81abd92de42247db305fae502.png'})
    .setDescription(`El usuario ${username} - (${useridd}) ha sido desmuteado por expiración de su sanción`)
    .setImage('https://media.tenor.com/B6m0DwPLb08AAAAC/out-of-jail-jail.gif')
    .setFooter({text:'CuánticoRP', iconURL:'https://cdn.discordapp.com/avatars/1114512596356321300/a08e76d81abd92de42247db305fae502.png'})

    const unmute2user = new EmbedBuilder()
    .setColor("Green")
    .setTitle("**__Usuario Desmuteado__**")
    .setAuthor({name: 'CuánticoRP', iconURL:'https://cdn.discordapp.com/avatars/1114512596356321300/a08e76d81abd92de42247db305fae502.png'})
    .setDescription(`Has sido desmuteado por finalización de tu muteo`)
    .setImage('https://media.tenor.com/B6m0DwPLb08AAAAC/out-of-jail-jail.gif')
    .setFooter({text:'CuánticoRP', iconURL:'https://cdn.discordapp.com/avatars/1114512596356321300/a08e76d81abd92de42247db305fae502.png'})


    return {
        unmute: unmute,
        unmute2user: unmute2user
    };

}



module.exports = {MensajeWelcome, MensajeGang, embedmuted, embedlogfc, embednomute}