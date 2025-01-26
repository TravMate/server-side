import express, { Request, Response } from 'express';
import connectToMongoDB from './db';
import routerGuide from './routes/tourguideRoute';

const app = express();
import dotenv from 'dotenv';

dotenv.config();

import cors from 'cors';


app.use(express.json());
app.use(cors());
connectToMongoDB();



app.use('/', routerGuide);
app.get('/', (req: Request, res: Response) => {
    res.send('Hello, TypeScript with Express!');
});

app.listen(process.env.PORT, () => {
    console.log(`Server is running on http://localhost:${process.env.PORT}`);
});

