import express from 'express';
import { calculateBmi } from './bmiCalculator';

const app = express();


app.get('/hello', (_req, res) => {
    res.send('hello full stack');
});

app.get('/bmi', (req, res) => {
    const { height, weight } = req.query;
    
    if (!isNaN(Number(height)) && !isNaN(Number(weight))) {
        const bmi = calculateBmi(Number(weight), Number(height));
        const response = {
            weight,
            height,
            bmi
        };
        res.send(response);
    } else {
        res.status(400).send({ error: 'malformatted parameters' });
    };
});

const PORT = 3003;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});