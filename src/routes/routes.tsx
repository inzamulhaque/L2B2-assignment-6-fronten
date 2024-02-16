import { createBrowserRouter } from "react-router-dom";
import Login from "../pages/Login";
import SignUp from "../pages/SignUp";
import App from "../App";
import routeGenerator from "../utils/routesGenerator";

import Bikes from "../pages/bike/Bikes";
import BikeDetails from "../pages/bike/BikeDetails";
import EditBike from "../pages/bike/EditBike";
import CreateVariant from "../pages/bike/CreateVariant";
import ProtectedRoute from "../components/layout/ProtectedRoute";
import sellerPath from "./seller.routes";
import Landing from "../components/layout/Landing";
import buyerPath from "./maintenance.routes";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        index: true,
        element: <Landing />,
      },
    ],
  },
  {
    path: "/seller",
    element: <App />,
    children: [
      ...routeGenerator(sellerPath),
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
    path: "/buyer",
    element: <App />,
    children: routeGenerator(buyerPath),
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
