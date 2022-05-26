const axios = require('axios')
const checkuser = async(id = Number) => {
    try {
        const _ = await axios.get(`https://discordapp.com/api/v9/users/${id}`, {
            headers: {
                authorization: "Bot " + process.env.TOKEN
            }
        })
    } catch {
        return false
    }
    return true
}
module.exports = checkuser