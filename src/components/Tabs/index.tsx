import React from "react";
import { Tabs } from "antd";
import type { TabsProps } from "antd";
import { useNavigate } from "react-router-dom";

const TabsBar: React.FC = () => {
    const navigate = useNavigate();
    const onChange = (key: string) => {
      console.log(key);
    };
    const items: TabsProps["items"] = [
      {
        key: "1",
        label: "Trang Chủ",
        children: "Content of Tab Pane 1",
      },
      {
        key: "2",
        label: "Tìm Kiếm",
        children: "Content of Tab Pane 2",
      },
      {
        key: "3",
        label: "Lời Chào",
        children: "Content of Tab Pane 3",
      },
      {
        key: "4",
        label: "Tổ Chức",
        children: "Content of Tab Pane 4",
      },
      {
        key: "5",
        label: "Điều Khoản Sử Dụng",
        children: "Content of Tab Pane 5",
      },
      {
        key: "6",
        label: "Cách Sử Dụng",
        children: "Content of Tab Pane 6",
      },
      {
        key: "7",
        label: "Tiếng Anh",
        children: "Content of Tab Pane 7",
      },
      {
        key: "8",
        label:(
            <div onClick={()=>navigate("/admin")}>Quản lí dữ liệu</div>
        ),
      },
    ];
  return <Tabs defaultActiveKey="1" items={items} onChange={onChange} />;
};

export default TabsBar;
