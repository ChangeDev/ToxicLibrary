const {FriendlyError, SQLiteProvider} = require('discord.js-commando');
const {MessageEmbed} = require('discord.js');
const Discord = require('discord.js')

const path = require('path');
const sqlite = require('sqlite');
const config = require('./data/config.json');
const { stripIndents } = require('common-tags')

const ToxicCommandoClient = require('./lib/ToxicCommandoClient');
const ToxicUtils = require('./lib/ToxicUtils');

const bot = new Discord.Client();

const client = new ToxicCommandoClient({
    commandPrefix: config.PREFIX,
    owner: config.ADMIN,
    disableEveryone: true,
    unknownCommandResponse: false,
    disabledEvents: ["TYPING_START"]
});

sqlite.open(path.join(__dirname, "/data/settings.sqlite3")).then((db) => {
    client.setProvider(new SQLiteProvider(db));
});

client.registry
    .registerDefaultTypes()
    .registerGroups([
        ['general', 'General'],
        ['levels', 'Levels'],
        ['admin', 'Admin'],
        ['util', 'Util'],
        ['dev', 'Dev']

    ])
    .registerCommandsIn(path.join(__dirname, 'commands'));

client.on('message', async (message) => {
    if (message.author.id === client.user.id) {
        return;
    }

    if (message.channel.type === 'group') {
        return;
    }

    if (message.author.bot) {
        return;
    }

    if(!message.guild){
        return
    }

    await client.levels.giveGuildUserExp(message.guild.members.get(message.author.id), message);

});

client.on('commandError', (cmd, err) => {
    if (err instanceof FriendlyError) return;
    client.logger.error(`Error in command ${cmd.groupID }: ${cmd.memberName} ${err}`);
});

client.on('commandBlocked', (msg, reason) => {
    client.logger.warn(`Command [${msg.command.groupID}:${msg.command.memberName}] blocked. Reason: ${reason}`);
});

client.login(config.TOKEN).catch((err) => {
    client.logger.error(err);
});
bot.login(config.TOKEN)
