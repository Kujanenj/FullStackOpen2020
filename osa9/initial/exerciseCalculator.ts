interface Calculator {
  list: Array<number>;
  target: number;
}
interface result {
  periodLength: number;
  trainingDays: number;
  success: boolean;
  rating: number;
  description: String;
  target: number;
  average: number;
}
const calculateAverage = (list: Array<number>, target: number): result => {
  const trainingDays: number = list.filter((value) => value > 0).length;
  const periodLength: number = list.length;
  var sum : number = 0;
  for (var i = 0; i < list.length; i++) {
    sum += list[i] //don't forget to add the base
  }

  var average : number = sum / list.length;
  const success : boolean = average >= target;
  let rating : number =3
  let description : string = "Success"; 
  if(!success){
      if(target-average > 1){
          rating = 1;
          description = "Far away"
      }
      else{
          description ="Close, but not quite"
          rating = 2
      }
  }

  return {
      periodLength,
      trainingDays,
      success,
      rating,
      description,
      target,
      average
  };
};
console.log(calculateAverage([3, 0, 2, 4.5, 0, 3, 1],2))