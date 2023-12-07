import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import generateID from '../helpers/generateID.js';

const VetSchema = new mongoose.Schema({
	name: {
		type: String,
		required: true,
		trim: true,
	},
	password: {
		type: String,
		required: true,
		trim: true,
	},
	email: {
		type: String,
		required: true,
		unique: true,
		trim: true,
	},
	phone: {
		type: String,
		required: true,
		unique: true,
		trim: true,
	},
	web: {
		type: String,
		default: null,
		trim: true,
	},
	token: {
		type: String,
		default: generateID,
	},
	confirmed: {
		type: Boolean,
		default: false,
	},
});

VetSchema.pre('save', async function (next) {
	if (!this.isModified('password')) {
		next();
	}

	const salt = await bcrypt.genSalt(10);
	this.password = await bcrypt.hash(this.password, salt);
});

VetSchema.methods.matchPassword = async function (password) {
	return await bcrypt.compare(password, this.password);
};

const Vet = mongoose.model('Vet', VetSchema);

export default Vet;
