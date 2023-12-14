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

export { addPatient, getPatients };
