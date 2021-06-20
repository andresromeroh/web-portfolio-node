import * as express from 'express';
import { Request, Response, Router } from 'express';
import HttpStatus from 'http-status-codes';
import { IBaseController } from './base.controller';
import BadgeService from '../services/badge.service';
import Badge from '../models/badge.model';

class EmailController implements IBaseController {
    public path: string = '/badges';
    public router: Router = express.Router();
    public service: BadgeService;

    constructor() {
        this.service = new BadgeService();
        this.initRoutes();
    }

    public initRoutes() {
        this.router.get(`${this.path}/`, this.getAllBadges);
        this.router.get(`${this.path}/non-expired`, this.getAllNonExpiredBadges);
    }

    getAllBadges = async (req: Request, res: Response) => {
        try {
            const badges: Badge[] = await this.service.getAllBadges();
            return res
                .status(HttpStatus.OK)
                .json(badges)
                .locals.cache(badges);
        } catch (error) {
            return res.status(error.code || HttpStatus.INTERNAL_SERVER_ERROR).json({
                error: error.message,
            });
        }
    }

    getAllNonExpiredBadges = async (req: Request, res: Response) => {
        try {
            const badges: Badge[] = await this.service.getAllNonExpiredBadges();
            return res
                .status(HttpStatus.OK)
                .json(badges)
                .locals.cache(badges);
        } catch (error) {
            return res.status(error.code || HttpStatus.INTERNAL_SERVER_ERROR).json({
                error: error.message,
            });
        }
    }
}

export default EmailController;
