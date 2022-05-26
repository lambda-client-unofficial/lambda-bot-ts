const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v10');
const { readdirSync } = require('fs');
const path = require('path');
require('colors');


const commands = []
readdirSync(__dirname+"/\/commands/").map(async cmd => {
	commands.push(require(path.join(__dirname, `/\/commands/${cmd}`)))
})
const rest = new REST({ version: "10" }).setToken(process.env.TOKEN);
module.exports = async(client) => {
	try {
		console.log('[Discord API] Started refreshing application (/) commands.'.yellow);
		client.guilds.cache.forEach(async (guild) => {
			try {
			await rest.put(Routes.applicationGuildCommands(process.env.BOT_ID, guild.id),
				{ body: commands },
			) 
			} catch (e){
				console.log(e)
				if(e.status != 403) console.log(e)
			}
			
})
		console.log('[Discord API] Successfully reloaded application (/) commands.'.green);
	} catch (error) {
		console.log(error)
	}
}

