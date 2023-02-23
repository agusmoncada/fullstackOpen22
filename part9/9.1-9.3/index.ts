import express from 'express';
import { calculateBmi } from './bmiCalculator';
import { calculateExcersices } from './exerciseCalculator';

const app = express();
app.use(express.json());


app.get('/hello', (_req, res) => {
    res.send('hello full stack');
});

app.get('/bmi', (req, res) => {
    //console.log(req.query);
    
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
    }   
});

app.post('/exercises', (req, res) => {
    const { daily_exercises, target } = req.body;
    //console.log(daily_exercises, target);
    
    if (!daily_exercises || !target) {
        return res.status(400).json({ error: 'one or more parameters missing' });
    }

    if (!Array.isArray(daily_exercises) || isNaN(Number(target))) {
        return res.status(400).json({ error: 'malformatted parameters' });
    }

    try {
        const response = calculateExcersices(daily_exercises, target)
        return res.json(response)
    } catch {
        return res.status(400).json({ error: 'something went wrong' })
    }
});

const PORT = 3003;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});