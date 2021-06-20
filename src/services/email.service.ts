import { MailService } from '@sendgrid/mail';
import Email from '../models/email.model';
import ConfigService from './config.service';

class EmailService {
    protected mail: MailService;
    private configService: ConfigService = new ConfigService();

    constructor() {
        this.mail = new MailService();
        this.mail.setApiKey(this.configService.getValue('SENDGRID_AUTH_TOKEN'));
    }

    public async sendEmail(email: Email) {
        return this.mail.send(email);
    }

    public createEmailContent(fields: any): Email {
        const template = this.configService.getValue('SENDGRID_TEMPLATE_ID');
        const sender = this.configService.getValue('SENDGRID_SENDER_ADDRESS');
        const receiver = this.configService.getValue('SENDGRID_RECEIVER_ADDRESS');

        const { subject, from, text } = fields;

        return new Email({
            subject,
            from: {
                name: from,
                email: sender,
            },
            to: {
                name: 'ANDRESROMERO.DEV',
                email: receiver,
            },
            templateId: template,
            dynamicTemplateData: { from, subject, text },
        });
    }
}

export default EmailService;
