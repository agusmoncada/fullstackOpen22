/*const weight:number = Number(process.argv[2])
const height:number = Number(process.argv[3])*/

interface Bmidata {
    weight:number,
    height:number
}

const parseArgs = (args: Array<string>): Bmidata => {
    //first check the lenght of the arguments array
    if (args.length > 4) throw new Error('too many arguments punk');
    if (args.length <4) throw new Error('not enough arguments punk');

    //second check that last 2 values in array are numbers
    if (!isNaN(Number(args[2])) && !isNaN(Number(args[3]))) {
        return {
            weight: Number(args[2]),
            height: Number(args[3])
        };
    }
    if (isNaN(Number(args[2]))) {
        throw new Error(`${args[2]} is not a number`);
    } else {
        throw new Error(`${args[3]} is not a number`);
    }
};

export const calculateBmi = (weight:number, height:number): string => {
    const hMts = height * 0.01;
    const bmiNumber = weight / (hMts ** 2);

    if (bmiNumber < 18.5){
        return 'underweight';
    }
    if (bmiNumber < 24.9){
        return 'Normal (healthy weight)';
    }
    if (bmiNumber < 29.9){
        return 'Overweight';
    }
    if (bmiNumber > 30){
        return 'morbidly obese';
    }
    throw new Error('error');
};

try {
    const { weight, height } = parseArgs(process.argv);
    console.log(calculateBmi(weight, height));
} catch (error: unknown) {
    let errorMessage = 'somethings wrong.';
    if (error instanceof Error) {
        errorMessage += ' Error: ' + error.message;
    }
    console.log(errorMessage);
    
}

