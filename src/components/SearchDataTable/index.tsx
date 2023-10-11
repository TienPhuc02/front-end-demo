import React from "react";
import { Button, Input } from "antd";

const SearchDataTable: React.FC = () => {
  return (
    <div className="flex gap-[20px] items-center justify-center">
      <div>
        <p className="mb-[10px]">Tìm Kiếm Theo Author:</p>
        <Input
          className="max-w-[200px] mb-[20px]"
          placeholder="tìm Kiếm Theo Author"
        />
      </div>
      <div>
        <p className="mb-[10px]">Tìm Kiếm Theo Email:</p>
        <Input
          className="max-w-[200px] mb-[20px]"
          placeholder="tìm Kiếm Theo Email"
        />
      </div>
      <div>
        <p className="mb-[10px]">Tìm Kiếm Theo Book:</p>
        <Input
          className="max-w-[200px] mb-[20px]"
          placeholder="tìm Kiếm Theo Book"
        />
      </div>
      <div>
        <Button
          type="primary"
          className="button-submit-search-data bg-[#1677ff] mr-2"
        >
          Search
        </Button>
        <Button className="button-submit-search-data ">Clear & Refresh</Button>
      </div>
    </div>
  );
};

export default SearchDataTable;
