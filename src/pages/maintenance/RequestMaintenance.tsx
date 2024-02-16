import { useState } from "react";
import { useGetAllBikesQuery } from "../../redux/features/bike/bikeApi";
import { FieldValues } from "react-hook-form";
import FormContainer from "../../components/form/FormContainer";
import CustomizeInput from "../../components/form/CustomizeInput";
import { Button, Col, Modal, Row, Table, TableColumnsType } from "antd";
import { TBike, TTableType } from "../bike/Bikes";
import moment from "moment";
import CustomizeDatePicker from "../../components/form/CustomizeDatePicker";
import { toast } from "sonner";
import { useRequestMaintenanceMutation } from "../../redux/features/maintenance/maintenanceApi";

type TRes = {
  data?: {
    success: boolean;
    message: string;
  };
  error?: {
    data: {
      message: string;
    };
  };
};

const RequestMaintenance = () => {
  const [search, setSearch] = useState(null);

  const { data: bikes, isFetching } = useGetAllBikesQuery(search);

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
              <AddMarksModal bikeKey={item.key} />
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

const AddMarksModal = ({ bikeKey }: { bikeKey: string }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [addReqMainenance] = useRequestMaintenanceMutation();

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const onSubmit = async (data: FieldValues) => {
    const toastId = toast.success("Creating...");

    try {
      const reqMaintenanceData = {
        bikeId: bikeKey,
        date: moment(new Date(data.date as string)).format("ll"),
        nextScheduled: moment(new Date(data.nextScheduled as string)).format(
          "ll"
        ),
        serviceDetails: data.serviceDetails,
        notes: data.notes,
      };

      console.log(reqMaintenanceData);

      const res = (await addReqMainenance(reqMaintenanceData)) as TRes;

      if (res?.data?.success === true) {
        toast.success(res?.data?.message, { id: toastId });
        setIsModalOpen(false);
      } else {
        toast.error(res?.error?.data?.message, { id: toastId });
      }
    } catch (error) {
      toast.error("something went wrong", { id: toastId });
    }
  };

  return (
    <>
      <Button onClick={showModal} type="primary">
        Request Maintenance
      </Button>
      <Modal
        title="Request Maintenance"
        open={isModalOpen}
        onCancel={handleCancel}
        footer={null}
      >
        <FormContainer onSubmit={onSubmit}>
          <CustomizeDatePicker name="date" label="Date of the Last Servicing" />

          <CustomizeDatePicker
            name="nextScheduled"
            label="Next Scheduled Servicing Date"
          />

          <CustomizeInput
            type="text"
            name="serviceDetails"
            label="Service Details"
          />

          <CustomizeInput type="text" name="notes" label="Notes" />

          <Button htmlType="submit" type="primary">
            Request Maintenance
          </Button>
        </FormContainer>
      </Modal>
    </>
  );
};

export default RequestMaintenance;
