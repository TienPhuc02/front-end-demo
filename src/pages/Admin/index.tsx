import React, { useState } from "react";
import {
  BlockOutlined,
  BookOutlined,
  ExportOutlined,
  ImportOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Layout, Menu, Button, theme } from "antd";
import TableData from "../../components/TableData";
import SearchDataTable from "../../components/SearchDataTable";

const { Header, Sider, Content } = Layout;

const AdminPage: React.FC = () => {
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  return (
    <Layout style={{ height: "auto" }}>
      <Sider
        theme="light"
        style={{ height: "auto" }}
        collapsible
        collapsed={collapsed}
        onCollapse={(value) => setCollapsed(value)}
      >
        <div className="demo-logo-vertical" />
        <Menu
          theme="light"
          mode="inline"
          defaultSelectedKeys={["1"]}
          items={[
            {
              key: "1",
              icon: <UserOutlined />,
              label: "Author",
            },
            {
              key: "2",
              icon: <BookOutlined />,
              label: "Book",
            },
            {
              key: "3",
              icon: <BlockOutlined />,
              label: "Chapter",
            },
          ]}
        />
      </Sider>
      <Layout>
        <Header style={{ padding: 0, background: colorBgContainer }}>
          <Button
            type="text"
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={() => setCollapsed(!collapsed)}
            style={{
              fontSize: "16px",
              width: 64,
              height: 64,
            }}
          />
        </Header>
        <Content
          style={{
            height: "auto",
            margin: "24px 16px",
            padding: 24,
            minHeight: 280,
            background: colorBgContainer,
          }}
        >
          <div className="search-data-table">
            <SearchDataTable />
          </div>
          <div className="list-button-author float-right mb-[20px] flex gap-[10px]">
            <Button
              type="primary"
              className="button-create-author bg-[#1677ff]"
            >
              Create Author
            </Button>
            <Button className="button-export-data flex justify-center items-center">
              <ExportOutlined />
              Export
            </Button>
            <Button className="button-import-data flex justify-center items-center">
            <ImportOutlined />
              Import</Button>
          </div>
          <div className="table-data-author">
            <TableData />
          </div>
        </Content>
      </Layout>
    </Layout>
  );
};

export default AdminPage;
