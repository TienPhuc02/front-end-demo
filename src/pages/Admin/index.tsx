import React, { useEffect, useState } from "react";
import {
  DesktopOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  PieChartOutlined,
  UserOutlined,
} from "@ant-design/icons";
import type { MenuProps } from "antd";
import { Button, Layout, Menu } from "antd";
import { Link, Outlet } from "react-router-dom";

const { Header, Content, Footer, Sider } = Layout;

type MenuItem = Required<MenuProps>["items"][number];

function getItem(
  label: React.ReactNode,
  key: React.Key,
  icon?: React.ReactNode,
  children?: MenuItem[]
): MenuItem {
  return {
    key,
    icon,
    children,
    label,
  } as MenuItem;
}

const items: MenuItem[] = [
  getItem(<>DashBoard</>, "1", <PieChartOutlined />),
  getItem(<Link to="author">Author</Link>, "2", <DesktopOutlined />),
  getItem(<Link to="book">Book</Link>, "3", <UserOutlined />),
  getItem("Chapter", "4", <UserOutlined />),
];

const AdminPage: React.FC = () => {
  const [collapsed, setCollapsed] = useState(window.innerWidth < 640);
  
  const handleCollapse = () => {
    if (window.innerWidth < 640) {
      setCollapsed(true);
    }
  };
  useEffect(() => {
    // Gọi hàm updateSiderCollapse ban đầu để thiết lập giá trị ban đầu
    handleCollapse();

    // Theo dõi thay đổi kích thước cửa sổ và cập nhật trạng thái collapsed
    window.addEventListener("resize", handleCollapse);

    // Loại bỏ sự kiện khi component bị unmount
    return () => {
      window.removeEventListener("resize", handleCollapse);
    };
  }, [handleCollapse]);
  return (
    <Layout className="min-h-[100vh]">
      <Sider
        theme="light"
        className="max-[640px]:max-w-[80px]"
        collapsible
        collapsed={collapsed}
        onCollapse={(value) => setCollapsed(value)}
      >
        <div className="demo-logo-vertical" />
        <Menu
          theme="light"
          defaultSelectedKeys={["1"]}
          mode="inline"
          items={items}
        />
      </Sider>
      <Layout>
        <Header className="bg-white p-0">
          <Button
            type="text"
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={() => setCollapsed(!collapsed)}
            style={{
              fontSize: "16px",
              width: 64,
              height: 64,
            }}
            className="text-[16px] w-[60px] h-[60px]"
          />
        </Header>
        <Content className="my-0 mx-[16px]">
          <div className="p-6 mt-4 min-h-[71vh] bg-white">
            <Outlet />
          </div>
        </Content>
        <Footer className="text-center">
          Ant Design ©2023 Created by Ant UED
        </Footer>
      </Layout>
    </Layout>
  );
};

export default AdminPage;
