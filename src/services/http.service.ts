import { Headers } from 'node-fetch';

class HttpService {
    protected _url: string;

    protected headers: Headers = new Headers({
        Accept: 'application/json',
        'Content-Type': 'application/json',
    });

    public set url(url: string) {
        this._url = url;
    }

    public addHeader(name: string, value: string) {
        this.headers.set(name, value);
    }
}

export default HttpService;
