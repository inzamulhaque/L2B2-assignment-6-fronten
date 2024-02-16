import { Button, Table, TableColumnsType } from "antd";
import { useSalesHistoryQuery } from "../../redux/features/sell/sellApi";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export interface ISale {
  _id: string;
  buyerName: string;
  bikeId: {
    _id: string;
    name: string;
    color: string;
    price: number;
  };
  quantity: number;
  totalAmount: number;
  sellerEmail: string;
}

const Sales = () => {
  const [time, seTime] = useState("Monthly");
  const { data: sales, isFetching } = useSalesHistoryQuery(time);

  const navigate = useNavigate();

  const tableData = sales?.data?.map((sale: ISale, index: number) => ({
    sl: index + 1,
    key: sale._id,
    buyerName: sale?.buyerName,
    bikeName: sale?.bikeId?.name,
    bikeColor: sale?.bikeId?.color,
    quantity: sale?.quantity,
    price: sale?.bikeId?.price,
    total: sale?.totalAmount,
    sellerEmail: sale?.sellerEmail,
  }));

  const handlePrintBill = (id: string) => {
    navigate(`/seller/bill/${id}`);
  };

  const columns: TableColumnsType<ISale> = [
    {
      title: "SL No",
      key: "sl",
      dataIndex: "sl",
    },
    {
      title: "Buyer Name",
      key: "buyerName",
      dataIndex: "buyerName",
    },
    {
      title: "Bike Name",
      key: "bikeName",
      dataIndex: "bikeName",
    },
    {
      title: "Bike Color",
      key: "bikeColor",
      dataIndex: "bikeColor",
    },
    {
      title: "Quantity",
      key: "quantity",
      dataIndex: "quantity",
    },
    {
      title: "Price",
      key: "price",
      dataIndex: "price",
    },
    {
      title: "Total",
      key: "total",
      dataIndex: "total",
    },
    {
      title: "Seller Email",
      key: "sellerEmail",
      dataIndex: "sellerEmail",
    },

    {
      title: "Action",
      key: "X",
      render: (item) => {
        return (
          <Button onClick={() => handlePrintBill(item.key)} type="primary">
            Print Bill
          </Button>
        );
      },
    },
  ];

  return (
    <>
      <h1>Total Sales</h1>

      <div
        style={{
          margin: "30px 0",
          display: "flex",
          justifyContent: "space-evenly",
        }}
      >
        <Button type="primary" onClick={() => seTime("Daily")}>
          Daily
        </Button>
        <Button type="primary" onClick={() => seTime("Weekly")}>
          Weekly
        </Button>
        <Button type="primary" onClick={() => seTime("Monthly")}>
          Monthly
        </Button>
        <Button type="primary" onClick={() => seTime("Yearly")}>
          Yearly
        </Button>
      </div>

      <Table loading={isFetching} columns={columns} dataSource={tableData} />
    </>
  );
};

export default Sales;
