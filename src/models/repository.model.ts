import { v4 as uuidv4 } from 'uuid';
import { IBaseModel } from './base.model';

class Repository implements IBaseModel {
    public id: string;
    public githubId: number;
    public name: string;
    public fullName: string;
    public description: string;
    public private: boolean;
    public htmlUrl: string;
    public language: string;
    public stars: number;
    public forks: number;
    public watchers: number;
    public createdAt: Date;
    public updatedAt: Date;

    constructor(repository: {
        id: number, name: string, full_name: string, description: string,
        private: boolean, html_url: string, language: string, stargazers_count: number,
        forks_count: number, watchers_count: number, created_at: Date, updated_at: Date
    }) {
        this.id = uuidv4();
        this.githubId = repository.id;
        this.name = repository.name;
        this.fullName = repository.full_name;
        this.description = repository.description;
        this.private = repository.private;
        this.htmlUrl = repository.html_url;
        this.language = repository.language;
        this.stars = repository.stargazers_count;
        this.forks = repository.forks_count;
        this.watchers = repository.watchers_count;
        this.createdAt = repository.created_at;
        this.updatedAt = repository.updated_at;
    }

    toString(): void {
        console.log(JSON.stringify(this, null, 4));
    }
}

export default Repository;
