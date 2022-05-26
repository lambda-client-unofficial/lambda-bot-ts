const { readdirSync } = require('fs');
require('colors');

module.exports = (client) => {
  const load = (dirs) => {
    const events = readdirSync(`${__dirname}/events/${dirs}/`).filter((d) => d.endsWith('js'));
    for (const file of events) {
      const evt = require(`${__dirname}/events/${dirs}/${file}`);
      const eName = file.split('.')[0];
      client.on(eName, evt.bind(null, client));
      console.log(`${'[Events]'.yellow} Loaded ${eName.green}.`);
    }
  };
  ['client', 'guild'].forEach((x) => load(x));
};
