import { useSelector, useDispatch } from "react-redux";
import { removeFavorite } from "../redux/foodSlice";
import styles from "./FavoritesPage.module.css";

function FavoritesPage() {
  const favorites = useSelector((state) => state.foods.favorites);
  const dispatch = useDispatch();

  return (
    <div>
      <h2 className={styles.title}>Your Favorites</h2>
      {favorites.length === 0 ? (
        <p className={styles.empty}>No favorites yet. Go add some!</p>
      ) : (
        <ul className={styles.container}>
          {favorites.map((food) => (
            <li key={food.id} className={styles.card}>
              <img
                src={`http://localhost:3000/${food.image}`}
                alt={food.name}
                className={styles.cardImage}
              />
              <h3 className={styles.cardTitle}>{food.name}</h3>
              <p className={styles.cardDescription}>{food.description}</p>
              <button
                onClick={() => dispatch(removeFavorite(food.id))}
                className={styles.removeButton}
              >
                Remove Favorite
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default FavoritesPage;
