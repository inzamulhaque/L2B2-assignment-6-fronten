import { ReactNode } from "react";
import {
  FieldValues,
  FormProvider,
  SubmitHandler,
  useForm,
} from "react-hook-form";

interface IFormConfig {
  defaultValues?: Record<string, any>;
}

interface IFormProps extends IFormConfig {
  onSubmit: SubmitHandler<FieldValues>;
  children: ReactNode;
}

const FormContainer = ({ onSubmit, children, defaultValues }: IFormProps) => {
  const formConfig: IFormConfig = {};

  if (defaultValues) {
    formConfig["defaultValues"] = defaultValues;
  }

  const methods = useForm(formConfig);

  return (
    <>
      <FormProvider {...methods}>
        <form onSubmit={methods.handleSubmit(onSubmit)}>{children}</form>
      </FormProvider>
    </>
  );
};

export default FormContainer;
