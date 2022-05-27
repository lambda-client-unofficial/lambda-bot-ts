Create a config.js file with a following content in the project directory:

    export const capeRepo = {
        owner: '',                    // the owner of the cape repository
        repo: '',                    // the name of the cape repository
        path: '',                    // the path to the capes.json file
        branch: '',                  // the branch of the capes.json file
    }

Then add these variables in your process enviroment:

    TOKEN="discord bot token"
    BOT_ID="discord bot id"
    GITHUB_ID="github token with repository access"

Licensed under The Unlicense.
