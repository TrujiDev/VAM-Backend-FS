import express from 'express';
import { addPatient, getPatients } from '../controllers/patientController.js';

const router = express.Router();

router.route('/').post(addPatient).get(getPatients);

export default router;
