import * as express from 'express';
import { Request, Response, Router } from 'express';
import HttpStatus from 'http-status-codes';
import IControllerBase from './IControllerBase.interface';
import Repository from '../models/repository.model';
import RepositoryService from '../services/repository.service';
// import cache from '../utils/cache';

class RepositoryController implements IControllerBase {
    public path: string = '/repositories';

    public router: Router = express.Router();

    public service: RepositoryService;

    constructor() {
        this.service = new RepositoryService();
        this.initRoutes();
    }

    public initRoutes() {
        this.router.get('/repositories/public', this.getPublicRepos);
        this.router.get('/repositories/trending', this.getTrendingRepos);
    }

    getPublicRepos = async (req: Request, res: Response) => {
        try {
            const privateRepos: Array<Repository> = await this.service.getPublicRepositories();
            // cache.set(req.originalUrl, privateRepos); // set redis cache
            return res.status(HttpStatus.OK).json(privateRepos);
        } catch (error) {
            return res.status(error.code || HttpStatus.INTERNAL_SERVER_ERROR).json({
                error: error.message,
            });
        }
    }

    getTrendingRepos = async (req: Request, res: Response) => {
        try {
            const trendingRepos: Array<Repository> = await this.service.getTrendingRepositories();
            // cache.set(req.originalUrl, trendingRepos); // set redis cache
            return res.status(HttpStatus.OK).json(trendingRepos);
        } catch (error) {
            return res.status(error.code || HttpStatus.INTERNAL_SERVER_ERROR).json({
                error: error.message,
            });
        }
    }
}

export default RepositoryController;
