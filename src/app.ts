import { router } from './app/routes';
import express, { Application } from 'express';
import cors from 'cors';

export const app: Application = express();

//Disable x-powered-by response header for appilcation security purpose
app.disable('x-powered-by');

//CORS config
app.use(cors());

//body parser middleware
app.use(express.json());
app.use(express.urlencoded({ extended : true }));

//API urls binded
app.use('/api', router);
