const axios = require('axios').default
const profile = async name => {
    const user = await axios.get(`https://api.mojang.com/users/profiles/minecraft/${name}`).then(user => user?.data?.id).catch(user => user)
    return user instanceof Error ? false : user
}
const names = async name => {
    const names = await axios.get(`https://api.mojang.com/user/profiles/${name}/names`).then(names => names?.data).catch(names => names)
    return names instanceof Error ? false : names
}
const textures = async name => {
    let req = await axios.get(`https://sessionserver.mojang.com/session/minecraft/profile/${name}`).then(textures => textures?.data?.properties[0]?.value).catch(textures => textures)
    const textures = JSON.parse(Buffer.from(req, 'base64').toString()).textures?.SKIN?.url
    return textures instanceof Error ? false : textures
}
const modules = {
    profile,
    names,
    textures,
}
module.exports = modules