const { EmbedBuilder } = require('discord.js')
const axios = require('axios').default
const size = require('../utils/bytes')

module.exports = {
    name: "plugins",
    description: "Check plugin list",
    timeout: 300000,

    run: async (interaction) => {
        let pluginList = []
        let plugins = (await axios.get("https://api.github.com/users/lambda-plugins/repos", {
            headers: {
                Authorization: "Bearer " + process.env.GITHUB_TOKEN
            }
        })).data
        plugins.forEach(plugin => {
            pluginList.push({
                name: plugin?.name,
                stargazers: plugin?.stargazers_count,
                watchers: plugin?.watchers_count,
                issues: `[Issues](plugin?.issues_url)`,
                url: `[Repo URL](${plugin?.html_url})`,
                size: plugin?.size
            })
        })
        let _ = new EmbedBuilder().setTitle("Plugins Informations")
        pluginList.forEach((plugin) => {
            _.addFields([{
                name: plugin.name, value:
                    `Stargazers: ${plugin.stargazers}\n
                Watchers: ${plugin.watchers}\n
                Issues: ${plugin.issues}\n
                Size: ${size(plugin.size)}\n
                ${plugin.url}`, inline: true
            }])
        })
        return await interaction.reply({ embeds: [_] })
    }
}