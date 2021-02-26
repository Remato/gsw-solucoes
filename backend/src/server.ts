import 'reflect-metadata';

import express from 'express';

import './database';
import cors from 'cors';

import routes from './routes';

const app = express();

app.use(cors());
app.use(express.json());
app.use(routes);

app.listen(3333, () => {
  console.log('GSW Server started on https://localhost:3333');
});
