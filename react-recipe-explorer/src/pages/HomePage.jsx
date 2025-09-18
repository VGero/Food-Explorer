import { useEffect, useState } from "react";
import styles from "./HomePage.module.css";
import FoodCard from "../components/FoodCard";

function HomePage() {
  const [foods, setFoods] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchFoods() {
      try {
        const response = await fetch("http://localhost:3000/meals");
        if (!response.ok) {
          throw new Error("Failed to fetch recipes");
        }
        const resData = await response.json();
        setFoods(resData);
      } catch (err) {
        console.error("Error fetching recipes:", err);
        setError(err.message);
      }
    }

    fetchFoods();
  }, []);

  function handleDeleteFood(id) {
    setFoods((prevFoods) => prevFoods.filter((food) => food.id !== id));
  }

  return (
    <div>
      <h2 className={styles.title}>All Foods</h2>

      {error && <p style={{ color: "red" }}>Error: {error}</p>}
      {foods.length === 0 && !error && <p>Loading foods...</p>}

      <div className={styles.container}>
        {foods.map((food) => (
          <FoodCard food={food} key={food.id} onDelete={handleDeleteFood} />
        ))}
      </div>
    </div>
  );
}

export default HomePage;
