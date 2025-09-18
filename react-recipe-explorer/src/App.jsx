import { createBrowserRouter, RouterProvider } from "react-router-dom";

import HomePage from "./pages/HomePage";
import RootLayout from "./pages/RootLayout";
import ErrorPage from "./pages/ErroPage";
import FavoritesPage from "./pages/FavoritesPage";
import AddFoodPage from "./pages/AddFoodPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    errorElement: <ErrorPage />,
    children: [
      { index: true, element: <HomePage /> },
      { path: "favorites", element: <FavoritesPage /> },
      { path: "add-food", element: <AddFoodPage /> },
    ],
  },
]);

function App() {
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
