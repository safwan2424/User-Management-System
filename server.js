import express from 'express';
import dotenv from 'dotenv';
import morgan from 'morgan';
import bodyParser from 'body-parser';
import path from 'path';
import { fileURLToPath } from 'url';
import connectDB from './server/database/connection.js';
import router from './server/routes/router.js';
import cors from 'cors';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

// Load environment variables from config.env file
dotenv.config({ path: 'config.env' });
const PORT = process.env.PORT || 3000;


app.use(cors({
  origin: 'http://localhost:5173',
  methods: 'GET,POST,PUT,DELETE',
  credentials: true
}));
app.use(morgan('tiny'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Connect to MongoDB
connectDB();




app.set('view engine', 'ejs');


app.use('/api', router);

app.get('/', (req, res) => {
    res.send('Welcome to the API!');
});


app.use((req, res) => {
    res.status(404).send({ message: "404 Not Found" });
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});


