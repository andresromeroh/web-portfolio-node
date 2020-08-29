import * as express from 'express';
import { Request, Response, Router } from 'express';
import HttpStatus from 'http-status-codes';
import IControllerBase from './IControllerBase.interface';
import BadgeService from '../services/badge.service';
import Badge from '../models/badge.model';
import cache from '../utils/cache';

class EmailController implements IControllerBase {
    public path: string = '/badges';

    public router: Router = express.Router();

    public service: BadgeService;

    constructor() {
        this.service = new BadgeService();
        this.initRoutes();
    }

    public initRoutes() {
        this.router.get('/badges', this.getAllBadges);
    }

    getAllBadges = async (req: Request, res: Response) => {
        try {
            const badges: Array<Badge> = await this.service.getAllBadges();
            cache.set(req.originalUrl, badges); // set redis cache
            return res.status(HttpStatus.OK).json(badges);
        } catch (error) {
            return res.status(error.code || HttpStatus.INTERNAL_SERVER_ERROR).json({
                error: error.message,
            });
        }
    }
}

export default EmailController;
