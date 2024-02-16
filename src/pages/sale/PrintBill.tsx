import { useParams } from "react-router-dom";
import { useGetOrderByIdQuery } from "../../redux/features/sell/sellApi";
import { Button, Col, Row, Table, TableColumnsType } from "antd";
import moment from "moment";
import { useRef } from "react";
import { useReactToPrint } from "react-to-print";

type TTableData = {
  key: string;
  details: string;
  price: string;
  quantity: string;
  total: string;
};

const PrintBill = () => {
  const printRef = useRef();
  const { id } = useParams();

  const handlePrint = useReactToPrint({
    content: () => printRef.current,
  });

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
          <Button onClick={handlePrint} type="primary">
            Print
          </Button>
        </div>

        <div
          ref={printRef}
          style={{
            background: "white",
            padding: "15px",
            borderRadius: "11px",
          }}
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
            <Col span={12}>
              <p>Seller Email: {orderData?.data?.sellerEmail}</p>
            </Col>
            <Col span={6}>
              <p>
                Date:{" "}
                {moment(new Date(orderData?.data?.date as string)).format("ll")}
              </p>
            </Col>

            <Col span={6} style={{ display: "flex", justifyContent: "end" }}>
              <p>Bill No: {(order?._id as string).substring(0, 5)}</p>
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
