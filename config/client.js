require('dotenv').config()
const { Client, Collection } = require('discord.js');

module.exports = class extends Client {
	constructor() {
		super();

		this.commands = new Collection();

        this.queue = new Map();
        
        this.login(process.env.TOKEN)
	}
};


