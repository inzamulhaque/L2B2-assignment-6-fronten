import ProtectedRoute from "../components/layout/ProtectedRoute";
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
    ],
  },
];

export default buyerPath;
