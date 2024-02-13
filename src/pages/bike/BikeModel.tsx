import { Button } from "antd";
import Modal from "react-modal";
import FormContainer from "../../components/form/FormContainer";
import CustomizeInput from "../../components/form/CustomizeInput";
import { FieldValues } from "react-hook-form";
import { toast } from "sonner";
import { useCreateSellMutation } from "../../redux/features/sell/sellApi";
import React, { useRef } from "react";

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    overflow: "scroll",
  },
};

interface IProps {
  bikeId: string;
  modalIsOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const BikeModel = ({ modalIsOpen, setIsOpen, bikeId }: IProps) => {
  const [createSell] = useCreateSellMutation();
  const subtitle = useRef<HTMLHeadingElement>(null);
  function afterOpenModal() {
    if (subtitle.current) {
      subtitle.current.style.color = "#000";
    }
  }

  function closeModal() {
    setIsOpen(false);
  }

  const onSubmit = async (data: FieldValues) => {
    try {
      const quantity = Number(data.quantity);
      createSell({ ...data, bikeId, quantity });
      toast.success("Sell recored");
      closeModal();
    } catch (error) {
      toast.error("Something went wrong");
    }
  };

  return (
    <>
      <Modal
        isOpen={modalIsOpen}
        onAfterOpen={afterOpenModal}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Example Modal"
      >
        <h2 ref={subtitle}>Sell</h2>
        <Button type="default" onClick={closeModal}>
          close
        </Button>
        <FormContainer onSubmit={onSubmit}>
          <CustomizeInput
            type="number"
            name="quantity"
            label="Order Quantity:"
          />
          <CustomizeInput type="text" name="buyerName" label="Buyer Name:" />
          <CustomizeInput type="date" name="date" label="Date of the sale:" />

          <Button htmlType="submit" type="primary">
            Sell
          </Button>
        </FormContainer>
      </Modal>
    </>
  );
};

export default BikeModel;
