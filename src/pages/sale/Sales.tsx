import { Button } from "antd";
import { useSalesHistoryQuery } from "../../redux/features/sell/sellApi";
import { CSSProperties, useState } from "react";

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
  const { data: sales } = useSalesHistoryQuery(time);

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

      <table
        style={{
          borderCollapse: "collapse",
          width: "100%",
        }}
      >
        <thead>
          <tr>
            <th style={thStyle}> SL NO. </th>
            <th style={thStyle}> Buyer Name </th>
            <th style={thStyle}> Bike Name </th>
            <th style={thStyle}> Bike Color </th>
            <th style={thStyle}> Bike Quantity </th>
            <th style={thStyle}> Bike Price </th>
            <th style={thStyle}> Total </th>
            <th style={thStyle}> Seller Email </th>
          </tr>
        </thead>

        <tbody>
          {sales?.data?.map((sale: ISale, index: number) => (
            <tr key={index}>
              <td style={tdStyle}>{index + 1}</td>
              <td style={tdStyle}>{sale?.buyerName}</td>
              <td style={tdStyle}>{sale?.bikeId?.name}</td>
              <td style={tdStyle}>{sale?.bikeId?.color}</td>
              <td style={tdStyle}>{sale?.quantity}</td>
              <td style={tdStyle}>{sale?.bikeId?.price}</td>
              <td style={tdStyle}>{sale?.totalAmount}</td>
              <td style={tdStyle}>{sale?.sellerEmail}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};

export default Sales;
