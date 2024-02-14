import { Form, Select } from "antd";
import { Controller } from "react-hook-form";

export type TSelect = { value: string; label: string; disabled?: boolean };

type TPHSelectProps = {
  label?: string;
  name: string;
  options: TSelect[] | undefined;
  disabled?: boolean;
  placeholder?: string;
  mode?: "multiple" | undefined;
};

const CustomizeSelect = ({
  label,
  name,
  options,
  disabled,
  placeholder,
  mode,
}: TPHSelectProps) => {
  return (
    <Controller
      name={name}
      render={({ field, fieldState: { error } }) => (
        <Form.Item label={label}>
          <Select
            mode={mode}
            style={{ width: "100%" }}
            {...field}
            placeholder={placeholder ?? null}
            options={options}
            disabled={disabled}
            size="large"
          />
          {error && <small style={{ color: "red" }}>{error.message}</small>}
        </Form.Item>
      )}
    />
  );
};

export default CustomizeSelect;
