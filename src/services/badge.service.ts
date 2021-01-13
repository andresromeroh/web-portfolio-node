import fetch, { Response } from 'node-fetch';
import cheerio from 'cheerio';
import Badge from '../models/badge.model';

const PROFILE_URL: string = process.env.ACCLAIM_PROFILE_URL;
const BADGE_URL: string = process.env.ACCLAIM_BADGE_URL;

class BadgeService {
    protected $: any;

    constructor() {
        this.$ = null;
    }

    private async getAllBadges(): Promise<Array<Badge>> {
        const response: Response = await fetch(PROFILE_URL);
        const html: string = await response.text();
        const badges: Array<Badge> = [];

        this.$ = cheerio.load(html);

        this.$('.cr-public-earned-badge-grid-item').each((i: any, badge: any) => {
            const { title, href } = badge.attribs;
            const id = href.split('/')[2];
            const image = this.$(badge).find('div img').attr('src');
            const information = `${BADGE_URL}/${id}`;
            badges.push({
                id,
                title,
                image,
                information,
            });
        });

        return badges;
    }

    public async getAllNonExpiredBadges(): Promise<Array<Badge>> {
        const badges: Array<Badge> = await this.getAllBadges();
        const nonExpired: Array<Badge> = [];
        for (const badge of badges) {
            const informationReponse: Response = await fetch(badge.information);
            const informationHtml: string = await informationReponse.text();
            const informationUI = cheerio.load(informationHtml);

            const expiredText = informationUI('.cr-badge-banner-expires-at-text--expired').text();

            if (!expiredText.toLowerCase().includes('expired')) {
                nonExpired.push(badge);
            }
        }
        return nonExpired;
    }
}

export default BadgeService;
