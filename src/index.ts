import express from 'express';
import { Request, Response } from 'express';
import { PORT } from './config/constants';

const app = express();
app.use(express.json());

app.get('/', (req: Request, res: Response) => {
    res.status(200).send('<h1>Hello world typescript!</h1>');
});

app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
});