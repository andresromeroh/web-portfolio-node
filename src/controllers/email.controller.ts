import * as express from 'express';
import { Request, Response, Router } from 'express';
import HttpStatus from 'http-status-codes';
import IControllerBase from './IControllerBase.interface';
import Email from '../models/email.model';
import EmailService from '../services/email.service';

class EmailController implements IControllerBase {
    public path: string = '/emails';

    public router: Router = express.Router();

    public service: EmailService;

    constructor() {
        this.service = new EmailService();
        this.initRoutes();
    }

    public initRoutes() {
        this.router.post('/emails/send', this.sendEmail);
    }

    sendEmail = async (req: Request, res: Response) => {
        try {
            const { body } = req;
            const email = new Email(body);

            if (!email || email instanceof Email) {
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
