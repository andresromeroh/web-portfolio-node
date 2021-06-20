import cheerio from 'cheerio';
import fetch, { Response } from 'node-fetch';
import Badge from '../models/badge.model';
import ConfigService from './config.service';

enum HtmlElement {
    EarnedBadge = '.cr-public-earned-badge-grid-item',
    BadgeExpire = '.cr-badge-banner-expires-at-text--expired',
}

class BadgeService {
    protected _$: any = null;
    protected configService: ConfigService = new ConfigService();

    public async getAllBadges(): Promise<Badge[]> {
        const badges: Badge[] = [];

        const profile = this.configService.getAcclaimProfile();
        const response: Response = await fetch(profile.url);

        this._$ = cheerio.load(await response.text());

        this._$(HtmlElement.EarnedBadge).each((i: any, badge: any) => {
            const { title, href } = badge.attribs;
            const id = href.split('/')[2];

            const image = this._$(badge).find('div img').attr('src');
            const information = `${profile.badges}/${id}`;

            badges.push({
                id, title, image, information,
            });
        });

        return badges;
    }

    public async getAllNonExpiredBadges(): Promise<Badge[]> {
        const badges: Badge[] = await this.getAllBadges();
        const nonExpired: Badge[] = [];
        for (const badge of badges) {
            const informationReponse: Response = await fetch(badge.information);
            const informationHtml: string = await informationReponse.text();
            const informationUI = cheerio.load(informationHtml);

            const expiredText = informationUI(HtmlElement.BadgeExpire).text();

            if (!expiredText.toLowerCase().includes('expired')) {
                nonExpired.push(badge);
            }
        }
        return nonExpired;
    }
}

export default BadgeService;
