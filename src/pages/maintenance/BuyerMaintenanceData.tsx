import moment from "moment";
import { useGetMyMaintenanceDataQuery } from "../../redux/features/maintenance/maintenanceApi";
import { Table, TableColumnsType } from "antd";

type TMaintenanceTable = {
  key: string;
  bikeName: string;
  reqDate: string;
  status: string;
};

type TMaintenanceData = {
  _id: string;
  reqDate: string;
  status: string;
  createdAt: string;
  bikeId: {
    name: string;
  };
};

const BuyerMaintenanceData = () => {
  const { data: maintenanceData, isFetching } =
    useGetMyMaintenanceDataQuery(undefined);

  const tableData = maintenanceData?.data?.map((data: TMaintenanceData) => ({
    key: data._id,
    bikeName: data?.bikeId?.name,
    reqDate: moment(new Date(data.createdAt as string)).format("ll"),
    status: data.status,
  }));

  const columns: TableColumnsType<TMaintenanceTable> = [
    {
      title: "Bike Name",
      key: "bikeName",
      dataIndex: "bikeName",
    },

    {
      title: "Request Date",
      key: "reqDate",
      dataIndex: "reqDate",
    },
    {
      title: "Status",
      key: "status",
      dataIndex: "status",
    },
  ];

  return (
    <>
      <Table loading={isFetching} columns={columns} dataSource={tableData} />
    </>
  );
};

export default BuyerMaintenanceData;
