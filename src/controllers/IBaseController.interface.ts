import { Router } from 'express';

export interface IBaseController {
    path: string;
    router: Router;
    initRoutes(): void;
}
