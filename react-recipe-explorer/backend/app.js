import fs from "node:fs/promises";
import bodyParser from "body-parser";
import express from "express";

const app = express();

app.use(bodyParser.json());
app.use(express.static("public"));

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, DELETE, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  if (req.method === "OPTIONS") {
    return res.sendStatus(200);
  }
  next();
});

app.get("/meals", async (req, res) => {
  try {
    const meals = await fs.readFile("./data/available-meals.json", "utf8");
    res.json(JSON.parse(meals));
  } catch (err) {
    console.error("Error reading meals:", err);
    res.status(500).json({ message: "Could not read meals." });
  }
});

app.post("/meals", async (req, res) => {
  const newMeal = req.body;

  if (!newMeal.name || !newMeal.description || !newMeal.image) {
    return res.status(400).json({ message: "Missing required fields" });
  }

  newMeal.id = Date.now().toString();

  try {
    const mealsData = await fs.readFile("./data/available-meals.json", "utf8");
    const meals = JSON.parse(mealsData);

    meals.push(newMeal);

    await fs.writeFile(
      "./data/available-meals.json",
      JSON.stringify(meals, null, 2)
    );

    res.status(201).json({ message: "Meal added successfully", meal: newMeal });
  } catch (err) {
    console.error("Error saving meal:", err);
    res.status(500).json({ message: "Could not save meal." });
  }
});

app.delete("/meals/:id", async (req, res) => {
  const mealId = req.params.id.toString().trim();

  try {
    const mealsData = await fs.readFile("./data/available-meals.json", "utf8");
    let meals = JSON.parse(mealsData);

    const updatedMeals = meals.filter(
      (meal) => meal.id?.toString().trim() !== mealId
    );

    if (meals.length === updatedMeals.length) {
      return res.status(404).json({ message: "Meal not found" });
    }

    await fs.writeFile(
      "./data/available-meals.json",
      JSON.stringify(updatedMeals, null, 2)
    );

    res.status(200).json({ message: "Meal deleted successfully" });
  } catch (err) {
    console.error("Error deleting meal:", err);
    res.status(500).json({ message: "Could not delete meal." });
  }
});

app.use((req, res) => {
  res.status(404).json({ message: "Not found" });
});

app.listen(3000, () => {
  console.log("Server running on http://localhost:3000");
});
