interface Results {
    periodLength:number,
    trainingDays:number,
    succes:boolean,
    rating:number,
    ratingDescription:string,
    target:number,
    average:number
}

//const args = [3, 0, 2, 4.5, 0, 3, 1];
//const target = [2, 2, 2, 2, 2, 0, 0];

// eslint-disable-next-line @typescript-eslint/no-explicit-any
/*const parseDays = (args:Array<any>): Array<number> => {
    if (args.length < 3) { throw new Error('not enough values'); }
    
    const argumentsArray = args.slice(2).map(v => Number(v));
    if (argumentsArray.includes(NaN)) {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
        throw new Error(`one or more values are not numbers: ${args.slice(2).filter(v => isNaN(v))}`);
    }
    return (
        argumentsArray
    );
};*/

export const calculateExcersices = (args: Array<number>, target: number): Results => {
    const calcRating = (target:number, avrgHours:number) => {
        if (target > avrgHours) {
            return 1;
        }
        if (target === avrgHours) {
            return 2;
        }
        if (target < avrgHours) {
            return 3;
        }
        throw new Error('somethings wrong with target o averages');
    };

    const calcRatingDesc = (rating:number) => {
        switch (rating) {
            case 1:
                return 'not too bad but could be better';
            case 2:
                return 'You met your target';
            case 3:
                return 'That was great work this week!';
            default:
                return 'note able to find a rating description';
        }
    };

    const trainingDays = args.filter(d => d !== 0).length;
    const average = args.reduce((a,c) => a + c, 0) / args.length;
    const rating = calcRating(target, average);
    const succes = rating >= target ? true : false;
    const ratingDescription = calcRatingDesc(rating);
    
    return (
        {
            periodLength:args.length,
            trainingDays,
            succes,
            rating,
            ratingDescription,
            target,
            average
        }
    );
};

/*try {
    const excercise = parseDays(process.argv);
    console.log(calculateExcersices(excercise, target));
} catch (error: unknown) {
    let errorMessage = 'somethings wrong.';
    if (error instanceof Error) {
        errorMessage += ' Error: ' + error.message;
    }
    console.log(errorMessage);
}*/
