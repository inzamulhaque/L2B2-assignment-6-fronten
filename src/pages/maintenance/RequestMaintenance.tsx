import { useState } from "react";
import { useGetAllBikesQuery } from "../../redux/features/bike/bikeApi";
import { FieldValues } from "react-hook-form";
import FormContainer from "../../components/form/FormContainer";
import CustomizeInput from "../../components/form/CustomizeInput";
import { Button, Col, Row, Table, TableColumnsType } from "antd";
import { TBike, TTableType } from "../bike/Bikes";
import moment from "moment";

const RequestMaintenance = () => {
  const [search, setSearch] = useState(null);

  const { data: bikes, isLoading, isFetching } = useGetAllBikesQuery(search);

  const tableData = bikes?.data?.map((data: TBike) => ({
    key: data._id,
    ...data,
    releaseDate: moment(new Date(data.releaseDate as string)).format("ll"),
  }));

  const columns: TableColumnsType<TTableType> = [
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
            <Col span={24} md={{ span: 4 }}>
              <Button type="primary">Request Maintenance</Button>
            </Col>
          </Row>
        );
      },
    },
  ];

  const onSubmit = (condition: FieldValues) => {
    setSearch(condition.search);
  };

  return (
    <>
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

      <Table loading={isFetching} columns={columns} dataSource={tableData} />
    </>
  );
};

export default RequestMaintenance;
