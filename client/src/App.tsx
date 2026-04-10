import "./App.css";
import Body from "./Pages/Body";
import Generate from "./Pages/Generate";
import HomePage from "./Pages/HomePage";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Login from "./Pages/Login";
import MyGenerations from "./Pages/MyGenerations";
import YTPreview from "./Pages/YTPreview";

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
        path: "/login",
        element: <Login />,
      },
      {
        path: "/generate/:thumbId?",
        element: <Generate />,
      },
      {
        path: "/my-generations",
        element: <MyGenerations />,
      },
      {
        path: "/yt-preview",
        element: <YTPreview />,
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router}></RouterProvider>;
}

export default App;
