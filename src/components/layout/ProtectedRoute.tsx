import { ReactNode } from "react";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import {
  IUser,
  logout,
  useCurrentToken,
} from "../../redux/features/auth/authSlice";
import { Navigate } from "react-router-dom";
import verifyToken from "../../utils/verifyToken";

type TProtectedRoute = {
  children: ReactNode;
  role: string | undefined;
};

const ProtectedRoute = ({ children, role }: TProtectedRoute) => {
  const token = useAppSelector(useCurrentToken);

  let user;

  if (token) {
    user = verifyToken(token);
  }

  const dispatch = useAppDispatch();

  if (role !== undefined && role !== (user as IUser)?.role) {
    dispatch(logout());
    return <Navigate to="/user/signin" replace={true} />;
  }
  if (!token) {
    return <Navigate to="/user/signin" replace={true} />;
  }

  return children;
};

export default ProtectedRoute;
