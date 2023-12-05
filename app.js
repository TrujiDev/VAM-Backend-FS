import express from 'express';
import connectDB from './config/db.js';

const app = express();

connectDB();

app.get('/', (req, res) => {
	res.send('Hello World!');
});

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
	console.log('Example app listening on port 4000!');
});
