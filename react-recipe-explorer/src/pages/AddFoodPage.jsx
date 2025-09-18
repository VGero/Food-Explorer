import { useState } from "react";
import styles from "./AddFoodPage.module.css";

function AddFoodPage() {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");
  const [message, setMessage] = useState("");

  async function handleSubmit(event) {
    event.preventDefault();

    const newFood = { name, description, image };

    try {
      const response = await fetch("http://localhost:3000/meals", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newFood),
      });

      if (!response.ok) {
        throw new Error("Failed to add food");
      }

      const data = await response.json();
      setMessage(`Food "${data.meal.name}" added successfully!`);

      // reset form
      setName("");
      setDescription("");
      setImage("");
    } catch (err) {
      console.error(err);
      setMessage("Failed to add food. Try again.");
    }
  }

  return (
    <div>
      <h2 className={styles.title}>Add a New Food</h2>
      <form onSubmit={handleSubmit} className={styles.form}>
        <label>
          Name:
          <input
            value={name}
            onChange={(event) => setName(event.target.value)}
            required
          />
        </label>
        <label>
          Description:
          <textarea
            value={description}
            onChange={(event) => setDescription(event.target.value)}
            required
          />
        </label>
        <label>
          Image URL:
          <input
            value={image}
            onChange={(event) => setImage(event.target.value)}
            required
          />
        </label>
        <button type="submit">Submit</button>
      </form>

      {message && <p className={styles.p}>{message}</p>}
    </div>
  );
}

export default AddFoodPage;
