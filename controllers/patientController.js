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

	if (patient.vet._id.toString() !== req.vet._id.toString()) {
		return res.status(401).json({ msg: 'Not authorized' });
	}

	if (patient) {
		res.json(patient);
	}
};

const updatePatient = async (req, res) => {};

const deletePatient = async (req, res) => {};

export { addPatient, getPatients, getPatient, updatePatient, deletePatient };
