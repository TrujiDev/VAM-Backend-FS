import jwt from 'jsonwebtoken';
import Vet from '../models/Vet.js';

/**
 * Middleware function to check if the request is authenticated.
 * It verifies the token in the request headers and sets the "vet" property in the request object.
 * If the token is invalid or missing, it returns an error response.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @param {Function} next - The next middleware function.
 * @returns {void}
 */
const checkAuth = async (req, res, next) => {
	let token;
	if (
		req.headers.authorization &&
		req.headers.authorization.startsWith('Bearer')
	) {
		const token = req.headers.authorization.split(' ')[1];

		try {
			const decoded = jwt.verify(token, process.env.JWT_SECRET);

			req.vet = await Vet.findById(decoded.id).select(
				"-password -token -confirmed -__v"
			);

			return next();
		} catch (error) {
			const err = new Error('Invalid token');
			return res.status(403).json({ msg: err.message });
		}
	}

	if (!token) {
		const err = new Error('Not authorized');
		return res.status(403).json({ msg: err.message });
	}
	next();
};

export default checkAuth;
