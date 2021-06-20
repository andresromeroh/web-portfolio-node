import * as express from 'express';
import { Request, Response, Router } from 'express';
import HttpStatus from 'http-status-codes';
import { IBaseController } from './base.controller';
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
            const publicRepos: Repository[] = await this.service.getPublicRepositories();
            return res
                .status(HttpStatus.OK)
                .json(publicRepos)
                .locals.cache(publicRepos);
        } catch (error) {
            return res.status(error.code || HttpStatus.INTERNAL_SERVER_ERROR).json({
                error: error.message,
            });
        }
    }

    getTrendingRepos = async (req: Request, res: Response) => {
        try {
            const trendingRepos: Repository[] = await this.service.getTrendingRepositories();
            return res
                .status(HttpStatus.OK)
                .json(trendingRepos)
                .locals.cache(trendingRepos);
        } catch (error) {
            return res.status(error.code || HttpStatus.INTERNAL_SERVER_ERROR).json({
                error: error.message,
            });
        }
    }

    searchPublicRepos = async (req: Request, res: Response) => {
        try {
            const { text, page, pageSize } = req.query;
            const searchReq: IRepositorySearchRequest = {
                text: String(text),
                page: Number(page) || 1,
                pageSize: Number(pageSize) || 10,
                visibility: Visibility.Public,
            };
            const count: Number = await this.service.getPublicRepositoriesCount();
            const totalPages: Number = Math.ceil(Number(count) / Number(pageSize));
            const repositories: Repository[] = await this.service.searchPublicRepositories(searchReq);
            const paginationResponse: any = { repositories, page: Number(page), pages: totalPages };
            return res
                .status(HttpStatus.OK)
                .json(paginationResponse)
                .locals.cache(paginationResponse);
        } catch (error) {
            return res.status(error.code || HttpStatus.INTERNAL_SERVER_ERROR).json({
                error: error.message,
            });
        }
    }
}

export default RepositoryController;
