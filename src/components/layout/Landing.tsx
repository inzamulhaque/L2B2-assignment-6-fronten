import { Navigate } from "react-router-dom";
import { IUser, useCurrentToken } from "../../redux/features/auth/authSlice";
import { useAppSelector } from "../../redux/hooks";
import verifyToken from "../../utils/verifyToken";

const Landing = () => {
  const token = useAppSelector(useCurrentToken);

  let user;

  if (token) {
    user = verifyToken(token);
  }

  if (user !== undefined && (user as IUser).role === "admin") {
    return <h1>Development Goinin On...</h1>;
  }

  if (user !== undefined && (user as IUser).role === "seller") {
    return <Navigate to="/seller/all-bikes" />;
  }

  if (user !== undefined && (user as IUser).role === "buyer") {
    return <Navigate to="/buyer/request" />;
  }
};

export default Landing;
