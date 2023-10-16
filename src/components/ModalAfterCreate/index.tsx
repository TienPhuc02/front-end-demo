import { Modal } from "antd";
type ModalAfterCreateProps = {
  isModalOpen: boolean;
  handleOkAfterCreate: () => void;
  handleCancelAfterCreate: () => void;
};
const ModalAfterCreate = ({
  isModalOpen,
  handleOkAfterCreate,
  handleCancelAfterCreate,
}: ModalAfterCreateProps) => {
  return (
    <div>
      <Modal
        title="Basic Modal"
        open={isModalOpen}
        onOk={handleOkAfterCreate}
        okButtonProps={{ style: { backgroundColor: "#1677ff" } }}
        onCancel={handleCancelAfterCreate}
      >
        <p>Some contents...</p>
        <p>Some contents...</p>
        <p>Some contents...</p>
      </Modal>
    </div>
  );
};

export default ModalAfterCreate;
