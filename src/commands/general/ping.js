const {Command} = require('discord.js-commando');
const Discord = require('discord.js');
const moment = require('moment');
const ToxicUtils = require('../../lib/ToxicUtils');

module.exports = class RankCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'ping',
            aliases: ['pong', 'peng', 'api'],
            group: 'general',
            memberName: 'ping',
            description: 'It shows the ping of the bot and the discord api',
            examples: ['ping'],
            throttling: {
                usages: 1,
                duration: 1800
            }
        });
    }

    async run(message) {
        let ping = Math.floor(message.client.ping);
    message.channel.send(":ping_pong: Pong!").then(m => {

        let embed = new Discord.MessageEmbed()
     .addField(`:incoming_envelope: Ping Mensajes: `, `${m.createdTimestamp - message.createdTimestamp} ms`, true)
     .addField(`:satellite_orbital: Ping DiscordAPI:` , `${ping} ms`, true)
        m.edit({embed});
    })
  }
}
