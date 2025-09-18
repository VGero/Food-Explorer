import { Outlet, NavLink } from "react-router-dom";
import styles from "./RootLayout.module.css";

function RootLayout() {
  return (
    <>
      <header className={styles.header}>
        <h1 className={styles.logo}>Food Explorer</h1>
        <nav className={styles.nav}>
          <NavLink
            to="/"
            end
            className={({ isActive }) => (isActive ? styles.active : undefined)}
          >
            Home
          </NavLink>
          <NavLink
            to="/favorites"
            className={({ isActive }) => (isActive ? styles.active : undefined)}
          >
            Favorites
          </NavLink>
          <NavLink
            to="/add-food"
            className={({ isActive }) => (isActive ? styles.active : undefined)}
          >
            Add Food
          </NavLink>
        </nav>
      </header>
      <main className={styles.main}>
        <Outlet />
      </main>
    </>
  );
}

export default RootLayout;
