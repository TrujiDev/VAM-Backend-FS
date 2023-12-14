import Patient from '../models/Patient.js';

const addPatient = async (req, res) => {
	const patient = new Patient(req.body);
	patient.vet = req.vet._id;

	try {
		const patientStored = await patient.save();
		res.json(patientStored);
	} catch (error) {
		console.log(error);
	}
};

const getPatients = async (req, res) => {
	const patients = await Patient.find().where('vet').equals(req.vet);
	res.json(patients);
};

const getPatient = async (req, res) => {
	const { id } = req.params;
	const patient = await Patient.findById(id);

	if (!patient) {
		return res.status(404).json({ msg: 'Patient not found' });
	}

	if (patient.vet._id.toString() !== req.vet._id.toString()) {
		return res.status(401).json({ msg: 'Not authorized' });
	}

	res.json(patient);
};

const updatePatient = async (req, res) => {
	const { id } = req.params;
	const patient = await Patient.findById(id);

	if (!patient) {
		return res.status(404).json({ msg: 'Patient not found' });
	}

	if (patient.vet._id.toString() !== req.vet._id.toString()) {
		return res.status(401).json({ msg: 'Not authorized' });
	}

	Object.keys(req.body).forEach((key) => {
		patient[key] = req.body[key] || patient[key];
	});

	try {
		const patientUpdated = await patient.save();
		res.json(patientUpdated);
	} catch (error) {
		console.log(error);
	}
};

const deletePatient = async (req, res) => {
	const { id } = req.params;
	const patient = await Patient.findById(id);

	if (!patient) {
		return res.status(404).json({ msg: 'Patient not found' });
	}

	if (patient.vet._id.toString() !== req.vet._id.toString()) {
		return res.status(401).json({ msg: 'Not authorized' });
	}

	try {
		await Patient.findByIdAndDelete(id);
		res.json({ msg: 'Patient deleted' });
	} catch (error) {
		console.log(error);
	}
};

export { addPatient, getPatients, getPatient, updatePatient, deletePatient };
