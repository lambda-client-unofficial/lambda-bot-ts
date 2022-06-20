import { Octokit } from 'octokit';
import { defaultRepo } from '../../config';
import Issue from '../types/issue';

const octokit = new Octokit({
  auth: process.env.GITHUB_TOKEN,
});

const getIssue = async (owner: string | null, repo: string | null, issue_number: number): Promise<Issue> => (
  await octokit.request('GET /repos/{owner}/{repo}/issues/{issue_number}', {
    owner: owner ?? defaultRepo.owner,
    repo: repo ?? defaultRepo.repo,
    issue_number,
  })
).data as Issue;

export {
  // eslint-disable-next-line import/prefer-default-export
  getIssue,
};
