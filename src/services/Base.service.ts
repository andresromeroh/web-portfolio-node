import { Headers } from 'node-fetch';
import { config } from 'dotenv';

config();

class BaseService {
    protected url: string;

    protected headers: Headers = new Headers({
        Accept: 'application/json',
        'Content-Type': 'application/json',
    });

    constructor(url: string) {
        this.url = process.env[url];
    }

    public addHeader(name: string, value: string) {
        this.headers.set(name, value);
    }
}

export default BaseService;
