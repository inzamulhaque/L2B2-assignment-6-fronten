import { Button, Row } from "antd";
import FormContainer from "../../components/form/FormContainer";
import CustomizeInput from "../../components/form/CustomizeInput";
import { FieldValues } from "react-hook-form";
import { useAddBikeMutation } from "../../redux/features/bike/bikeApi";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";

const AddBike = () => {
  const [addBike] = useAddBikeMutation();
  const navigate = useNavigate();

  const onSubmit = async (bikeData: FieldValues) => {
    try {
      const price = Number(bikeData.price);
      const quantity = Number(bikeData.quantity);
      const mileage = Number(bikeData.mileage);
      let insurance;
      if (bikeData.policyNumber) {
        const policyNumber = Number(bikeData.policyNumber);
        insurance = {
          policyNumber,
          provided: true,
          expirationDate: bikeData.expirationDate,
        };
      }

      addBike({ ...bikeData, price, quantity, mileage, insurance });
      toast.success("Bike added!");
      navigate("/");
    } catch (error) {
      toast.error("Something went wrong!");
    }
  };

  return (
    <>
      <h1>Add New Bike</h1>
      <Row justify="center" align="middle" style={{ height: "100%" }}>
        <FormContainer onSubmit={onSubmit}>
          <CustomizeInput type="text" name="name" label="Bike Name:" />
          <CustomizeInput type="number" name="price" label="Bike Price:" />
          <CustomizeInput
            type="number"
            name="quantity"
            label="Bike Quantity:"
          />
          <CustomizeInput
            type="date"
            name="releaseDate"
            label="Release Date:"
          />

          <CustomizeInput type="text" name="brand" label="Brand:" />
          <CustomizeInput type="text" name="model" label="Model:" />
          <CustomizeInput type="text" name="size" label="Size:" />
          <CustomizeInput type="text" name="type" label="Bike Type:" />
          <CustomizeInput type="text" name="color" label="Bike Color:" />
          <CustomizeInput type="number" name="mileage" label="Mileage:" />
          <CustomizeInput
            type="number"
            name="policyNumber"
            label="Policy Number:"
          />
          <CustomizeInput
            type="text"
            name="expirationDate"
            label="Expiration Date:"
          />

          <Button htmlType="submit" type="primary">
            Add Bike
          </Button>
        </FormContainer>
      </Row>
    </>
  );
};

export default AddBike;
