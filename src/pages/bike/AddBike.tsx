import { Button, Col, Row } from "antd";
import FormContainer from "../../components/form/FormContainer";
import CustomizeInput from "../../components/form/CustomizeInput";
import { FieldValues } from "react-hook-form";
import { useAddBikeMutation } from "../../redux/features/bike/bikeApi";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import CustomizeDatePicker from "../../components/form/CustomizeDatePicker";
import CustomizeSelect, {
  TSelect,
} from "../../components/form/CustomizeSelect";

const AddBike = () => {
  const [addBike] = useAddBikeMutation();
  const navigate = useNavigate();

  const bikeSizeOption: TSelect[] = [
    {
      value: "1 Sit",
      label: "1 Sit",
    },
    {
      value: "2 Sit",
      label: "2 Sit",
    },
  ];

  const bikeTypeOption: TSelect[] = [
    {
      value: "Normal",
      label: "Normal",
    },
    {
      value: "Racing",
      label: "Racing",
    },
    {
      value: "Mountain",
      label: "Mountain",
    },
  ];

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
        <Col span={24}>
          <FormContainer onSubmit={onSubmit}>
            <h1 style={{ textAlign: "center", margin: "10px" }}>
              Bike Details
            </h1>
            <Row gutter={8}>
              <Col span={24} md={{ span: 12 }} lg={{ span: 6 }}>
                <CustomizeInput type="text" name="name" />
              </Col>

              <Col span={24} md={{ span: 12 }} lg={{ span: 6 }}>
                <CustomizeInput type="number" name="price" />
              </Col>

              <Col span={24} md={{ span: 12 }} lg={{ span: 6 }}>
                <CustomizeInput type="number" name="quantity" />
              </Col>

              <Col span={24} md={{ span: 12 }} lg={{ span: 6 }}>
                <CustomizeDatePicker name="releaseDate" />
              </Col>

              <Col span={24} md={{ span: 12 }} lg={{ span: 6 }}>
                <CustomizeInput type="text" name="brand" />
              </Col>

              <Col span={24} md={{ span: 12 }} lg={{ span: 6 }}>
                <CustomizeInput type="text" name="model" />
              </Col>

              <Col span={24} md={{ span: 12 }} lg={{ span: 6 }}>
                <CustomizeSelect
                  options={bikeSizeOption}
                  placeholder="Select Bike Size"
                  name="size"
                />
              </Col>

              <Col span={24} md={{ span: 12 }} lg={{ span: 6 }}>
                <CustomizeSelect
                  options={bikeTypeOption}
                  placeholder="Select Bike Type"
                  name="type"
                />
              </Col>

              <Col span={24} md={{ span: 12 }} lg={{ span: 6 }}>
                <CustomizeInput type="text" name="color" />
              </Col>

              <Col span={24} md={{ span: 12 }} lg={{ span: 6 }}>
                <CustomizeInput type="number" name="mileage" />
              </Col>

              <Col span={24} md={{ span: 12 }} lg={{ span: 6 }}>
                <CustomizeInput type="number" name="policyNumber" />
              </Col>
            </Row>

            <Button htmlType="submit" type="primary">
              Add Bike
            </Button>
          </FormContainer>
        </Col>
      </Row>
    </>
  );
};

export default AddBike;
