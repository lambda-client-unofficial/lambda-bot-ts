import { Client, Interaction } from 'discord.js';

interface Command {
  name: string;
  description: string;
  options: Option[];
  run: (interaction: Interaction, client: Client) => Promise<void>;
}

interface Option {
  name: string;
  description: string;
  type: string;
  options: Option[];
}

export default Command;
