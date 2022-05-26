const { readdirSync } = require('fs');
require('colors');

module.exports = (client) => {
  const load = (dirs) => {
    const events = readdirSync(`${__dirname}/events/${dirs}/`).filter((d) => d.endsWith('js'));
    events.forEach((f) => {
      const evt = require(`${__dirname}/events/${dirs}/${file}`);
      const eName = f.split('.')[0];
      client.on(eName, evt.bind(null, client));
      console.log(`${'[Events]'.yellow} Loaded ${eName.green}.`);
    });
    ['client', 'guild'].forEach((x) => load(x));
  };
};
