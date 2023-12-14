import Patient from '../models/Patient.js';

/**
 * Add a new patient.
 * 
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @returns {Promise<void>} - A promise that resolves with the saved patient data or rejects with an error.
 */
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

/**
 * Retrieves all patients belonging to a specific vet.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @returns {Promise<void>} - A promise that resolves with the patients data in JSON format.
 */
const getPatients = async (req, res) => {
	const patients = await Patient.find().where('vet').equals(req.vet);
	res.json(patients);
};

/**
 * Get a patient by ID.
 *
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @returns {Object} - The patient object.
 */
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

/**
 * Updates a patient in the database.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @returns {Promise<void>} - A promise that resolves with the updated patient or an error.
 */
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

/**
 * Deletes a patient from the database.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @returns {Object} - The response object with a success message or an error message.
 */
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
