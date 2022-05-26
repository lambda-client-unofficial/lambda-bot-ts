const uuidUtils = require('./uuid');

const check = async (data = JSON) => {
  const template = {
    id: data?.discordId ?? null,
    capes: [
      {
        player_uuid: uuidUtils.format(data?.capes[0]?.player_uuid ?? null),
        type: data?.capes[0]?.type ?? null,
        color: {
          primary: data?.capes[0]?.color?.primary ?? null,
          border: data?.capes[0]?.color?.border ?? null,
        },
      },
    ],
    is_premium: data?.is_premium ?? null,
  };
  if (JSON.stringify(template).indexOf('null') !== -1) {
    return template == JSON ? template : false;
  }

  throw 'Invalid JSON Body';
};

module.exports = check;
