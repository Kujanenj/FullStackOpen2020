export const calculateBMI = (height: number, weight: number): string => {
  height = height / 100;
  const bmi = weight / Math.pow(height, 2);
  if (bmi < 18.5) {
    console.log("Underweigh");
    return "Underweight";
  }
  if (bmi > 24.9) {
    console.log("OverWeight");
    return "Overweight";
  }
  console.log("Normal");
  return "Normal";
};
const a = Number(process.argv[2]);
const b = Number(process.argv[3]);
calculateBMI(a, b);
