import { FieldValues } from "react-hook-form";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import verifyToken from "../utils/verifyToken";
import { useLoginMutation } from "../redux/features/auth/authApi";
import { useAppDispatch } from "../redux/hooks";
import { setUser } from "../redux/features/auth/authSlice";
import FormContainer from "../components/form/FormContainer";
import { Button, Row } from "antd";
import CustomizeInput from "../components/form/CustomizeInput";

const Login = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

  const [login] = useLoginMutation();
  const dispatch = useAppDispatch();

  const onSubmit = async (info: FieldValues) => {
    const loadingToastId = toast.loading("Login in proccess! Please wait");

    try {
      const res = await login(info).unwrap();

      const userInfo = verifyToken(res.data.accessToken);

      dispatch(setUser({ user: userInfo, token: res.data.accessToken }));
      toast.success("Loging successful", {
        id: loadingToastId,
        duration: 3000,
      });
      navigate(from, { replace: true });
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
          <CustomizeInput type="email" name="email" label="Email:" />

          <CustomizeInput type="password" name="password" label="Password:" />

          <div style={{ margin: "15px 0" }}>
            <p
              onClick={() => navigate("/user/signup")}
              style={{
                textDecoration: "underline",
                color: "blue",
                cursor: "pointer",
              }}
            >
              You Have No Account?
            </p>
          </div>

          <Button htmlType="submit">SignIn</Button>
        </FormContainer>
      </Row>
    </>
  );
};

export default Login;
