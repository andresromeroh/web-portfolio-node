import * as express from 'express';
import { Request, Response, Router } from 'express';
import HttpStatus from 'http-status-codes';
import { IBaseController } from './base.controller';
import Email from '../models/email.model';
import EmailService from '../services/email.service';

class EmailController implements IBaseController {
    public path: string = '/email';
    public router: Router = express.Router();
    public service: EmailService;

    constructor() {
        this.service = new EmailService();
        this.initRoutes();
    }

    public initRoutes() {
        this.router.post(`${this.path}/send`, this.sendEmail);
    }

    sendEmail = async (req: Request, res: Response) => {
        try {
            const email: Email = this.service.createEmailContent(req.body);
            if (email != null) {
                const emailResponse = await this.service.sendEmail(email);
                return res.status(HttpStatus.OK).json(emailResponse);
            }
            return res.status(HttpStatus.BAD_REQUEST).end();
        } catch (error) {
            return res.status(error.code || HttpStatus.INTERNAL_SERVER_ERROR).json({
                error: error.message,
            });
        }
    }
}

export default EmailController;
