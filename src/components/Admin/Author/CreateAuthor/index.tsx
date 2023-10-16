import { PlusOutlined } from "@ant-design/icons";
import {
  Button,
  Form,
  FormInstance,
  Input,
  Modal,
  message,
  notification,
} from "antd";
import Upload, { RcFile, UploadFile, UploadProps } from "antd/es/upload";
import { FixedSizeList as List } from "react-window";
import React, { useState, useRef } from "react";
import AutoSizer from "react-virtualized-auto-sizer";
import { callCreateAuthor, callUploadAvatarImg } from "../../../../service/api";
import ModalAfterCreate from "../../../ModalAfterCreate";
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
type handleUploadFileThumbnailOptions = {
  file: UploadFile;
  onSuccess: (response: string) => void;
  onError: (error: Error) => void;
};
const getBase64 = (file: RcFile): Promise<string> =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = (error) => reject(error);
  });
const CreateAuthor: React.FC = () => {
  const [previewOpen, setPreviewOpen] = useState(false);
  const formRef = React.useRef<FormInstance>(null);
  const [previewImage, setPreviewImage] = useState<string | undefined>("");
  const [previewTitle, setPreviewTitle] = useState<string | undefined>("");
  const [fileList, setFileList] = useState<UploadFile[]>([]);
  const [imageThumbnail, setImageThumbnail] = useState<string[]>([]);
  const [dataThumbnail, setDataThumbnail] = useState<
    {
      name: string;
      uid: string;
    }[]
  >([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [totalBook, setTotalBook] = useState(0); // Số lượng sách
  const nameBookRefs = useRef<string[]>([]);
  const showModalAfterCreate = () => {
    setIsModalOpen(true);
  };

  const handleOkAfterCreate = () => {
    setIsModalOpen(false);
  };

  const handleCancelAfterCreate = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => setPreviewOpen(false);
  const handlePreview = async (file: UploadFile) => {
    console.log("🚀 ~ file: index.tsx:37 ~ handlePreview ~ file:", file);
    if (file.originFileObj) {
      if (!file.thumbUrl && !file.preview) {
        file.preview = await getBase64(file.originFileObj);
      }
    }
    setPreviewImage(file.thumbUrl || file.preview);
    setPreviewOpen(true);
    setPreviewTitle(
      file.name ||
        (file.thumbUrl
          ? file.thumbUrl.substring(file.thumbUrl.lastIndexOf("/") + 1)
          : "")
    );
  };
  const onFill = () => {
    formRef.current?.setFieldsValue({
      nameAuthor: "nameAuthor",
      address: "address",
      email: "email",
      avatar: "avatar",
      gender: "gender",
      nation: "nation",
      nameBook: ["book", "book1", "book2"],
      phone: 123456789,
      totalBook: 3,
    });
  };
  const beforeUpload = (file: RcFile) => {
    console.log("🚀 ~ file: index.tsx:48 ~ beforeUpload ~ file:", file);
    const isJpgOrPng = file.type === "image/jpeg" || file.type === "image/png";
    if (!isJpgOrPng) {
      message.error("You can only upload JPG/PNG file!");
    }
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
      message.error("Image must smaller than 2MB!");
    }
    return isJpgOrPng && isLt2M;
  };
  const handleUploadFileThumbnail = async (
    options: handleUploadFileThumbnailOptions
  ) => {
    const { file, onSuccess, onError } = options;
    if (file instanceof File) {
      console.log("🚀 ~ file: index.tsx:112 ~ file:", file);
      const res = await callUploadAvatarImg(file);
      if (res && res.data && res.data.data.file) {
        setDataThumbnail([
          ...dataThumbnail,
          {
            name: res.data.data.file.filename,
            uid: file.uid,
          },
        ]);
        setImageThumbnail([...imageThumbnail, file.name]);
        onSuccess("ok");
      }
    } else {
      onError(new Error("Invalid file type"));
    }
  };
  const handleChange: UploadProps["onChange"] = ({ fileList: newFileList }) =>
    setFileList(newFileList);
  const uploadButton = (
    <div className="max-[640px]:text-[10px]  max-[640px]:w-[50px] ">
      <PlusOutlined />
      <div>Upload</div>
    </div>
  );
  const onFinish = async (values: FieldType) => {
    const nameBookValues = nameBookRefs.current;
    const dataCreateAuthor = {
      nameAuthor: values.nameAuthor,
      address: values.address,
      email: values.email,
      avatar: imageThumbnail,
      gender: values.gender,
      nation: values.nation,
      nameBook: nameBookValues,
      phone: values.phone,
      totalBook: values.totalBook,
    };
    if (dataThumbnail && dataThumbnail.length === 0) {
      notification.error({
        message: "có lỗi xảy ra",
        description: "vui lòng upload ảnh thumbnail",
      });
      return;
    }
    const res = await callCreateAuthor(dataCreateAuthor);
    console.log(res);
    if (res && res.data) {
      message.success("Create Author Success");
      showModalAfterCreate();
    }
  };

  const onFinishFailed = (errorInfo: object) => {
    console.log("Failed:", errorInfo);
  };
  const onReset = () => {
    formRef.current?.resetFields();
  };
  console.log("🚀 ~ file: index.tsx:43 ~ dataThumbnail:", dataThumbnail);
  return (
    <Form
      name="dataAuthor"
      ref={formRef}
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
            onPreview={handlePreview}
            customRequest={handleUploadFileThumbnail as UploadProps['customRequest']}
            maxCount={1}
            multiple={false}
            name="avatar"
            listType="picture-card"
            fileList={fileList}
            beforeUpload={beforeUpload}
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
      <div>
        <ModalAfterCreate
          isModalOpen={isModalOpen}
          handleOkAfterCreate={handleOkAfterCreate}
          handleCancelAfterCreate={handleCancelAfterCreate}
        />
      </div>
      <Form.Item>
        <div className=" flex gap-1">
          <Button className="bg-[#1677ff] " type="primary" htmlType="submit">
            Submit
          </Button>
          <Button htmlType="button" onClick={onReset}>
            Reset
          </Button>
          <Button type="link" htmlType="button" onClick={onFill}>
            Fill form
          </Button>
        </div>
      </Form.Item>
    </Form>
  );
};

export default CreateAuthor;
