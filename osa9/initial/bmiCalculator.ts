const calculateBMI = (height: number,weight: number):string =>{
    height = height /100;
    const bmi = (weight/(Math.pow(height,2)))
    if(bmi < 18.5){
        return("Underweight")
    }
    if(bmi > 24.9){
        return ("Overweight")
    }
    return "Normal"
}
console.log(calculateBMI(180, 74))