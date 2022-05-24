import { MessageEmbed } from "discord.js";
import { colors } from "./colors.js";

const error = (error) => (
  new MessageEmbed()
    .setTitle("Error")
    .addField("Stacktrace", error.stack)
    .setColor(colors.red)
);

export {
  error,
};
