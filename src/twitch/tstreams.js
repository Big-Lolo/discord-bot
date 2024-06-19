const {Client, EmbedBuilder} = require('discord.js');


function twitchListener(client){
        //Twitch steams system
        
    const { ApiClient } = require('twitch');
    const { ClientCredentialsAuthProvider } = require('twitch-auth');

    const notifiedStreams = [];
    async function checkNewStreamsByKeywordAndGame(keyword, gameName) {
    const authProvider = new ClientCredentialsAuthProvider(process.env.CLIENTIDSTREAM, process.env.CLIENTSECRETSTREAM);
    const clientt = new ApiClient({ authProvider });

    try {
        const game = await clientt.helix.games.getGameByName(gameName);

        if (!game) {
        console.log(`No se encontró el juego "${gameName}".`);
        return;
        }

        const streams = clientt.helix.streams.getStreamsPaginated({ game: game.id });

        
        // Leer los IDs de los streams ya notificados desde un archivo o base de datos

        const newStreams = [];
        for await (const stream of streams) {
        const isKeywordMatch = stream.title.toLowerCase().includes(keyword.toLowerCase());
        const isNotified = notifiedStreams.includes(stream.id);
        if (isKeywordMatch && !isNotified) {
            newStreams.push(stream);
            notifiedStreams.push(stream.id);
        }
        }

        // Escribir los nuevos IDs de los streams notificados en un archivo o base de datos

        newStreams.forEach((stream) => {
        const notificationMessage = `Nuevo stream encontrado: ${stream.userDisplayName} - https://www.twitch.tv/${stream.userDisplayName}`;
        //console.log(stream)
        // Aquí puedes implementar la notificación a tu elección
        console.log(notificationMessage);

        const StreamEmbed = new EmbedBuilder()
        .setColor("#9409A4")
        .setTitle(stream.title)
        .setURL(`https://www.twitch.tv/${stream.userDisplayName}`)
        .setAuthor({name: stream.userDisplayName, iconURL:'https://media.discordapp.net/attachments/744134874675282000/1116400835467944026/5968819.png?width=460&height=460'})
        .setDescription(`:red_circle: ${stream.viewers} viewers`)
        .setImage(`https://static-cdn.jtvnw.net/previews-ttv/live_user_${(stream.userDisplayName).toLowerCase()}-1920x1080.jpg`)
        .setFooter({ text: `Inicio de transmisión: ${stream.startDate}` });
        const rolstreamings = '961349881589534761';
        var contenttag = `Nuevo stream disponible  <@&961349881589534761>`
        client.channels.cache.get("767827966515347477").send({content: contenttag, embeds:[StreamEmbed]})
        });
    } catch (error) {
        console.log('Error:', error.message);
    }
    }

    // Ejemplo de uso
    const keyword = process.env.STREAMKEYWORD; // La palabra clave que deseas buscar en el título del stream
    const gameName = process.env.GAMETYPESTREAM; // El nombre del juego en el que deseas buscar los streams
    setInterval(() => {
    checkNewStreamsByKeywordAndGame(keyword, gameName);
    }, process.env.CHECKSTREAMTIMER); // Verificar nuevos streams cada 1 minuto
}





module.exports = {twitchListener}