import { Layout, Menu } from "antd";
import sidebarItemsGenerator from "../../utils/sidebarItemsGenerator";
import bikePath from "../../routes/bike.routes";
import { NavLink } from "react-router-dom";

const { Sider } = Layout;

const Sidebar = () => {
  const bikeSideBarItem = sidebarItemsGenerator(bikePath, "bikes");
  const sidebarItems = [
    ...bikeSideBarItem,
    { key: "Sales", label: <NavLink to="/sales">Sales</NavLink> },
  ];

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
