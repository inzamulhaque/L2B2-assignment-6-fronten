import ProtectedRoute from "../components/layout/ProtectedRoute";
import AddBike from "../pages/bike/AddBike";
import Bikes from "../pages/bike/Bikes";
import SellerMaintenanceData from "../pages/maintenance/SellerMaintenanceData";
import Sales from "../pages/sale/Sales";

const sellerPath = [
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
  {
    name: "Sales",
    path: "sales",
    element: (
      <ProtectedRoute role="seller">
        <Sales />
      </ProtectedRoute>
    ),
  },

  {
    name: "Maintenance",
    path: "maintenance-request",
    element: (
      <ProtectedRoute role="seller">
        <SellerMaintenanceData />
      </ProtectedRoute>
    ),
  },
];

export default sellerPath;
