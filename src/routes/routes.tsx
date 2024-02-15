import { createBrowserRouter } from "react-router-dom";
import Login from "../pages/Login";
import SignUp from "../pages/SignUp";
import App from "../App";
import routeGenerator from "../utils/routesGenerator";
import bikePath from "./bike.routes";
import Bikes from "../pages/bike/Bikes";
import Sales from "../pages/sale/Sales";
import BikeDetails from "../pages/bike/BikeDetails";
import EditBike from "../pages/bike/EditBike";
import CreateVariant from "../pages/bike/CreateVariant";
import ProtectedRoute from "../components/layout/ProtectedRoute";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        index: true,
        element: <Bikes />,
      },
    ],
  },
  {
    path: "/bikes",
    element: <App />,
    children: [
      ...routeGenerator(bikePath),
      {
        path: "details",
        element: <BikeDetails />,
      },
      {
        path: "edit/:id",
        element: (
          <ProtectedRoute role="seller">
            <EditBike />
          </ProtectedRoute>
        ),
      },
      {
        path: "create-variant",
        element: (
          <ProtectedRoute role="seller">
            <CreateVariant />
          </ProtectedRoute>
        ),
      },
    ],
  },
  {
    path: "/sales",
    element: <App />,
    children: [
      {
        index: true,
        element: (
          <ProtectedRoute role="seller">
            <Sales />
          </ProtectedRoute>
        ),
      },
    ],
  },
  {
    path: "/user/signin",
    element: <Login />,
  },
  {
    path: "/user/signup",
    element: <SignUp />,
  },
]);

export default router;
