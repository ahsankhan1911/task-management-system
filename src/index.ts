import 'reflect-metadata';

import { Request as ExpressRequest, Response as ExpressResponse } from 'express';
import dotenv from 'dotenv';

import { app } from './app';

//For env File 
dotenv.config();

const port = process.env.PORT || 8000;

app.get('/', (_req: ExpressRequest, res: ExpressResponse) => {
  res.send('Welcome to Task Management System');
});

app.listen(port, () => {
  console.log(`Task Management System server listening at ${ port }`);
});