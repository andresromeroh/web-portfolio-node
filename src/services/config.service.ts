import { ClientOpts } from 'redis';

enum AcclaimProfile {
    Url = 'ACCLAIM_PROFILE_URL',
    Badges = 'ACCLAIM_BADGE_URL'
}

enum RedisCredentials {
    Host = 'REDIS_HOST',
    Port = 'REDIS_PORT',
    Password = 'REDIS_PASSWORD',
}

enum GitHubCredentials {
    Url = 'GITHUB_API_URL',
    Token = 'GITHUB_ACCESS_TOKEN',
}

class ConfigService {
    private env: any;

    constructor() { this.env = process.env; }

    public getValue(key: string): string {
        return this.env[key];
    }

    public getRedisCredentias(): ClientOpts {
        return {
            host: this.env[RedisCredentials.Host],
            port: Number(this.env[RedisCredentials.Port]),
            password: this.env[RedisCredentials.Password],
        };
    }

    public getGitHubUrl(): string {
        return this.env[GitHubCredentials.Url];
    }

    public getGitHubToken(): string {
        return `token ${this.env[GitHubCredentials.Token]}`;
    }

    public getAcclaimProfile(): any {
        return {
            url: this.env[AcclaimProfile.Url],
            badges: this.env[AcclaimProfile.Badges],
        };
    }
}

export default ConfigService;
