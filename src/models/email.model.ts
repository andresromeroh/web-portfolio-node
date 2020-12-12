import { v4 as uuidv4 } from 'uuid';
import { EmailData } from '@sendgrid/helpers/classes/email-address';
import { IBaseModel } from './IBaseModel.interface';

class Email implements IBaseModel {
    id: string;

    to: EmailData;

    from: EmailData;

    subject: string;

    text: string;

    // html?: string;

    constructor(email: { to: EmailData, from: EmailData, subject: string, text: string }) {
        this.id = uuidv4();
        this.to = email.to;
        this.from = email.from;
        this.subject = email.subject;
        this.text = email.text;
        // this.html = email.html;
    }

    toString(): void {
        console.log(JSON.stringify(this, null, 4));
    }
}

export default Email;
