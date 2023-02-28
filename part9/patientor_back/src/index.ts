import express from 'express';
const cors = require('cors')
import data from '../data/diagnoses';
import patientService from './services/patientService';

const app = express();
app.use(express.json());
app.use(cors())
const PORT = 3000;


app.get('/api/ping', (_req, res) => {
    console.log('someone pinged here');
    res.send('pong');
});

app.get('/api/diagnoses', (_req, res) => {
    console.log('someone requested diagnosis');
    res.send(data);
});

app.get('/api/patients', (_req, res) => {
    console.log('someone requested patients');
    const data = patientService.getPatientsNonSensitive();
    res.send(data);
});

app.post('/api/patients', (req, res) => {
    const { name, dateOfBirth, ssn, gender, occupation } = req.body;
    const newPatient = patientService.addPatient({ name, dateOfBirth, ssn, gender, occupation })
    console.log('someone posted a patient', newPatient);
    res.json(newPatient);
});

app.listen(PORT, () => {
    console.log(`Server running on  port ${PORT}`);
});