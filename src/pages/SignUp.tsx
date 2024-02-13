import { Button, Row } from "antd";
import FormContainer from "../components/form/FormContainer";
import CustomizeInput from "../components/form/CustomizeInput";
import { useNavigate } from "react-router-dom";
import { FieldValues } from "react-hook-form";
import { toast } from "sonner";
import { useSignupMutation } from "../redux/features/auth/authApi";

const SignUp = () => {
  const navigate = useNavigate();
  const [signup] = useSignupMutation();

  const onSubmit = (info: FieldValues) => {
    const loadingToastId = toast.loading("Signup in proccess! Please wait");
    try {
      if (info.password === info.confirmPassword) {
        signup(info);
        toast.success("SignUp successfully!", {
          id: loadingToastId,
        });
        navigate("/user/signin");
      } else {
        toast.error(
          "Password and confirm password does not match! Please try again",
          {
            id: loadingToastId,
          }
        );
      }
    } catch (error) {
      toast.error("Something went wrong! Please try again", {
        id: loadingToastId,
      });
    }
  };

  return (
    <>
      <Row justify="center" align="middle" style={{ height: "100vh" }}>
        <FormContainer onSubmit={onSubmit}>
          <CustomizeInput type="name" name="name" label="Name:" />

          <CustomizeInput type="email" name="email" label="Email:" />

          <CustomizeInput type="password" name="password" label="Password:" />

          <CustomizeInput
            type="password"
            name="confirmPassword"
            label="Confirm Password:"
          />

          <CustomizeInput type="text" name="address" label="Address:" />

          <CustomizeInput type="text" name="contact" label="Contact:" />

          <div style={{ margin: "15px 0" }}>
            <p
              onClick={() => navigate("/user/signin")}
              style={{
                textDecoration: "underline",
                color: "blue",
                cursor: "pointer",
              }}
            >
              You Have Account?
            </p>
          </div>

          <Button htmlType="submit">SignUp</Button>
        </FormContainer>
      </Row>
    </>
  );
};

export default SignUp;
