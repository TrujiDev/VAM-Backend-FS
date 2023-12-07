import jwt from 'jsonwebtoken';

/**
 * Generates a JSON Web Token (JWT) with the provided user ID.
 * @param {string} id - The user ID.
 * @returns {string} - The generated JWT.
 */
const generateJWT = (id) => {
	return jwt.sign({ id }, process.env.JWT_SECRET, {
		expiresIn: '30d',
	});
};

export default generateJWT;
