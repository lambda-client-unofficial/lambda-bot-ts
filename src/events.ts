import { Client } from 'discord.js';
import { scanEvents } from './shared/events';

const resgisterEvents = (client: Client) => {
  ['client', 'guild'].map((x) => scanEvents(client, x));
};

export default resgisterEvents;
