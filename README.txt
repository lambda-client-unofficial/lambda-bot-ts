Usage
====================
Create a config.ts file with a following content in the project directory:

    export const capeRepo = {
        owner: '',                    // the owner of the cape repository
        repo: '',                    // the name of the cape repository
        path: '',                    // the path to the capes.json file
        branch: '',                  // the branch of the capes.json file
    }

Then add these variables in your process enviroment, or your .env file:

    TOKEN="discord bot token"
    BOT_ID="discord bot id"
    GITHUB_ID="github token with repository access"

You can then run the bot by executing:

    pnpm dev

If you do not want to use pnpm, you can run this instead:

    npm run build && npm run run        // for node
    yarn build && yarn run              // for yarn


Notes for Contributing
====================
The recommended package manager is pnpm.
When writing commit messages, use the Conventional Commits[1] format.
Lint and format your code using eslint[2] and editorconfig[2] before committing.


License
====================
Licensed under The Unlicense.


[1]: https://www.conventionalcommits.org/en/v1.0.0/
[2]: https://eslint.org/docs/user-guide/integrations
[3]: https://editorconfig.org/#download
