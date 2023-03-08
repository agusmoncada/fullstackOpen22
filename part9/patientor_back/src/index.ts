import express from 'express';
const cors = require('cors')
import data from '../data/diagnoses';
import patientService from './services/patientService';
import patientParser from './utils';

const app = express();
app.use(express.json());
app.use(cors())

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
    try {
        console.log('someone posted a patient');
        const patientToAdd = patientParser(req.body);
        const addedPatient = patientService.addPatient(patientToAdd);
        res.send(addedPatient);
    } catch(error: unknown){
        let errorMessage = 'something went wrong.';
        if ( error instanceof Error) {
            errorMessage += ' Error: ' + error.message;
            res.status(400).send(errorMessage)
        }
    }
});

const PORT = 3003;
app.listen(PORT, () => {
    console.log(`Server running on  port ${PORT}`);
});