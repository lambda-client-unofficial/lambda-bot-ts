const { readdirSync } = require('graceful-fs');
require('colors');

module.exports = (client) => {
  const load = (dirs) => {
    const events = readdirSync(`${__dirname}/events/${dirs}/`).filter((d) => d.endsWith('js'));
    events.forEach((file) => {
      // eslint-disable-next-line import/no-dynamic-require, global-require
      const evt = require(`${__dirname}/events/${dirs}/${file}`);
      const eName = file.split('.')[0];
      client.on(eName, evt.bind(null, client));
      // eslint-disable-next-line no-console
      console.log(`${'[Events]'.yellow} Loaded ${eName.green}.`);
    });
  };
  ['client', 'guild'].forEach((x) => load(x));
};
