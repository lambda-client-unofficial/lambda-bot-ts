const { Octokit } = require('@octokit/core');

const octokit = new Octokit({
  auth: process.env.GITHUB_TOKEN,
});

const listPlugins = () => octokit.request('GET /orgs/{org}/repos', { org: 'lambda-plugins' });

const pluginUtils = {
  listPlugins,
};

module.exports = pluginUtils;
