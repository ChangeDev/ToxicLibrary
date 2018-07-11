const { Command } = require('discord.js-commando')
const { stripIndents } = require('common-tags')
const { escapeMarkdown } = require('discord.js')
const {MessageEmbed} = require('discord.js');
const moment = require('moment');
const ToxicUtils = require('../../lib/ToxicUtils');

module.exports = class InfoCommand extends Command {
  constructor (client) {
    super(client, {
      name: 'info',
      memberName: 'info',
      group: 'general',
      description: 'Displays information about the bot.',
      aliases: [
        'about'
      ],
      clientPermissions: [
        'EMBED_LINKS'
      ],
      throttling: {
        usages: 2,
        duration: 10
      },
      guarded: true
    })
  }

  async run (message) {
    var dev
    try { dev = this.client.users.get('322203879208910849').tag } catch (e) { dev = 'Alexis M𝒱✘#7319 ' }

   const info = await message.client.getInfo();
   const linkLastCommit = `https://glitch.com/edit/#!/welcome-project/commit/${info.version}`;
 if (this.client.shard) {
      var data = [
        { name: 'totalMessagesSent', code: 'botStats.messagesSent' },
        { name: 'totalMessagesReceived', code: 'botStats.messagesReceived' },
        { name: 'totalClientMentions', code: 'botStats.clientMentions' },
        { name: 'totalCommandsUsed', code: 'botStats.commandsUsed' },
        { name: 'totalGuilds', code: 'guilds.size.toLocaleString()' },
        { name: 'totalChannels', code: 'channels.size.toLocaleString()' },
        { name: 'totalUsers', code: 'users.size.toLocaleString()' },
        { name: 'totalEmojis', code: 'emojis.size.toLocaleString()' }
      ]
         var stats = {}
      data.forEach(element => {
        this.client.shard.fetchClientValues(element.code).then(async results => {
          stats[element.name] = await results.reduce((prev, val) => prev + val, 0)
        })
      })
   }
    var totalGuilds; var totalChannels; var totalUsers
    if (!this.client.shard) {
      totalGuilds = await this.client.guilds.size.toLocaleString()
      totalChannels = await this.client.channels.size.toLocaleString()
      totalUsers = await this.client.users.size.toLocaleString()
    } else {
      var totalGuildsData = await this.client.shard.fetchClientValues('guilds.size.toLocaleString()')
      totalGuilds = await totalGuildsData.reduce((prev, val) => prev + val, 0)
      var totalChannelsData = await this.client.shard.fetchClientValues('channels.size.toLocaleString()')
      totalChannels = await totalChannelsData.reduce((prev, val) => prev + val, 0)
      var totalUsersData = await this.client.shard.fetchClientValues('users.size.toLocaleString()')
      totalUsers = await totalUsersData.reduce((prev, val) => prev + val, 0)
    }

    let embed = new MessageEmbed({
      author: {
        name: await this.client.fetchApplication().then(app => { return `${app.owner.tag} | ${this.client.user.tag}` }),
        icon_url: this.client.user.displayAvatarURL(),
        url: require(`${process.cwd()}/package.json`).homepageGithub
      },
      footer: {
        text: message.author.tag,
        icon_url: message.author.displayAvatarURL()
      },
      timestamp: new Date(),
      fields: [
        {
          'name': 'Developer',
          'value': stripIndents`
            Discord: **${escapeMarkdown(dev)}**
            GitHub: [\`@AlexisMV\`](http://github.com/AlexisMV)
          `,
          'inline': false
        },
        {
          'name': 'Developed In',
          'value': stripIndents`
            Language: **JavaScript** (NodeJS)
            Library: **discord.js** (v${require('discord.js/package.json').version})
            Framework: **discord.js-commando** (v${require('discord.js-commando/package.json').version})
            Bot Version: **${require(`${process.cwd()}/package.json`).version}**
          `,
          'inline': false
        },
        {
          'name': 'Links',
          'value': stripIndents`
           Bot Invite: [\`Click Here!\`](https://discordapp.com/oauth2/authorize?client_id=396505277261938689&scope=bot&permissions=2084043903)
            Server Invite: [\`Click Here!\`](https://discord.gg/RwmuHu6)
            Homepage: [\`Click Here!\`](https://yuukibot.github.io/)
            Repository: [\`Click Here!\`](https://github.com/AlexisMV/Ryuk-Bot)
          `,
          'inline': false
        },
        {
          'name': 'Discord Stats',
          'value': stripIndents`
            ${this.client.shard ? `Shards: **${this.client.shard.count}**\n` : ''}Guilds: **${totalGuilds}**
            Channels: **${totalChannels}**
            Users: **${totalUsers}**
          `,
          'inline': false
        },
          {
            'name': '✉ Messages',
            'value': !this.client.shard
              ? stripIndents`
              Sent: **${this.client.botStats.messagesSent}**
              Received: **${this.client.botStats.messagesReceived}**
              Commands: **${this.client.botStats.commandsUsed}**
              Bot Mentions: **${this.client.botStats.clientMentions}**
              `
              : stripIndents`
              Sent: **${this.client.botStats.messagesSent}** [${stats.totalMessagesSent}]
              Received: **${this.client.botStats.messagesReceived}** [${stats.totalMessagesReceived}]
              Commands: **${this.client.botStats.commandsUsed}** [${stats.totalCommandsUsed}]
              Bot Mentions: **${this.client.botStats.clientMentions}** [${stats.totalClientMentions}]
              `,
            'inline': true
          },
        {
          name: 'Version',
          value: info.version,
          inline: false
        },
        {
          name: 'Last Commit',
          value: `[Open](${linkLastCommit})`,
          inline: true
        }
         ],
      color: 0x7289DA
       }).setFooter(moment().format('LLLL'));

        if ('message' in info) {
            embed.addField('Last Commitmessage', info.message, false);
        }

        if ('timestamp' in info) {
            embed.addField('Committed', (moment(info.timestamp, 'YYYY-MM-DD HH:mm:ss Z').fromNow()), false);
        }
 message.channel.send({embed});
  }
  
}
