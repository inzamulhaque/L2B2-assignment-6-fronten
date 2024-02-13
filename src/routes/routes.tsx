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
        path: "edit",
        element: <EditBike />,
      },
      {
        path: "create-variant",
        element: <CreateVariant />,
      },
    ],
  },
  {
    path: "/sales",
    element: <App />,
    children: [
      {
        index: true,
        element: <Sales />,
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
