const {Client, EmbedBuilder} = require('discord.js');


function embedofwelcome(member){
    
    const embedwelcoming = new EmbedBuilder()
    .setColor("#8D0072")
    .setTitle("**¡Bienvenido a CuánticoRP!**")
    .setAuthor({name: 'CuánticoRP', iconURL:'https://cdn.discordapp.com/avatars/1114512596356321300/a08e76d81abd92de42247db305fae502.png'})
    .setDescription(`Esperemos que te lo pases muy bien.\n ¡Si necesitas ayuda, abre un ticket y te atenderemos lo antes posible! 😎 `)
    .setImage('https://media.discordapp.net/attachments/744134874675282000/1119727930705199165/Copia_de_Banner_CuanticoRP.png?width=1351&height=675')
    .setFooter({text:'CuánticoRP', iconURL:'https://cdn.discordapp.com/avatars/1114512596356321300/a08e76d81abd92de42247db305fae502.png'})

    const embedwelcoming2 = new EmbedBuilder()
    .setColor("#8D0072")
    .setTitle("**¡Bienvenido a CuánticoRP!**")
    .setAuthor({name: 'CuánticoRP', iconURL:'https://cdn.discordapp.com/avatars/1114512596356321300/a08e76d81abd92de42247db305fae502.png'})
    .setDescription(`Es un placer que te hayas pasado por nuestra comunidad.\n ¡Esperamos que disfrutes y que te lo pases muy bien con todos tus amigos!\n Recuerda que puedes rolear en diferentes tipos de trabajo como pueden ser:\n\n - **Policia Nacional o Guardia Civil**\n- **Mecánico**\n- **Cruz Roja**\n- **Piloto**\n- **Basurero**\n- **Cosechador**\n- **Entre otros...**\n\n\n Si te gusta más el lado oscuro también puedes optar con unirte a una organización criminal o ¡crear la tuya propia de forma gratuita!\n\n Si necesitas ayuda solo tienes que abrir un ticket y te atenderemos cuanto antes.`)
    .setImage('https://media.discordapp.net/attachments/744134874675282000/1119727930705199165/Copia_de_Banner_CuanticoRP.png?width=1351&height=675')
    .setFooter({text:'CuánticoRP', iconURL:'https://cdn.discordapp.com/avatars/1114512596356321300/a08e76d81abd92de42247db305fae502.png'})


    return {
        embed1: embedwelcoming,
        embed2: embedwelcoming2
    };
}


function onWelcome(client){

    client.on('guildMemberAdd', (member) => { 
        // Aquí puedes realizar las acciones que desees al recibir un nuevo miembro
        // Envía un mensaje de bienvenida al canal deseado
        const canalBienvenida = member.guild.channels.cache.get(process.env.WELCOMECHANNEL);
        member.fetch().then((fetchedMember) => {
            console.log(JSON.stringify(fetchedMember))
            const content = `¡ Bienvenido ${fetchedMember.user} !`
            const {embed1, embed2} = embedofwelcome(fetchedMember)
            canalBienvenida.send({content: content, embeds:[embed1]})
            
            .then(() => {
                fetchedMember.user.send({embeds: [embed2] })
                .then(() => {})
                .catch((err) =>{})
            })
        .catch((error) => {})
    });
    
});
}


module.exports = {onWelcome}