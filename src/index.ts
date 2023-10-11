import { Request, Response } from 'express';
import dotenv from 'dotenv';

import { app } from './app';

//For env File 
dotenv.config();

const port = process.env.PORT || 8000;

app.get('/', (_req: Request, res: Response) => {
  res.send('Welcome to Task Management System');
});

app.listen(port, () => {
  console.log(`Task Management System server listening at ${ port }`);
});