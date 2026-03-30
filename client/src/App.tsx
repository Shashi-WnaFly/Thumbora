import "./App.css";
import Body from "./Pages/Body";
import Generate from "./Pages/Generate";
import HomePage from "./Pages/HomePage";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Login from "./Pages/Login";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Body />,
    children: [
      {
        path: "/",
        element: <HomePage />,
      },
      {
        path: "/generate",
        element: <Generate />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      // {
      //   path: "/",
      //   element: <HomePage />,
      // },
    ],
  },
]);

function App() {
  return <RouterProvider router={router}></RouterProvider>;
}

export default App;
