require('dotenv').config()
const { REST, Routes, ApplicationCommandOptionType } = require('discord.js')

const commands = [
    {
        name: 'anuncio-canal',
        description: 'Comandos de anuncio',
        options: [
            {
                name: 'mensaje-anuncio',
                description: 'Anuncio en el canal actual.',
                type: ApplicationCommandOptionType.String,
                required: true,
            }
        ],
    },
    {
        name: 'anuncio-priv',
        description: 'Comando para enviar mensajes privados',
        options: [
            {
                name: 'usuario-y-hash',
                description: 'usuario y hash del target [ ejemplo#1234 ]',
                type: ApplicationCommandOptionType.String,
                required: true,
            },
            {
                name: 'mensaje',
                description: 'Mensaje de anuncio por privado a usuario.',
                type: ApplicationCommandOptionType.String,
                required: true,
            },
        ],
    },
    {
        name: 'anuncio-masivo',
        description: 'Comando para enviar mensajes masivos',
        options: [
            {
                name: 'tipo-de-mensaje',
                description: 'Tipo de mensaje que se enviará',
                type: ApplicationCommandOptionType.Number,
                choise: [
                    {
                        name:'Gangs',
                        value: 1,
                    },
                    {
                        name:'StartingCRP',
                        value: 2,
                    }
                ],
                required: true,
            },
            {
                name: 'password',
                description: 'Contraseña',
                type: ApplicationCommandOptionType.String,
                required: true,
            },
        ],
    },
    {
        name: 'silenciar',
        description: 'Comando para silenciar usuario',
        options: [
            {
                name: 'tag-usuario',
                description: 'tag del usuario: [ @ejemplo#1234 ]',
                type: ApplicationCommandOptionType.String,
                required: true,
            },
            {
                name: 'tiempo',
                description: 'Dias que durará el silencio',
                type: ApplicationCommandOptionType.Number,
                required: true,
            },
            {
                name: 'motivo',
                description: 'Motivo del silencio',
                type: ApplicationCommandOptionType.String,
                required: true,
            },
        ],
    },
    {
        name: 'join',
        description: 'Conectar canal de voz',
        options: [
            {
                name: 'tag-canal',
                description: 'tag del canal de voz: [ #general ]',
                type: ApplicationCommandOptionType.Channel,
                required: true,
            },
        ],
    },
];

const restt = new REST({ version: '10' }).setToken(process.env.TOKEN);
(async () => {
    try {
        console.log("Registrando comandos de barra...")
        await restt.put(
            Routes.applicationGuildCommands(process.env.CLIENT_ID, 
            process.env.GUILD_ID),
            { body: commands }
        );

        console.log("Comandos de barra registrados correctamente !!;")
    } catch (error) {
        console.log(`Se ha producido un error: ${error}`)
    }
})();