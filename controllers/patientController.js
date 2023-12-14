import Patient from "../models/Patient.js";

const addPatient = (req, res) => {
    const patient = new Patient(req.body);

    try {
        
    } catch (error) {
        console.log(error);
    }
};

const getPatients = (req, res) => {};

export { addPatient, getPatients };
