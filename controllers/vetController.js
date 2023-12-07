import Vet from '../models/Vet.js';
import generateJWT from '../helpers/generateJWT.js';
import generateID from '../helpers/generateID.js';

/**
 * Registers a new vet.
 *
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @returns {Promise<void>} - A promise that resolves when the vet is registered.
 */
const registerVets = async (req, res) => {
	const { email } = req.body;

	const vetExists = await Vet.findOne({ email });

	if (vetExists) {
		const error = new Error('Vet already exists');
		return res.status(400).json({ msg: error.message });
	}

	try {
		const vet = new Vet(req.body);
		const vetSaved = await vet.save();
		res.json({ vetSaved });
	} catch (error) {
		console.log(error);
	}
};

/**
 * Retrieves the profile of a veterinarian.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 */
const vetProfile = (req, res) => {
	const { vet } = req;

	res.json({ vet });

	res.json({ msg: 'Showing profile...' });
};

/**
 * Confirm the vet user by token.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @returns {Promise<void>} - A promise that resolves when the vet user is confirmed.
 */
const confirmVet = async (req, res) => {
	const { token } = req.params;

	const userConfirm = await Vet.findOne({ token });

	if (!userConfirm) {
		const error = new Error('Invalid token');
		return res.status(400).json({ msg: error.message });
	}

	try {
		userConfirm.token = null;
		userConfirm.confirmed = true;

		await userConfirm.save();

		res.json({ msg: 'User successfully confirmed' });
	} catch (error) {
		console.log(error);
	}
};

/**
 * Authenticate a veterinarian user.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @returns {Object} - The response object containing a token or an error message.
 */
const authVet = async (req, res) => {
	const { email, password } = req.body;

	const user = await Vet.findOne({ email });

	if (!user) {
		const error = new Error('Invalid credentials');
		return res.status(403).json({ msg: error.message });
	}

	if (!user.confirmed) {
		const error = new Error('Confirm your email');
		return res.status(401).json({ msg: error.message });
	}

	if (await user.matchPassword(password)) {
		res.json({ token: generateJWT(user.id) });
	} else {
		const error = new Error('Invalid credentials');
		return res.status(403).json({ msg: error.message });
	}
};

/**
 * Handles the forgot password functionality for vets.
 * 
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @returns {Promise<void>} - A promise that resolves when the operation is complete.
 */
const forgotPassword = async (req, res) => {
	const { email } = req.body;
	
	const vetExists = await Vet.findOne({ email });
	
	if (!vetExists) {
		const error = new Error('Vet does not exist');
		return res.status(400).json({ msg: error.message });
	}

	try {
		vetExists.token = generateID();
		await vetExists.save();
		res.json({ msg: 'Email sent' });
	} catch (error) {
		console.log(error);
	}
};

/**
 * Check if the provided token is valid.
 *
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @returns {Promise<void>} - A promise that resolves with a JSON response indicating the validity of the token.
 */
const checkToken = async (req, res) => {
	const { token } = req.params;

	const validToken = await Vet.findOne({ token });

	if (!validToken) {
		const error = new Error('Invalid token');
		return res.status(400).json({ msg: error.message });
	}

	res.json({ msg: 'Valid token' });
};

/**
 * Resets the password for a vet using a token and a new password.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @returns {Promise<void>} - A promise that resolves once the password is reset.
 */
const resetPassword = async (req, res) => {
	const { token } = req.params;
	const { password } = req.body;

	const vet = await Vet.findOne({ token });

	if (!vet) {
		const error = new Error('Invalid token');
		return res.status(400).json({ msg: error.message });
	}

	try {
		vet.token = null;
		vet.password = password;
		await vet.save();
		res.json({ msg: 'Password changed' });
	} catch (error) {
		console.log(error);
	}
};

export {
	registerVets,
	vetProfile,
	confirmVet,
	authVet,
	forgotPassword,
	checkToken,
	resetPassword,
};
