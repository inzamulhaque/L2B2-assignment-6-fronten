import { selectOneBike } from "../../redux/features/bike/bikeSlice";
import { useAppSelector } from "../../redux/hooks";

export interface IBike {
  _id: string;
  name: string;
  price: number;
  quantity: number;
  sellerEmail: string;
  brand: string;
  color: string;
  mileage: number;
  model: string;
  type: string;
  releaseDate: string;
  isVisible: boolean;
  isDeleted: boolean;
  insurance?: {
    provided?: boolean;
    policyNumber?: number;
    expirationDate?: string;
  };
}

const BikeDetails = () => {
  const bike: IBike | null = useAppSelector(selectOneBike);

  return (
    <>
      <h1>{bike!.name}</h1>
      <div style={{}}>
        <h3 style={{ margin: "20px 0" }}>Bike Name: {bike!.name}</h3>
        <p style={{ margin: "20px 0" }}>Bike Price: {bike!.price}</p>
        <p style={{ margin: "20px 0" }}>Available Quantity: {bike!.quantity}</p>
        <p style={{ margin: "20px 0" }}>Seller Email: {bike!.sellerEmail}</p>
        <p style={{ margin: "20px 0" }}>Brand: {bike!.brand}</p>
        <p style={{ margin: "20px 0" }}>Color: {bike!.color}</p>
        <p style={{ margin: "20px 0" }}>Mileage: {bike!.mileage}</p>
        <p style={{ margin: "20px 0" }}>Model: {bike!.model}</p>
        <p style={{ margin: "20px 0" }}>Bike Type: {bike!.type}</p>
        <p style={{ margin: "20px 0" }}>Release Date: {bike!.releaseDate}</p>

        {bike!.insurance?.provided && (
          <>
            <p style={{ margin: "20px 0" }}>
              Insurance Number: {bike!.insurance?.policyNumber}
            </p>
            <p style={{ margin: "20px 0" }}>
              Expiration Date: {bike!.insurance?.expirationDate}
            </p>
          </>
        )}
      </div>
    </>
  );
};

export default BikeDetails;
