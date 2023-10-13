import { PlusOutlined } from "@ant-design/icons";
import { Button, Form, Input, Modal } from "antd";
import Upload, { RcFile, UploadFile, UploadProps } from "antd/es/upload";
import { FixedSizeList as List } from "react-window";
import { useState, useRef } from "react";
import AutoSizer from "react-virtualized-auto-sizer";
type FieldType = {
  nameAuthor?: string;
  address?: string;
  email?: string;
  gender?: string;
  nation?: string;
  avatar?: string;
  phone?: number;
  totalBook: number;
  nameBook: string;
};
const getBase64 = (file: RcFile): Promise<string> =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = (error) => reject(error);
  });
const CreateAuthor = () => {
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState("");
  const [previewTitle, setPreviewTitle] = useState("");
  const [fileList, setFileList] = useState<UploadFile[]>([]);
  const [totalBook, setTotalBook] = useState(0); // Số lượng sách
  const nameBookRefs = useRef<string[]>([]);
  const handleCancel = () => setPreviewOpen(false);
  const handlePreview = async (file: UploadFile) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj as RcFile);
    }

    setPreviewImage(file.url || (file.preview as string));
    setPreviewOpen(true);
    setPreviewTitle(
      file.name || file.url!.substring(file.url!.lastIndexOf("/") + 1)
    );
  };

  const handleChange: UploadProps["onChange"] = ({ fileList: newFileList }) =>
    setFileList(newFileList);

  const uploadButton = (
    <div className="max-[640px]:text-[10px]  max-[640px]:w-[50px] ">
      <PlusOutlined />
      <div>Upload</div>
    </div>
  );
  const onFinish = (values: FieldType) => {
    const nameBookValues = nameBookRefs.current;
    console.log("Danh sách giá trị nameBook:", nameBookValues);
    console.log("Success:", {
      nameAuthor: values.nameAuthor,
      address: values.address,
      email: values.email,
      avatar: values.avatar,
      gender: values.gender,
      nation: values.nation,
      nameBook: nameBookValues,
      phone: values.phone,
      totalBook: values.totalBook,
    });
    // Sử dụng nameBooks khi bạn cần gửi dữ liệu lên máy chủ hoặc thực hiện xử lý khác.
  };
  const nameBookValues = nameBookRefs.current;
  console.log("Danh sách giá trị nameBook:", nameBookValues);
  const onFinishFailed = (errorInfo: object) => {
    console.log("Failed:", errorInfo);
  };
  return (
    <Form
      name="dataAuthor"
      onFinishFailed={onFinishFailed}
      autoComplete="off"
      onFinish={onFinish}
    >
      <div className="admin-create-author-container grid grid-cols-4 gap-x-2 gap-y-2">
        <Form.Item<FieldType>
          name="nameAuthor"
          rules={[{ required: true, message: "Please input your nameAuthor!" }]}
        >
          <Input placeholder="nameAuthor" />
        </Form.Item>
        <Form.Item<FieldType>
          name="address"
          rules={[{ required: true, message: "Please input your address!" }]}
        >
          <Input placeholder="address" />
        </Form.Item>
        <Form.Item<FieldType>
          name="email"
          rules={[{ required: true, message: "Please input your email!" }]}
        >
          <Input placeholder="email" />
        </Form.Item>
        <Form.Item<FieldType>
          name="gender"
          rules={[{ required: true, message: "Please input your Gender!" }]}
        >
          <Input placeholder="Gender" />
        </Form.Item>
        <Form.Item<FieldType>
          name="nation"
          rules={[{ required: true, message: "Please input your nation!" }]}
        >
          <Input placeholder="nation" />
        </Form.Item>
        <Form.Item<FieldType>
          name="phone"
          rules={[{ required: true, message: "Please input your Phone!" }]}
        >
          <Input placeholder="Phone" />
        </Form.Item>
        <Form.Item<FieldType>
          name="totalBook"
          rules={[{ required: true, message: "Please input your totalBook!" }]}
        >
          <Input
            placeholder="totalBook"
            onChange={(e) => setTotalBook(parseInt(e.target.value, 10) || 0)}
          />
        </Form.Item>
        <AutoSizer>
          {({ height }) => (
            <List
              height={height}
              width={100}
              itemCount={totalBook}
              itemSize={40}
              itemData={{ nameBookRefs }}
              style={{ overflow: "auto" }}
            >
              {({ index, style }) => (
                <Form.Item
                  key={index}
                  style={{ ...style }}
                  name={`nameBook ${index + 1}`}
                >
                  <Input
                    placeholder={`nameBook ${index + 1}`}
                    onChange={(e) => {
                      const updatedNameBookRefs = [...nameBookRefs.current];
                      updatedNameBookRefs[index] = e.target.value as string;
                      nameBookRefs.current = updatedNameBookRefs;
                    }}
                  />
                </Form.Item>
              )}
            </List>
          )}
        </AutoSizer>
        <Form.Item name="avatar">
          <Upload
            // action="https://run.mocky.io/v3/435e224c-44fb-4773-9faf-380c5e6a2188"
            listType="picture-card"
            fileList={fileList}
            onPreview={handlePreview}
            onChange={handleChange}
          >
            {fileList.length >= 8 ? null : uploadButton}
          </Upload>
        </Form.Item>
        <Modal
          open={previewOpen}
          title={previewTitle}
          footer={null}
          onCancel={handleCancel}
        >
          <img alt="example" style={{ width: "100%" }} src={previewImage} />
        </Modal>
      </div>
      <Form.Item>
        <div className="">
          <Button className="bg-[#1677ff] " type="primary" htmlType="submit">
            Submit
          </Button>
        </div>
      </Form.Item>
    </Form>
  );
};

export default CreateAuthor;
