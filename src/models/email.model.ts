import { v4 as uuidv4 } from 'uuid';
import { EmailData } from '@sendgrid/helpers/classes/email-address';
import { IBaseModel } from './base.model';

class Email implements IBaseModel {
    public id: string;
    public to: EmailData;
    public from: EmailData;
    public subject: string;
    public templateId: string;
    public dynamicTemplateData?: { [key: string]: any };

    constructor(email: {
        to: EmailData,
        from: EmailData,
        subject: string,
        templateId: string,
        dynamicTemplateData: {}
    }) {
        this.id = uuidv4();
        this.to = email.to;
        this.from = email.from;
        this.subject = email.subject;
        this.templateId = email.templateId;
        this.dynamicTemplateData = email.dynamicTemplateData;
    }

    toString(): void {
        console.log(JSON.stringify(this, null, 4));
    }
}

export default Email;
