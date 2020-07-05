import BaseService from "./Base.service";
import fetch from 'node-fetch';
import Repository from '../models/repository.model'

const TOKEN = process.env.GITHUB_ACCESS_TOKEN;

class RepositoryService extends BaseService {
    constructor() {
        super('GITHUB_API_URL');
        this.addHeader('Authorization', `token ${TOKEN}`);
    }

    public async getAllRepositories() {
        const response = await fetch(`${this.url}/repos`, { headers: this.headers });
        const repositories = (await response.json()).map((repo: any) => new Repository(repo));

        return repositories;
    }

    public async getAllPublicRepositories() {
        const paramsString = "visibility=public&affiliation=owner&sort=full_name";
        const searchParams = new URLSearchParams(paramsString);
        
        const response = await fetch(`${this.url}/repos?${searchParams}`, { headers: this.headers });
        const repositories = (await response.json()).map((repo: any) => new Repository(repo));

        return repositories;
    }
}

export default RepositoryService;