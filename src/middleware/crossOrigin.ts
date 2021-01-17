import cors from 'cors';

const whitelist = process.env.CORS_WITHELIST.split(',');

const corsOptions = {
    origin: (origin: any, callback: any) => {
        if (whitelist.indexOf(origin) !== -1
            || process.env.NODE_ENV === 'development') {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    },
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    optionsSuccessStatus: 204,
};

const crossOriginMiddleware = cors(corsOptions);

export default crossOriginMiddleware;
