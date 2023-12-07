import jwt from 'jsonwebtoken';
import Vet from '../models/Vet.js';

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
