import { Octokit } from '@octokit/core';
import * as config from '../../config.js';

const octokit = new Octokit({
  auth: config.githubToken,
});

const listPlugins = async () => {
  octokit.request('GET /orgs/{org}/repos', {
    org: 'lambda-plugins',
  }).then((res) => res);
};

const pluginUtils = {
  listPlugins,
};

export default pluginUtils;
