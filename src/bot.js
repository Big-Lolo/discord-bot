//requestss
require('dotenv').config();
const {Client, EmbedBuilder, Partials, ActivityType  } = require('discord.js');
const {MensajeWelcome, MensajeGang, embedmuted, embedlogfc, embednomute} = require('./embeds')
const {twitchListener} = require('./twitch/tstreams')
const {moddingListener} = require('./moderation/modding')
const {onWelcome} = require('./welcome/welcome')
const fs = require('fs');
const path = require('path');
const rutaArchivo = path.join(__dirname, '/moderation/fechasdesilencio.js');
const { joinVoiceChannel } = require('@discordjs/voice');


const datos = {};

//definir cliente
const client = new Client({
    intents: 3276799,
    partials: [
        Partials.Message
      ]
});

//Contenido y start



client.on('ready', async () => {
    console.log('Esto esta en marcha weeon')  
    client.user.setActivity({
        name: "CuánticoRP",
        url: 'https://discord.gg/NGUtJDY',
      });    
});

twitchListener(client)
moddingListener(client)
onWelcome(client)



client.on('messageCreate', (message) => {
    if (message.author.bot){
        return;
    }; 
    if (message.channel.type == 1) {

      const embedd = new EmbedBuilder()
        .setColor('#9409A4')
        .setTitle('Se ha recibido un nuevo mensaje por privado al BOT CUÁNTICORP')
        .setAuthor({ name: message.author.username, iconURL: message.author.displayAvatarURL()})
        .setDescription(`**Mensaje nuevo recibido:**\n\n ${message.content}\n\n`)
        .setThumbnail(message.author.displayAvatarURL())
        .setTimestamp();

      const channel = client.channels.cache.get('1120811345223364659');
        try{
            channel.send({ embeds: [embedd] });
        } catch (err) {
            console.log(err)
        }
    }

});



