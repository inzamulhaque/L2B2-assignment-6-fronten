import { Button } from "antd";
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
import { CSSProperties, ChangeEvent, useState } from "react";
import BikeModel from "./BikeModel";
import { IBike } from "./BikeDetails";
import { toast } from "sonner";

const Bikes = () => {
  const [search, setSearch] = useState(null);
  const [modalIsOpen, setIsOpen] = useState<boolean>(false);
  const [bikeId, setBikeId] = useState("");
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const { data: bikes, isLoading } = useGetAllBikesQuery(search);
  const [deleteOneBike] = useDeleteOneBikeMutation();
  const [deleteBlukBike] = useDeleteBulkBikeMutation();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  if (isLoading) {
    return (
      <>
        <p>Loading...</p>
      </>
    );
  }

  const editBike = (bike: IBike) => {
    dispatch(addBike(bike));
    navigate("/bikes/edit");
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

  const thStyle: CSSProperties = {
    padding: "10px",
    textAlign: "center",
    fontWeight: "bold",
    border: "1px solid black",
  };

  const tdStyle: CSSProperties = {
    padding: "10px",
    textAlign: "center",
    border: "1px solid black",
  };

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

      <table
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
            <th style={thStyle}> Owner Email </th>
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
                  <td style={tdStyle}>{bike.userEmail}</td>
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
                      type="default"
                      onClick={() => {
                        setIsOpen(true);
                        setBikeId(bike._id);
                      }}
                    >
                      Sell
                    </Button>
                  </td>
                </tr>
              )
          )}
        </tbody>
      </table>

      <div style={{ margin: "30px 0" }}>
        <Button type="primary" onClick={triggerBulkDelete}>
          Bulk Delete
        </Button>
      </div>

      <BikeModel
        modalIsOpen={modalIsOpen}
        setIsOpen={setIsOpen}
        bikeId={bikeId}
      />
    </>
  );
};

export default Bikes;
