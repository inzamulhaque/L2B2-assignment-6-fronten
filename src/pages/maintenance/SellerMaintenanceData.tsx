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
  buyerEmail: string;
  date: string;
  nextScheduled: string;
  reqDate: string;
  status: string;
};

type TMaintenanceData = {
  _id: string;
  buyerEmail: string;
  date: string;
  nextScheduled: string;
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
    buyerEmail: data.buyerEmail,
    date: data.date,
    nextScheduled: data.nextScheduled,
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
      title: "Buyer Email",
      key: "buyerEmail",
      dataIndex: "buyerEmail",
    },

    {
      title: "Last Date of Servicing",
      key: "date",
      dataIndex: "date",
    },

    {
      title: "Next Scheduled",
      key: "nextScheduled",
      dataIndex: "nextScheduled",
    },

    {
      title: "Request Date",
      key: "reqDate",
      dataIndex: "reqDate",
    },

    {
      title: "Status",
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
