import "./App.css";
import Body from "./Pages/Body";
import Generate from "./Pages/Generate";
import HomePage from "./Pages/HomePage";
import {
  createBrowserRouter,
  Outlet,
  RouterProvider,
  useLocation,
} from "react-router-dom";
import Login from "./Pages/Login";
import MyGenerations from "./Pages/MyGenerations";
import YTPreview from "./Pages/YTPreview";
import { useEffect } from "react";
import appStore from "./utils/appStore";
import { Provider } from "react-redux";

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return <Outlet />;
}

const router = createBrowserRouter([
  {
    path: "/",
    element: <ScrollToTop />,
    children: [
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
            path: "/preview",
            element: <YTPreview />,
          },
        ],
      },
    ],
  },
]);

function App() {
  return (
    <Provider store={appStore}>
      <RouterProvider router={router}></RouterProvider>
    </Provider>
  );
}

export default App;
