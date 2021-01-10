import * as express from 'express';
import { Request, Response, Router } from 'express';
import HttpStatus from 'http-status-codes';
import { IBaseController } from './IBaseController.interface';
import Repository from '../models/repository.model';
import { RepositoryService, IRepositorySearchRequest, Visibility } from '../services/repository.service';

class RepositoryController implements IBaseController {
    public path: string = '/repositories';

    public router: Router = express.Router();

    public service: RepositoryService;

    constructor() {
        this.service = new RepositoryService();
        this.initRoutes();
    }

    public initRoutes() {
        this.router.get(`${this.path}/public`, this.getPublicRepos);
        this.router.get(`${this.path}/trending`, this.getTrendingRepos);
        this.router.post(`${this.path}/search`, this.searchPublicRepos);
    }

    getPublicRepos = async (req: Request, res: Response) => {
        try {
            const publicRepos: Array<Repository> = await this.service.getPublicRepositories();
            return res.status(HttpStatus.OK).json(publicRepos);
        } catch (error) {
            return res.status(error.code || HttpStatus.INTERNAL_SERVER_ERROR).json({
                error: error.message,
            });
        }
    }

    getTrendingRepos = async (req: Request, res: Response) => {
        try {
            const trendingRepos: Array<Repository> = await this.service.getTrendingRepositories();
            return res.status(HttpStatus.OK).json(trendingRepos);
        } catch (error) {
            return res.status(error.code || HttpStatus.INTERNAL_SERVER_ERROR).json({
                error: error.message,
            });
        }
    }

    searchPublicRepos = async (req: Request, res: Response) => {
        try {
            const searchReq: IRepositorySearchRequest = {
                text: String(req.query.text),
                page: Number(req.query.pageNumber) || 1,
                pageSize: Number(req.query.pageSize) || 10,
                visibility: Visibility.Public,
            };
            const publicRepos: Array<Repository> = await this.service.searchPublicRepositories(searchReq);
            return res.status(HttpStatus.OK).json(publicRepos);
        } catch (error) {
            return res.status(error.code || HttpStatus.INTERNAL_SERVER_ERROR).json({
                error: error.message,
            });
        }
    }
}

export default RepositoryController;
