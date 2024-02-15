import ProtectedRoute from "../components/layout/ProtectedRoute";
import AddBike from "../pages/bike/AddBike";
import Bikes from "../pages/bike/Bikes";

const bikePath = [
  {
    name: "Bikes",
    children: [
      {
        name: "All Bikes",
        path: "all-bikes",
        element: (
          <ProtectedRoute role="seller">
            <Bikes />
          </ProtectedRoute>
        ),
      },
      {
        name: "Add Bike",
        path: "add-bike",
        element: (
          <ProtectedRoute role="seller">
            <AddBike />
          </ProtectedRoute>
        ),
      },
    ],
  },
];

export default bikePath;
