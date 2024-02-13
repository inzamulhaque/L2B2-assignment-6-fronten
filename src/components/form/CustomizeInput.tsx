import { Input } from "antd";
import { Controller } from "react-hook-form";

interface IInputProps {
  type: string;
  name: string;
  label?: string;
}

const CustomizeInput = ({ type, name, label }: IInputProps) => {
  return (
    <>
      <div style={{ marginBottom: "20px" }}>
        {label ? label : null}
        <Controller
          name={name}
          render={({ field }) => (
            <Input {...field} type={type} id={name} placeholder={name} />
          )}
        />
      </div>
    </>
  );
};

export default CustomizeInput;
