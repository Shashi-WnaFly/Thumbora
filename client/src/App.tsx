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
import YTPreview from "./Pages/YTPreview";
import { lazy, Suspense, useEffect } from "react";
import appStore from "./utils/appStore";
import { Provider } from "react-redux";
import PasswordReset from "./Pages/PasswordReset";
import PasswordUpdate from "./Pages/PasswordUpdate";
import LoadingMyGen from "./components/LoadingMyGen";

const MyGenerations = lazy(() => import("./Pages/MyGenerations"));

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
            element: (
              <Suspense fallback={<LoadingMyGen />}>
                <MyGenerations />
              </Suspense>
            ),
          },
          {
            path: "/password/update",
            element: <PasswordUpdate />,
          },
          {
            path: "/preview",
            element: <YTPreview />,
          },
          {
            path: "/user/password/reset",
            element: <PasswordReset />,
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
