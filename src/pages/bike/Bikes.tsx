import {
  Button,
  Col,
  Dropdown,
  Modal,
  Row,
  Table,
  TableColumnsType,
} from "antd";
import {
  useDeleteBulkBikeMutation,
  useDeleteOneBikeMutation,
  useGetAllBikesQuery,
} from "../../redux/features/bike/bikeApi";
import { useAppDispatch } from "../../redux/hooks";

import { useNavigate } from "react-router-dom";
import { addBike } from "../../redux/features/bike/bikeSlice";
import FormContainer from "../../components/form/FormContainer";
import { FieldValues } from "react-hook-form";
import CustomizeInput from "../../components/form/CustomizeInput";
import React, { CSSProperties, ChangeEvent, useState } from "react";

import { IBike } from "./BikeDetails";
import { toast } from "sonner";
import { useCreateSellMutation } from "../../redux/features/sell/sellApi";
import CustomizeDatePicker from "../../components/form/CustomizeDatePicker";
import moment from "moment";

export type TInsurance = {
  provided?: boolean;
  policyNumber?: number;
  expirationDate?: string;
};

export type TBike = {
  _id: string;
  sellerEmail: string;
  name: string;
  price: number;
  quantity: number;
  releaseDate: string;
  brand: string;
  model: string;
  size: string;
  type: string;
  color: string;
  mileage: number;
  isDeleted: boolean;
  isVisible: boolean;
  insurance?: TInsurance;
};

type TTableType = Pick<TBike, "name" | "price" | "quantity" | "color">;

