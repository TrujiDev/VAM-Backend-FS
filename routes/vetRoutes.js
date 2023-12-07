import express from 'express';
import {
	registerVets,
	vetProfile,
	confirmVet,
	authVet,
	forgotPassword,
	checkToken,
	resetPassword,
} from '../controllers/vetController.js';
import checkAuth from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/', registerVets);
router.get('/confirm/:token', confirmVet);
router.post('/login', authVet);
router.post('/forgot-password', forgotPassword);
router.route('/forgot-password/:token').get(checkToken).post(resetPassword);

router.get('/profile', checkAuth, vetProfile);

export default router;
