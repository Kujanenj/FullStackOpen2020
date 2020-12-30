import express from "express";
import { calculateBMI } from "./bmiCalculator";
const app = express();
app.get("/bmi", (req, res) => {
  try {
    let bmi: string = calculateBMI(
      Number(req.query.height),
      Number(req.query.weight)
    );
    res.send({
      weight: req.query.weight,
      height: req.query.height,
      bmi,
    });
  } catch (e) {}
});
app.get("/hello", (_req, res) => {
  res.send("Hello Full Stack");
});

app.get("/ping", (_req, res) => {
  res.send("pong");
});

const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
