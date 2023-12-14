import express from 'express';
import { addPatient, getPatients } from '../controllers/patientController.js';
import checkAuth from '../middleware/authMiddleware.js';

const router = express.Router();

router.route('/').post(checkAuth, addPatient).get(checkAuth, getPatients);

export default router;
