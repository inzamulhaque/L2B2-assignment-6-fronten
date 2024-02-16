import { Layout, Menu } from "antd";
import sidebarItemsGenerator from "../../utils/sidebarItemsGenerator";

import sellerPath from "../../routes/seller.routes";
import { IUser, useCurrentToken } from "../../redux/features/auth/authSlice";
import buyerPath from "../../routes/maintenance.routes";
import { useAppSelector } from "../../redux/hooks";
import verifyToken from "../../utils/verifyToken";

const { Sider } = Layout;

const Sidebar = () => {
  const token = useAppSelector(useCurrentToken);

  let user;

  if (token) {
    user = verifyToken(token);
  }

  let sidebarItems;

  switch ((user as IUser)!.role) {
    case "seller":
      sidebarItems = sidebarItemsGenerator(sellerPath, "seller");
      break;
    case "buyer":
      sidebarItems = sidebarItemsGenerator(buyerPath, "buyer");
      break;

    default:
      break;
  }

  return (
    <>
      <Sider
        breakpoint="lg"
        collapsedWidth="0"
        style={{ height: "100vh", position: "sticky", top: "0", left: "0" }}
      >
        <div
          style={{
            color: "white",
            height: "4rem",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <h1>IH Bikes</h1>
        </div>
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={["4"]}
          items={sidebarItems}
        />
      </Sider>
    </>
  );
};

export default Sidebar;
