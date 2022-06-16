import { Client } from 'discord.js';
import { scanEvents } from './eventsLoader';

const resgisterEvents = (client: Client) => {
  [/* 'client', */'guild'].map((x) => scanEvents(client, x));
};

export default resgisterEvents;
