import { useGetMyMaintenanceDataQuery } from "../../redux/features/maintenance/maintenanceApi";

const BuyerMaintenanceData = () => {
  const { data: maintenanceData, isFetching } =
    useGetMyMaintenanceDataQuery(undefined);
  return (
    <>
      <h1>BuyerMaintenanceData</h1>
    </>
  );
};

export default BuyerMaintenanceData;
