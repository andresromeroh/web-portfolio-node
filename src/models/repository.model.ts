import { IBaseModel } from './IBaseModel.interface';

class Repository implements IBaseModel {
    id: number;
    name: string;
    fullName: string;
    private: boolean;
    htmlUrl: string;
    language: string;
    createdAt: Date;
    updatedAt: Date;

    constructor(repository: {
        id: number, name: string, full_name: string, private: boolean,
        html_url: string, language: string, created_at: Date, updated_at: Date
    }) {
        this.id = repository.id;
        this.name = repository.name;
        this.fullName = repository.full_name;
        this.private = repository.private;
        this.htmlUrl = repository.html_url;
        this.language = repository.language;
        this.createdAt = repository.created_at;
        this.updatedAt = repository.updated_at;
    }

    toString(): void {
        console.log(JSON.stringify(this, null, 4));
    }
}

export default Repository;