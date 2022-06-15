import { Client, CommandInteraction } from 'discord.js';

interface Command {
  name: string;
  description: string;
  timeout: number;
  options: Option[];
  run: (interaction: CommandInteraction, client: Client) => Promise<void>;
}

interface Option {
  name: string;
  description: string;
  type: string;
  options: Option[];
}

export default Command;
