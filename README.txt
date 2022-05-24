Create a config.js file with a following content in the project directory:

    export const discordToken = '';  // the token of the discord bot
    export const githubToken = '';   // personal access token on github, must have the "repo" scope
    export const prefix = '';        // the prefix of the bot
    export const capeRepo = {
        owner: ',                    // the owner of the cape repository
        repo: '',                    // the name of the cape repository
        path: '',                    // the path to the capes.json file
        branch: '',                  // the branch of the capes.json file
    }

Licensed under The Unlicense.