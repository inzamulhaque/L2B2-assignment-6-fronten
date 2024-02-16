import { useParams } from "react-router-dom";
import { useGetOrderByIdQuery } from "../../redux/features/sell/sellApi";
import { Button, Col, Row, Table, TableColumnsType } from "antd";
import moment from "moment";

type TTableData = {
  key: string;
  details: string;
  price: string;
  quantity: string;
  total: string;
};

const PrintBill = () => {
  const { id } = useParams();

  const { data: orderData, isFetching } = useGetOrderByIdQuery(id, {
    skip: !id,
  });

  if (!isFetching && !orderData?.success) {
    return <h3>please provide a valid order id</h3>;
  }

  const order = orderData?.data;

  const tableData = {
    key: order?._id,
    details: `${order?.bikeId?.name} - ${order?.bikeId?.color} - ${order?.bikeId?.model} - ${order?.bikeId?.brand}`,
    price: order?.bikeId?.price,
    quantity: order?.quantity,
    total: order?.totalAmount,
  };

  const columns: TableColumnsType<TTableData> = [
    {
      title: "Details",
      key: "details",
      dataIndex: "details",
    },
    {
      title: "Price Per Unit",
      key: "price",
      dataIndex: "price",
    },
    {
      title: "Quantity",
      key: "quantity",
      dataIndex: "quantity",
    },
    {
      title: "Total",
      key: "total",
      dataIndex: "total",
    },
  ];

  return (
    <>
      <div style={{ margin: "5px" }}>
        <div
          style={{
            display: "flex",
            justifyContent: "end",
            marginBottom: "7px",
          }}
        >
          <Button type="primary">Print</Button>
        </div>

        <div
          style={{ background: "white", padding: "15px", borderRadius: "11px" }}
        >
          <small style={{ textAlign: "center", display: "block" }}>
            Bismillahir Rahmanir Rahim
          </small>
          <h1
            style={{ margin: "7px", textAlign: "center", color: "royalblue" }}
          >
            IH Bike Shop
          </h1>

          <h3 style={{ margin: "7px 0" }}>
            Name: {orderData?.data?.buyerName}
          </h3>

          <Row>
            <Col span={16}>
              <p>Seller Email: {orderData?.data?.sellerEmail}</p>
            </Col>
            <Col span={8}>
              <p>
                Date:{" "}
                {moment(new Date(orderData?.data?.date as string)).format("ll")}
              </p>
            </Col>
          </Row>

          <Table
            loading={isFetching}
            columns={columns}
            dataSource={[tableData]}
            pagination={false}
          />
        </div>
      </div>
    </>
  );
};

export default PrintBill;
