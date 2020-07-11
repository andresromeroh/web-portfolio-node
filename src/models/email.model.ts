import { v4 as uuidv4 } from 'uuid';
import { IBaseModel } from './IBaseModel.interface';

class Email implements IBaseModel {
    id: string;

    to: string;

    from: string;

    subject: string;

    text: string;

    html: string;

    constructor(email: { to: string, from: string, subject: string, text: string, html: string }) {
        this.id = uuidv4();
        this.to = email.to;
        this.from = email.from;
        this.subject = email.subject;
        this.text = email.text;
        this.html = email.html;
    }

    toString(): void {
        console.log(JSON.stringify(this, null, 4));
    }
}

export default Email;
