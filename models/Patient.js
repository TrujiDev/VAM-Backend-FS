import mongoose from 'mongoose';

const patientSchema = new mongoose.Schema(
	{
		name: {
			type: String,
			required: true,
			trim: true,
		},
		owner: {
			type: String,
			required: true,
			trim: true,
		},
		email: {
			type: String,
			required: true,
			trim: true,
		},
		date: {
			type: Date,
			required: true,
		},
		symptoms: {
			type: String,
			required: true,
			trim: true,
		},
		vet: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'Vet',
		},
	},
	{
		timestamps: true,
	}
);

const Patient = mongoose.model('Patient', patientSchema);

export default Patient;
