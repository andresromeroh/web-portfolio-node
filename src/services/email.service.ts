import { MailService } from '@sendgrid/mail';
import Email from '../models/email.model';

const TOKEN: string = process.env.SENDGRID_AUTH_TOKEN;

class EmailService {
    protected mail: MailService;

    constructor() {
        this.mail = new MailService();
        this.mail.setApiKey(TOKEN);
    }

    public async sendEmail(email: Email) {
        const response = await this.mail.send(email);
        return response;
    }
}

export default EmailService;
