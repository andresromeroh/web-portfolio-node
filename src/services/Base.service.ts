class BaseService {
    protected baseUrl: string;
    protected headers: object = {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
    };

    constructor(url: string) {
        this.baseUrl = process.env[url];
    }
}

export default BaseService;