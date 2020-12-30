import express from "express";
import { calculateBMI } from "./bmiCalculator";
import {parseArguments,calculateAverage} from "./exerciseCalculator"
const app = express();
app.use(express.json())
app.get("/bmi", (req, res) => {
  try {
    const bmi: string = calculateBMI(
      Number(req.query.height),
      Number(req.query.weight)
    );
    res.send({
      weight: req.query.weight,
      height: req.query.height,
      bmi,
    });
  } catch (e) {
    res.status(400).send({ error: String(e) });
  }
});
app.get("/hello", (_req, res) => {
  res.send("Hello Full Stack");
});
app.post("/exercises", (_req, res) => {
    try{
        console.log(_req.body)
        const { list, target } =parseArguments([0,0].concat(_req.body.target).concat(_req.body.daily_exercises).map(String))
        console.log(list,target)
        res.send(calculateAverage(list,target))
    }
    catch(e){
        res.status(400).send({
            error:String(e)
        })
    }
});
app.get("/ping", (_req, res) => {
  res.send("pong");
});

const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
