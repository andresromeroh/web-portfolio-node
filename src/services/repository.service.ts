import fetch, { Response } from 'node-fetch';
import { config } from 'dotenv';
import Repository from '../models/repository.model';
import BaseService from './Base.service';

config();

const TOKEN: string = process.env.GITHUB_ACCESS_TOKEN;
const PUBLIC_VISIBILITY = 'public';
const PRIVATE_VISIBILITY = 'private';

class RepositoryService extends BaseService {
    constructor() {
        super('GITHUB_API_URL');
        this.addHeader('Authorization', `token ${TOKEN}`);
    }

    public async getAllRepositories(): Promise<Array<Repository>> {
        let githubRepositories: Array<Repository> = null;
        const response: Response = await fetch(`${this.url}/repos`, { headers: this.headers });

        if (response) {
            const json = await response.json();
            githubRepositories = json.map((repo: any) => new Repository(repo));
        }

        return githubRepositories;
    }

    public async getPublicRepositories(): Promise<Array<Repository>> {
        let githubRepositories: Array<Repository> = null;
        const query = this.getUrlQueryStringByVisibility(PUBLIC_VISIBILITY);
        const response: Response = await fetch(query, { headers: this.headers });

        if (response) {
            const json = await response.json();
            githubRepositories = json.map((repo: any) => new Repository(repo));
        }

        return githubRepositories;
    }

    public async getPrivateRepositories(): Promise<Array<Repository>> {
        let githubRepositories: Array<Repository> = null;
        const query = this.getUrlQueryStringByVisibility(PRIVATE_VISIBILITY);
        const response: Response = await fetch(query, { headers: this.headers });

        if (response) {
            const json = await response.json();
            githubRepositories = json.map((repo: any) => new Repository(repo));
        }

        return githubRepositories;
    }

    public async getTrendingRepositories(): Promise<Array<Repository>> { // Simple as I have no popular repos :(
        let githubRepositories: Array<Repository> = null;
        const query = this.getUrlQueryStringByVisibility(PUBLIC_VISIBILITY);
        const response: Response = await fetch(query, { headers: this.headers });

        if (response) {
            const json = await response.json();
            githubRepositories = json.map((repo: any) => new Repository(repo));
        }

        return githubRepositories?.filter((r) => r.stars > 0 || r.forks > 0 || r.watchers > 0);
    }

    private getUrlQueryStringByVisibility(visibility: string) {
        const paramsString: string = `affiliation=owner&sort=full_name&visibility=${visibility}`;
        const searchParams: URLSearchParams = new URLSearchParams(paramsString);
        return `${this.url}/repos?${searchParams}`;
    }
}

export default RepositoryService;
