import AddBike from "../pages/bike/AddBike";
import Bikes from "../pages/bike/Bikes";

const bikePath = [
  {
    name: "Bikes",
    children: [
      {
        name: "All Bikes",
        path: "all-bikes",
        element: <Bikes />,
      },
      {
        name: "Add Bike",
        path: "add-bike",
        element: <AddBike />,
      },
    ],
  },
];

export default bikePath;
