import { MessageEmbed } from "discord.js";
import { colors } from "./colors.js";

const error = (error) => (
  new MessageEmbed()
    .setTitle("Error")
    .addField("Info", error)
    .setColor(colors.red)
);

const success = (success) => (
  new MessageEmbed()
    .setTitle("Success")
    .addField("Info", success)
    .setColor(colors.green)
)


const embedUtils = {
  error,
  success,
}

export default embedUtils;
