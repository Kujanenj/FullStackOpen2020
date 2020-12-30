interface Calculator {
  list: Array<number>;
  target: number;
}
interface result {
  periodLength: number;
  trainingDays: number;
  success: boolean;
  rating: number;
  description: string;
  target: number;
  average: number;
}
export const parseArguments = (args: Array<string>): Calculator => {
  console.log(args)
  if (args.length < 4) throw new Error("Not enough arguments");
  for (let i = 2; i < args.length; i++) {
    if (isNaN(Number(args[i]))) {
      console.log(args[i]);
      throw new Error("Provided values were not numbers!");
    }
    return {
      list: args.slice(3, args.length).map(Number),
      target: Number(args[2]),
    };
  }
  return {
    list: [],
    target: 0,
  };
};

export const calculateAverage = (list: Array<number>, target: number): result => {
  const trainingDays: number = list.filter((value) => value > 0).length;
  const periodLength: number = list.length;
  let sum = 0;
  for (let i = 0; i < list.length; i++) {
    sum += list[i]; //don't forget to add the base
  }

  const average: number = sum / list.length;
  
  const success: boolean = average >= target;
  let rating = 3;
  let description = "Success";
  if (!success) {
    if (target - average > 1) {
      rating = 1;
      description = "Far away";
    } else {
      description = "Close, but not quite";
      rating = 2;
    }
  }

  return {
    periodLength,
    trainingDays,
    success,
    rating,
    description,
    target,
    average,
  };
};
/*try {
  const { list, target } = parseArguments(process.argv);
  console.log(calculateAverage(list, target));
} catch (e) {
  console.log("Error, something bad happened, message: ", e);
}
*/