client.on('interactionCreate', async (interaction) => {
    if (!interaction.isChatInputCommand()) return;

    if (interaction.commandName === 'anuncio-canal'){
        const idUsrCmd = interaction.user.id;
        const tableValues = process.env.TABLE_VALUES.split(',');
        if (tableValues.includes(idUsrCmd)) {
            const opt1 = interaction.options.get('mensaje-anuncio').value
            const channelid = interaction.channelId
            const channel = client.channels.cache.get(channelid);
            channel.send(opt1);
            interaction.reply({ content: 'Mensaje enviado correctamente', ephemeral: true });
        }else{
            interaction.reply({ content: '📛 No tienes suficientes permisos para user este comando', ephemeral: true });
        }

       
    };

    if (interaction.commandName === 'anuncio-priv'){
        const idUsrCmd = interaction.user.id;
        const tableValues = process.env.TABLE_VALUES.split(',');
        if (tableValues.includes(idUsrCmd)) {
            const usuario = interaction.options.get('usuario-y-hash').value
            const mensaje = interaction.options.get('mensaje').value
            console.log(usuario)
            const tag = usuario.startsWith('<@')
            console.log(tag)
            let clientid
            
            if(tag){
                clientid = usuario.replace(/[^0-9]/g, "" ) 
            }else{
                clientid = client.users.cache.find(u => u.tag === usuario).id
            }
        
            var errors = false
            client.users.send(clientid, mensaje)
            .then(() => {
                interaction.reply({ content: '✅ Mensaje enviado correctamente', ephemeral: true });
                console.log(`Mensaje enviado `);
            }) 
            .catch((error) => {
                console.log(" Error enviando mensaje privado porque no se aceptan DM");
                interaction.reply({ content: '⚠️ Se ha producido un error al enviar el mensaje, seguramente el usuario solo acepta DM de amigos', ephemeral: true });
            });
        }else{
            interaction.reply({ content: '📛 No tienes suficientes permisos para user este comando', ephemeral: true });
        }
    }



    if (interaction.commandName === 'join'){
        const idUsrCmd = interaction.user.id;
        const tableValues = process.env.TABLE_VALUES.split(',');
        if (tableValues.includes(idUsrCmd)) {
                        
            
            try{
            const voiceChannel = interaction.options.getChannel('tag-canal')
            const voiceConnection = joinVoiceChannel({
                channelId: voiceChannel.id,
                guildId: interaction.guildId,
                adapterCreator: interaction.guild.voiceAdapterCreator,
            });
            } catch(err) {
                console.log(err)
            }
        }else{
            interaction.reply({ content: '📛 No tienes suficientes permisos para user este comando', ephemeral: true });
        }
    }




    if (interaction.commandName === 'anuncio-masivo'){
        const idUsrCmd = interaction.user.id;
        const tableValues = process.env.TABLE_VALUES.split(',');
        const pasword = interaction.options.get('password').value
        if (pasword == 'CRP2023#V7.'){
            if (tableValues.includes(idUsrCmd)) {
                //Sistema de masivo
                const list = client.guilds.cache.get(interaction.guildId);
                const opcion = interaction.options.get('tipo-de-mensaje').value
                

                
                var contenido

                if (opcion === 1){
                    contenido = MensajeWelcome
                }
                if (opcion === 2){
                    contenido = MensajeGang
                }
        
                if (opcion === 1 || opcion === 2){
                    list.members.cache.forEach(member => {   
                        member.user.send({ embeds: [contenido] })
                        .then(() => {
                            //interaction.reply({ content: '✅ Mensaje enviado correctamente', ephemeral: true });
                            member.user.send({content:"https://discord.gg/NGUtJDY" })
                            .then(() =>{

                            }).catch((error) => {console.log(error)})
                        }) 
                        .catch((err) => {
                            console.log(err)
                            //interaction.reply({ content: `⚠️ ERROR CON USUARIO PORQUE NO ACCEPTA DM: ${member.user.username}`});
                        }); 
                    }); 
                }else{
                    interaction.reply({ content: '⚠️ Valor introducido INVALIDO', ephemeral: true });
                }
            
            }else{
                interaction.reply({ content: '📛 No tienes suficientes permisos para user este comando', ephemeral: true });
            }
        }else{
            interaction.reply({ content: '📛 Contraseña Incorrecta', ephemeral: true });

        }
    
    };

    if (interaction.commandName === 'silenciar'){
        const member = interaction.member;
        const tableRoles = process.env.TABLE_ROLES.split(',');
        if (tableRoles.some(role => member.roles.cache.has(role))) {
            const user = interaction.options.get('tag-usuario').value
            const tiempo = interaction.options.get('tiempo').value
            const motivo = interaction.options.get('motivo').value

            const userId = user.replace(/[^0-9]/g, "" );
            const roleIduser = process.env.USERROL; // Reemplaza con la ID del rol que deseas asignar
            const roleIdsilent = process.env.SILENTROL;
            const guild = client.guilds.cache.get(interaction.guildId);
            const member = guild.members.cache.get(userId);
            const role2add = guild.roles.cache.get(roleIdsilent);
            const role2remove = guild.roles.cache.get(roleIduser);

            member.roles.add([role2add])
            .then(() => {
                member.roles.remove([role2remove])
                .then(() => {
                    interaction.reply({ content: '✅ Asignado rol de silenciado correctamente', ephemeral: true });
                    const duracionSancion = tiempo;
                    const fechaActual = new Date();
                    const duracionMilisegundos = duracionSancion * 24 * 60 * 60 * 1000; // Convertir días a milisegundos
                    const fechaFinalizacionn = new Date(fechaActual.getTime() + duracionMilisegundos);
                    const embedd = embedmuted(tiempo, motivo, fechaFinalizacionn)

                    //MENSAJE PRIVADO AL USUARIO
                    client.users.send(userId, {embeds: [embedd]})
                    .then(() => {
                        //REGISTRO BASE DE DATOS DEL SILENCIO CON TIEMPO Y TODO ESO
                        fs.readFile(rutaArchivo, 'utf8', (err, data) => {
                            if (err) {
                            console.error('Error al leer el archivo:', err);
                            } else {
                                console.log(data)
                                console.log(data.length)
                            const fechaFinalizacionPorUsuario = JSON.parse(data);                            
                            fechaFinalizacionPorUsuario[`${userId}`] = fechaFinalizacionn; // Ejemplo de agregar una nueva fecha de finalización para el usuario 3
                            Object.assign(datos, fechaFinalizacionPorUsuario); //guardar datos en una variable local
                            // Escribir el objeto actualizado en el archivo
                            fs.writeFile(rutaArchivo, JSON.stringify(fechaFinalizacionPorUsuario), (err) => {
                                if (err) {
                                console.error('Error al escribir el archivo:', err);
                                } else {
                                console.log('Valor añadido y archivo actualizado correctamente.');
                                }
                            });
                            }
                        });


                        //LOG DE SILENCIADO
                        const canal = client.channels.cache.get(process.env.NOTISTAFFCHANNEL); //canal de sanciones discord del discord de Staff
                        const victimaNbre = member.user.tag
                        const embedlog = embedlogfc(tiempo, motivo, member.tag, member.id, victimaNbre, userId)
                        //canal.send({embeds: [embedlog]})
                    })
                    .catch((err) =>{
                        if(err){
                             //REGISTRO BASE DE DATOS DEL SILENCIO CON TIEMPO Y TODO ESO
                        fs.readFile(rutaArchivo, 'utf8', (err, data) => {
                            if (err) { 
                            console.error('Error al leer el archivo:', err);
                            } else {
                                console.log(data)
                                console.log(data.length)
                            const fechaFinalizacionPorUsuario = JSON.parse(data);                            
                            fechaFinalizacionPorUsuario[`${userId}`] = fechaFinalizacionn; // Ejemplo de agregar una nueva fecha de finalización para el usuario 3
                            Object.assign(datos, fechaFinalizacionPorUsuario); //guardar datos en una variable local
                            // Escribir el objeto actualizado en el archivo
                            fs.writeFile(rutaArchivo, JSON.stringify(fechaFinalizacionPorUsuario), (err) => {
                                if (err) {
                                console.error('Error al escribir el archivo:', err);
                                } else {
                                console.log('Valor añadido y archivo actualizado correctamente.');
                                }
                            });
                            }
                        });


                        //LOG DE SILENCIADO
                        const canal = client.channels.cache.get(process.env.NOTISTAFFCHANNEL); //canal de sanciones discord del discord de Staff
                        const victimaNbre = member.user.tag
                        const embedlog = embedlogfc(tiempo, motivo, member.tag, member.id, victimaNbre, userId)
                        //canal.send({embeds: [embedlog]})
                        }
                    })
                })
                .catch((error) => {
                    interaction.reply({ content: '📛 Error al asignar silenciado', ephemeral: true });
                })
            })
            .catch((err) => {
                interaction.reply({ content: '📛 Error al asignar silenciado', ephemeral: true });
            })
        }else{
            interaction.reply({ content: '📛 No tienes suficientes permisos para user este comando', ephemeral: true });
        }


 
        
     };
})

//conectar con api
client.login(process.env.TOKEN);
