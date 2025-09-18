import { Link } from "react-router-dom";
import styles from "./ErrorPage.module.css";

function ErrorPage() {
  return (
    <div className={styles.error}>
      <h2>Page Not Found</h2>
      <p>Oops! The page you are looking for doesn't exist.</p>
      <Link to="/" className={styles.homeLink}>
        Go back Home
      </Link>
    </div>
  );
}

export default ErrorPage;
