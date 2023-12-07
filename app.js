import express from 'express';
import connectDB from './config/db.js';
import vetRoutes from './routes/vetRoutes.js';

const app = express();

app.use(express.json());

connectDB();

app.use('/api/vets', vetRoutes);

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
	console.log('Example app listening on port 4000!');
});
