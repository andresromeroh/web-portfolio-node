import { IBaseModel } from './IBaseModel.interface';

class Badge implements IBaseModel {
    id: string;

    title: string;

    image: string;

    information: string;

    constructor(badge: { id: string, title: string, image: string, information: string }) {
        this.id = badge.id;
        this.title = badge.title;
        this.image = badge.image;
        this.information = badge.information;
    }

    toString(): void {
        console.log(JSON.stringify(this, null, 4));
    }
}

export default Badge;
