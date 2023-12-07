import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

/**
 * Connects to the MongoDB database using the provided MONGO_URI.
 * @returns {Promise<void>} A promise that resolves when the connection is established.
 */
const connectDB = async () => {
	try {
		const conn = await mongoose.connect(process.env.MONGO_URI);

		console.log(`MongoDB Connected: ${conn.connection.host}`);
	} catch (error) {
		console.error(`Error: ${error.message}`);
		process.exit(1);
	}
};

export default connectDB;
