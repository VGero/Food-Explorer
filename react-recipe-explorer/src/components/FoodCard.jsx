import styles from "./FoodCard.module.css";
import { useDispatch, useSelector } from "react-redux";
import { addFavorite, removeFavorite } from "../redux/foodSlice";

export default function FoodCard({ food, onDelete }) {
  const dispatch = useDispatch();
  const foods = useSelector((state) => state.foods.favorites);

  const isFavorite = foods.some((fav) => fav.id === food.id);

  function toggleFavorite() {
    if (isFavorite) {
      dispatch(removeFavorite(food.id));
    } else {
      dispatch(addFavorite(food));
    }
  }

  async function handleDelete() {
    try {
      const response = await fetch(`http://localhost:3000/meals/${food.id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Failed to delete food");
      }

      // update UI
      onDelete(food.id);
    } catch (err) {
      console.error("Failed to delete food:", err);
    }
  }

  return (
    <div className={styles.foodCard}>
      <img
        src={
          food.image.startsWith("http")
            ? food.image
            : `http://localhost:3000/${food.image}`
        }
        alt={food.name}
      />
      <div className={styles.foodCardInfo}>
        <h3 className={styles.foodCardName}>{food.name}</h3>
        <p className={styles.foodCardDescription}>{food.description}</p>
      </div>
      <button onClick={toggleFavorite} className={styles.favoriteButton}>
        {isFavorite ? "Remove Favorite" : "Add to Favorites"}
      </button>
      <button onClick={handleDelete} className={styles.deleteButton}>
        Delete
      </button>
    </div>
  );
}
