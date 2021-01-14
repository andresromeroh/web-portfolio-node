import fetch, { Response } from 'node-fetch';
import Repository from '../models/repository.model';
import BaseService from './Base.service';

const TOKEN: string = process.env.GITHUB_ACCESS_TOKEN;

export enum Visibility {
    Public = 'public',
    Private = 'private',
}

export interface IRepositorySearchRequest {
    text: string;
    page: number;
    pageSize: Number;
    visibility: Visibility;
}

export class RepositoryService extends BaseService {
    constructor() {
        super('GITHUB_API_URL');
        this.addHeader('Authorization', `token ${TOKEN}`);
    }

    public async getAllRepositories(): Promise<Repository[]> {
        let githubRepositories: Repository[] = null;
        const response: Response = await fetch(`${this.url}/repos`, { headers: this.headers });

        if (response) {
            const json = await response.json();
            githubRepositories = json.map((repo: any) => new Repository(repo));
        }

        return githubRepositories;
    }

    public async getPublicRepositories(): Promise<Repository[]> {
        let githubRepositories: Repository[] = null;
        const query = this.getQueryStringByVisibility(Visibility.Public);
        const response: Response = await fetch(query, { headers: this.headers });

        if (response) {
            const json = await response.json();
            githubRepositories = json.map((repo: any) => new Repository(repo));
        }

        return githubRepositories;
    }

    public async getPrivateRepositories(): Promise<Repository[]> {
        let githubRepositories: Repository[] = null;
        const query = this.getQueryStringByVisibility(Visibility.Private);
        const response: Response = await fetch(query, { headers: this.headers });

        if (response) {
            const json = await response.json();
            githubRepositories = json.map((repo: any) => new Repository(repo));
        }

        return githubRepositories;
    }

    public async getTrendingRepositories(): Promise<Repository[]> {
        let githubRepositories: Repository[] = null;
        const query = this.getQueryStringByVisibility(Visibility.Public);
        const response: Response = await fetch(query, { headers: this.headers });

        if (response) {
            const json = await response.json();
            githubRepositories = json.map((repo: any) => new Repository(repo));
        }

        return githubRepositories?.filter((r) => r.stars > 0 || r.forks > 0 || r.watchers > 0);
    }

    public async searchPublicRepositories(searchReq: IRepositorySearchRequest): Promise<Repository[]> {
        let githubRepositories: Repository[] = null;
        const {
            text, page, pageSize, visibility,
        } = searchReq;

        const query = this.getPaginationQueryString(page, pageSize, visibility);
        const response: Response = await fetch(query, { headers: this.headers });

        if (response) {
            const json = await response.json();
            githubRepositories = json.map((repo: any) => new Repository(repo));
        }

        if (githubRepositories && githubRepositories.length) {
            return githubRepositories.filter((r) => {
                const txtLowerCase = text.toLowerCase();
                return r.name.toLowerCase().includes(txtLowerCase)
                    || r.description.toLowerCase().includes(txtLowerCase)
                    || r.language.toLowerCase().includes(txtLowerCase);
            });
        }

        return githubRepositories;
    }

    public async getPublicRepositoriesCount(): Promise<Number> {
        const githubRepositories: Repository[] = await this.getPublicRepositories();
        return githubRepositories.length;
    }

    private getQueryStringByVisibility(visibility: string) {
        const paramsString: string = `affiliation=owner&sort=full_name&visibility=${visibility}`;
        const searchParams: URLSearchParams = new URLSearchParams(paramsString);
        return `${this.url}/repos?${searchParams}`;
    }

    private getPaginationQueryString(page: Number, pageSize: Number, visibility: Visibility) {
        const paramsString: string =
            `per_page=${pageSize}&page=${page}&affiliation=owner&sort=full_name&visibility=${visibility}`;
        const searchParams: URLSearchParams = new URLSearchParams(paramsString);
        return `${this.url}/repos?${searchParams}`;
    }
}
