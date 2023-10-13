import { Button, Input } from "antd";
import { ColumnsType, TableProps } from "antd/es/table";
import React from "react";
import { Table } from "antd";
import { ExportOutlined, ImportOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
interface DataType {
  key: React.Key;
  name: string;
  chinese: number;
  math: number;
  english: number;
}
const AdminAuthor = () => {
  const navigate = useNavigate();
  const columns: ColumnsType<DataType> = [
    {
      title: "Name",
      dataIndex: "name",
      fixed: true,
    },
    {
      title: "Chinese Score",
      dataIndex: "chinese",
      sorter: {
        compare: (a, b) => a.chinese - b.chinese,
        multiple: 3,
      },
    },
    {
      title: "Math Score",
      dataIndex: "math",
      sorter: {
        compare: (a, b) => a.math - b.math,
        multiple: 2,
      },
    },
    {
      title: "English Score",
      dataIndex: "english",
      sorter: {
        compare: (a, b) => a.english - b.english,
        multiple: 1,
      },
    },
  ];

  const data: DataType[] = [
    {
      key: "1",
      name: "John Brown",
      chinese: 98,
      math: 60,
      english: 70,
    },
    {
      key: "2",
      name: "Jim Green",
      chinese: 98,
      math: 66,
      english: 89,
    },
    {
      key: "3",
      name: "Joe Black",
      chinese: 98,
      math: 90,
      english: 70,
    },
    {
      key: "4",
      name: "Jim Red",
      chinese: 88,
      math: 99,
      english: 89,
    },
  ];

  const onChange: TableProps<DataType>["onChange"] = (
    pagination,
    filters,
    sorter,
    extra
  ) => {
    console.log("params", pagination, filters, sorter, extra);
  };

  return (
    <div className="admin-author-container">
      <div className="admin-author-search mb-3 ">
        <div className="grid grid-cols-4 gap-x-3">
          <Input placeholder="Search Name Author" />
          <Input placeholder="Search Book" />
          <Button
            className="bg-[#1677ff] max-[768px]:text-[13px] max-[768px]:px-[0px] max-[640px]:text-[12px]"
            type="primary"
          >
            Search
          </Button>
          <Button className="text-black max-[768px]:text-[13px] max-[768px]:px-[0px] max-[640px]:text-[12px] ">
            Clear
          </Button>
        </div>
      </div>
      <div className="admin-author-list-button mb-3 grid grid-cols-3 ">
        <Button
          className="bg-[#1677ff] mr-2 max-[768px]:text-[13px] max-[768px]:px-[0px] max-[640px]:text-[12px]"
          type="primary"
          onClick={() => navigate("create")}
        >
          Create
        </Button>
        <Button className="text-black mr-2 max-[768px]:text-[13px] max-[768px]:px-[0px] max-[640px]:text-[12px]">
          <ExportOutlined />
          Export
        </Button>
        <Button className="text-black max-[768px]:text-[13px] max-[768px]:px-[0px] max-[640px]:text-[12px]">
          <ImportOutlined />
          Import
        </Button>
      </div>
      <div className="admin-author-table">
        <Table
          scroll={{ x: true }}
          columns={columns}
          dataSource={data}
          onChange={onChange}
        />
      </div>
    </div>
  );
};

export default AdminAuthor;
