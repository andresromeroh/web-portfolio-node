import * as express from 'express';
import { Request, Response, Router } from 'express';
import HttpStatus from 'http-status-codes';
import IControllerBase from './IControllerBase.interface';
import Email from '../models/email.model';
import EmailService from '../services/email.service';
import { RECEIVER_NAME } from '../config/constants';

class EmailController implements IControllerBase {
    public path: string = '/email';

    public router: Router = express.Router();

    public service: EmailService;

    constructor() {
        this.service = new EmailService();
        this.initRoutes();
    }

    public initRoutes() {
        this.router.post('/email/send', this.sendEmail);
    }

    sendEmail = async (req: Request, res: Response) => {
        try {
            const sender = process.env.SENDGRID_SENDER_ADDRESS;
            const receiver = process.env.SENDGRID_RECEIVER_ADDRESS;

            const emailFields = {
                ...req.body,
                from: {
                    name: req.body.from,
                    email: sender,
                },
                to: {
                    name: RECEIVER_NAME,
                    email: receiver,
                },
            };

            const email = new Email(emailFields);

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
