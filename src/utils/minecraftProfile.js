const axios = require('axios').default
const profile = async name => {
    const user = await axios.get(`https://api.mojang.com/users/profiles/minecraft/${name}`).then(user => user.data).catch(user => user)
    return user instanceof Error ? false : user.data
}
const names = async name => {
    const names = await axios.get(`https://api.mojang.com/user/profiles/${name}/names`).then(names => names.data).catch(names => names)
    return names instanceof Error ? false : names.data
}
const textures = async name => {
    const textures = JSON.parse(Buffer.from((await axios.get(`https://sessionserver.mojang.com/session/minecraft/profile/${name}`).then(textures => textures.data).catch(textures => textures)).data?.properties[0]?.value, 'base64').toString())
    return textures instanceof Error ? false : textures.data
}
const modules = {
    profile,
    names,
    textures,
}
module.exports = modules