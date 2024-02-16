import ProtectedRoute from "../components/layout/ProtectedRoute";
import BuyerMaintenanceData from "../pages/maintenance/BuyerMaintenanceData";
import RequestMaintenance from "../pages/maintenance/RequestMaintenance";

const buyerPath = [
  {
    name: "Maintenance",
    children: [
      {
        name: "Request Maintenance",
        path: "request",
        element: (
          <ProtectedRoute role="buyer">
            <RequestMaintenance />
          </ProtectedRoute>
        ),
      },
      {
        name: "My Maintenance Data",
        path: "my-maintenance-data",
        element: (
          <ProtectedRoute role="buyer">
            <BuyerMaintenanceData />
          </ProtectedRoute>
        ),
      },
    ],
  },
];

export default buyerPath;
