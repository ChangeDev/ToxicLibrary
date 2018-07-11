# Base to create more commands

```js
const { Command } = require('discord.js-commando');
const { MessageEmbed,  escapeMarkdown } = require('discord.js');
const {  oneLineCommaListsAnd } = require('common-tags')

module.exports = class exampleCommand extends Command {
	constructor(client) {
		super(client, {
			name: 'example',
			aliases: ['first alias', 'second alias', 'third alias'],
			group: 'info',
			memberName: 'example',
			description: 'your description of the command',
			guildOnly: true,//true if used in a guild, false so that it is not used in a guild
			clientPermissions: ['EMBED_LINKS'],//the permissions that the bot must have for the command to be executed
      //These are the arguments type is the type of argument you want and key the name of the argument
			args: [
				{
					key: 'say',
					prompt: 'what do you want me to repeat?',
					type: 'string'
				}
			]
		});
	}//These are the permissions that the author must have to execute the command
   hasPermission(msg) {
        if(!msg.guild) return this.client.isOwner(msg.author);
        return msg.member.hasPermission('ADMINISTRATOR') || this.client.isOwner(msg.author);
    }
	run(msg, { say }) {  
  msg.channel.send(say)
	}
};
```
