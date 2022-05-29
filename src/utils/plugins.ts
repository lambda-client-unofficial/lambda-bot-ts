import { Octokit } from 'octokit';

const octokit = new Octokit({
  auth: process.env.GITHUB_TOKEN,
});

const listPlugins = async() => { 
  const data = await octokit.request('GET /orgs/{org}/repos', { org: 'lambda-plugins' })
  return data
};

const pluginUtils = {
  listPlugins,
};

export default pluginUtils;