const Bikes = () => {
  const [search, setSearch] = useState(null);
  const [modalIsOpen, setIsOpen] = useState<boolean>(false);
  const [bikeId, setBikeId] = useState("");
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const { data: bikes, isLoading, isFetching } = useGetAllBikesQuery(search);
  const [deleteOneBike] = useDeleteOneBikeMutation();
  const [deleteBlukBike] = useDeleteBulkBikeMutation();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const tableData = bikes?.data?.map((data: TBike) => ({
    key: data._id,
    ...data,
    releaseDate: moment(new Date(data.releaseDate as string)).format("ll"),
  }));

  if (isLoading) {
    return (
      <>
        <p>Loading...</p>
      </>
    );
  }

  const editBike = (bike: IBike) => {
    dispatch(addBike(bike));
    navigate(`/bikes/edit/${bike._id}`);
  };

  const CreateVariant = (bike: IBike) => {
    dispatch(addBike(bike));
    navigate("/bikes/create-variant");
  };

  const bikeDetails = (bike: IBike) => {
    dispatch(addBike(bike));
    navigate("/bikes/details");
  };

  const onSubmit = (condition: FieldValues) => {
    setSearch(condition.search);
  };

  const bulkDelete = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;

    if (e.target.checked) {
      setSelectedIds((prevSelectedIds) => [...prevSelectedIds, value]);
    } else {
      setSelectedIds((prevSelectedIds) =>
        prevSelectedIds.filter((id) => id !== value)
      );
    }
  };

  const triggerBulkDelete = async () => {
    try {
      deleteBlukBike(selectedIds);
      toast.success("Bulk delete successful");
    } catch (error) {
      toast.error("Bulk delete not successful");
    }
  };

  // const thStyle: CSSProperties = {
  //   padding: "10px",
  //   textAlign: "center",
  //   fontWeight: "bold",
  //   border: "1px solid black",
  // };

  // const tdStyle: CSSProperties = {
  //   padding: "10px",
  //   textAlign: "center",
  //   border: "1px solid black",
  // };

  const columns: TableColumnsType<TTableType> = [
    {
      title: " ",
      key: "Y",
      render: (item) => {
        return (
          <>
            <input
              type="checkbox"
              name="id"
              value={item._id}
              checked={selectedIds.includes(item._id)}
              onChange={bulkDelete}
            />
          </>
        );
      },
    },
    {
      title: "Name",
      key: "name",
      dataIndex: "name",
    },

    {
      title: "Quantity",
      key: "quantity",
      dataIndex: "quantity",
    },
    {
      title: "Color",
      key: "color",
      dataIndex: "color",
    },
    {
      title: "Release Date",
      key: "releaseDate",
      dataIndex: "releaseDate",
    },
    {
      title: "Brand",
      key: "brand",
      dataIndex: "brand",
    },
    {
      title: "Action",
      key: "x",
      render: (item) => {
        return (
          <Row gutter={1}>
            <Col span={4}>
              <Button type="primary" onClick={() => editBike(item)}>
                Edit
              </Button>
            </Col>
            <Col span={4}>
              <Button type="default" onClick={() => deleteOneBike(item._id)}>
                Delete
              </Button>
            </Col>
            <Col span={4}>
              <Button type="primary" onClick={() => bikeDetails(item)}>
                Details
              </Button>
            </Col>
            <Col span={6}>
              <Button type="default" onClick={() => CreateVariant(item)}>
                Create Variant
              </Button>
            </Col>
            <Col span={4}>
              <Button
                type="primary"
                onClick={() => {
                  setIsOpen(true);
                  setBikeId(item._id);
                }}
              >
                Sell
              </Button>
            </Col>
          </Row>
        );
      },
    },
  ];

  return (
    <>
      <h1>All Bikes</h1>

      <div>
        <FormContainer onSubmit={onSubmit}>
          <div style={{ display: "flex" }}>
            <CustomizeInput type="text" name="search" />
            <Button htmlType="submit" type="primary">
              Search
            </Button>
          </div>
        </FormContainer>
      </div>

      {/* <table
        style={{
          borderCollapse: "collapse",
          width: "100%",
        }}
      >
        <thead>
          <tr>
            <th style={thStyle}> &nbsp; </th>
            <th style={thStyle}> Name </th>
            <th style={thStyle}> Price </th>
            <th style={thStyle}> Quantity </th>
            <th style={thStyle}> Color </th>
            <th style={thStyle}> Release Date </th>
            <th style={thStyle}> Brand </th>
            <th style={thStyle}> Actions </th>
          </tr>
        </thead>
        <tbody>
          {bikes?.data?.map(
            (bike: IBike) =>
              bike.isVisible &&
              !bike.isDeleted && (
                <tr key={bike._id}>
                  <td style={tdStyle}>
                    <input
                      type="checkbox"
                      name="id"
                      value={bike._id}
                      checked={selectedIds.includes(bike._id)}
                      onChange={bulkDelete}
                    />
                  </td>
                  <td style={tdStyle}>{bike.name}</td>
                  <td style={tdStyle}>{bike.price}</td>
                  <td style={tdStyle}>{bike.quantity}</td>
                  <td style={tdStyle}>{bike.color}</td>
                  <td style={tdStyle}>{bike.releaseDate}</td>
                  <td style={tdStyle}>{bike.brand}</td>
                  <td style={tdStyle}>
                    <Button type="primary" onClick={() => editBike(bike)}>
                      Edit
                    </Button>
                    <Button
                      type="default"
                      onClick={() => deleteOneBike(bike._id)}
                    >
                      Delete
                    </Button>
                    <Button type="primary" onClick={() => bikeDetails(bike)}>
                      Details
                    </Button>
                    <Button type="default" onClick={() => CreateVariant(bike)}>
                      Create Variant
                    </Button>
                    <Button
                      type="primary"
                      onClick={() => {
                        setIsOpen(true);
                        setBikeId(bike._id);
                      }}
                    >
                      Sell
                    </Button>

                    <Button type="default">Request Maintenance</Button>
                  </td>
                </tr>
              )
          )}
        </tbody>
      </table> */}

      <Table loading={isFetching} columns={columns} dataSource={tableData} />

      <div style={{ margin: "30px 0" }}>
        <Button type="primary" onClick={triggerBulkDelete}>
          Bulk Delete
        </Button>
      </div>

      <SellBikeModal
        modalIsOpen={modalIsOpen}
        setIsOpen={setIsOpen}
        bikeId={bikeId}
      />
    </>
  );
};

type TSellBikeProps = {
  modalIsOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  bikeId: string;
};

const SellBikeModal = ({ modalIsOpen, setIsOpen, bikeId }: TSellBikeProps) => {
  const [createSell] = useCreateSellMutation();

  const showModal = () => {
    setIsOpen(true);
  };

  const handleCancel = () => {
    setIsOpen(false);
  };

  const onSubmit = async (data: FieldValues) => {
    try {
      const quantity = Number(data.quantity);
      createSell({ ...data, bikeId, quantity });
      toast.success("Sell recored");
      setIsOpen(false);
    } catch (error) {
      toast.error("Something went wrong");
    }
  };

  return (
    <>
      <Modal
        title="Sell Bike"
        open={modalIsOpen}
        onCancel={handleCancel}
        footer={null}
      >
        <FormContainer onSubmit={onSubmit}>
          <CustomizeInput
            type="number"
            name="quantity"
            label="Order Quantity:"
          />
          <CustomizeInput type="text" name="buyerName" label="Buyer Name:" />
          <CustomizeDatePicker name="date" label="Date of the sale:" />

          <Button htmlType="submit" type="primary">
            Sell
          </Button>
        </FormContainer>
      </Modal>
    </>
  );
};

export default Bikes;
