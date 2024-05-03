import express from 'express';
import { connectDB } from './database/db';
import { searchRoute, uploadRoute } from './routes';

const app = express();
const port = 3000;

connectDB();
app.use(express.json());

app.use('/api/files', uploadRoute);
app.use('/api/users', searchRoute);

export { app, port };

