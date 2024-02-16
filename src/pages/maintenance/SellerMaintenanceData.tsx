import { Button, Table, TableColumnsType } from "antd";
import {
  useAcceptMaintenanceRequestMutation,
  useGetAllMaintenanceDataQuery,
} from "../../redux/features/maintenance/maintenanceApi";
import moment from "moment";
import { toast } from "sonner";

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

const SellerMaintenanceData = () => {
  const { data: maintenanceData, isFetching } =
    useGetAllMaintenanceDataQuery(undefined);

  const [acceptRequest] = useAcceptMaintenanceRequestMutation();

  const tableData = maintenanceData?.data?.map((data: TMaintenanceData) => ({
    key: data._id,
    bikeName: data?.bikeId?.name,
    reqDate: moment(new Date(data.createdAt as string)).format("ll"),
    status: data.status,
  }));

  const handleAccepting = (id: string) => {
    acceptRequest(id);
  };

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
      title: "Action",
      key: "X",
      render: (item) => {
        if (item.status === "pending") {
          return (
            <Button onClick={() => handleAccepting(item.key)} type="primary">
              {item.status}
            </Button>
          );
        }

        if (item.status === "accepted") {
          return (
            <Button type="default" disabled>
              {item.status}
            </Button>
          );
        }
      },
    },
  ];

  return (
    <>
      <Table loading={isFetching} columns={columns} dataSource={tableData} />
    </>
  );
};

export default SellerMaintenanceData;
