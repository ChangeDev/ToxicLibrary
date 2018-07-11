const { Command } = require('discord.js-commando');
const { stripIndents } = require('common-tags');

module.exports = class InviteCommand extends Command {
	constructor(client) {
		super(client, {
			name: 'invite',
			aliases: ['join'],
			group: 'general',
			memberName: 'invite',
			description: 'Responds with Ryuk\'s invite links.',
			guarded: true
		});
	}

	async run(msg) {
		const invite = await this.client.generateInvite(372632641);
		return msg.say(stripIndents`
			To invite me to your server, use this link:
			<${invite}>
			Or, join my home server:
			${this.client.options.invite || 'Coming soon...'}
		`);
	}
};
