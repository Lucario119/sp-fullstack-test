import cors from 'cors';
import express from 'express';
import { connectDB } from './database/db';
import { searchRoute, uploadRoute } from './routes';

const app = express();
const port = process.env.PORT || 3000;

connectDB();
app.use(cors());
app.use(express.json());

app.use('/api/files', uploadRoute);
app.use('/api/users', searchRoute);


export { app, port };

