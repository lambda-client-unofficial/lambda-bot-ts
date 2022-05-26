const { EmbedBuilder, ActionRowBuilder, ButtonBuilder } = require('discord.js')
const embedUtils = require("../utils/embed.js")
const axios = require("axios").default
const timestampToDate = require('timestamp-to-date');

 module.exports = {
   name: "lookup",
   description: "dLookup",
   options: [
     {
        name: "name",
        description: "The name of the user to lookup",
        type: 1,
        options: [
          {
            name: "username",
            description: "The username of the user to lookup",
            type: 3
          },
        ]
     },

   ],


   run: async(interaction) => {
    for(let index of interaction.options.data){
      switch(index.name){
        case "name": {
          const username = interaction.options.getString("username")
          const _ = (await axios.get(`https://api.mojang.com/users/profiles/minecraft/${username}`)).data
          if(!_.name || !_.id) return interaction.reply({ embeds: [embedUtils.error('No user found.')] })
          const names = (await axios.get(`https://api.mojang.com/user/profiles/${_.id}/names`)).data
          const textures = JSON.parse(Buffer.from((await axios.get(`https://sessionserver.mojang.com/session/minecraft/profile/${_.id}`)).data?.properties[0]?.value, "base64").toString())
          

          const embed = new EmbedBuilder()
          .setTitle(`${username}'s UUID`)
          .addFields([{ name: "UUID:", value: _.id }])
          .setImage(`https://crafatar.com/renders/body/${_.id}?overlay`)
          .setColor("Blue");
          try {
            
          names.forEach((name) => {
            let _ = timestampToDate(name.changedToAt,'yyyy-MM-dd HH:mm:ss');if(_.toLowerCase().includes('nan')) _ = "First Appeared Name"
            embed.addFields([{ name: name.name??"Unknown", value: _??"First Appeared Name"}])
          })
        } catch (e) {
          console.log(e)
        }
          const row = new ActionRowBuilder().addComponents([
            new ButtonBuilder()
              .setStyle('Link')
              .setURL(textures.textures.SKIN.url)
              .setLabel('Player skin')
          ]).addComponents([
            new ButtonBuilder()
            .setStyle('Link')
            .setURL(`https://namemc.com/search?q=${_.name}`)
            .setLabel('NameMC')
          ])
          return await interaction.reply({ embeds: [embed], components: [row]})
        }
      }
    }
   }
 }

