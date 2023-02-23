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
    
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const { dailyExercises, target } = req.body;

    if (!dailyExercises || !target) {
        return res.status(400).json({ error: 'one or more parameters missing' });
    }

    if ()

    const response = calculateExcersices(dailyExercises, target)
    console.log(dailyExercises, target);
    res.send('oki doki');
    
});

const PORT = 3003;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});