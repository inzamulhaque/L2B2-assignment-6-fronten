import { ReactNode } from "react";
import { useAppSelector } from "../../redux/hooks";
import { useCurrentToken } from "../../redux/features/auth/authSlice";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }: { children: ReactNode }) => {
  // const dispatch = useAppDispatch();

  // const [isLoading, setIsLoading] = useState(true);
  // useEffect(() => {
  //   (async () => {
  //     const res = await fetch(
  //       "https://bike-management-dashboard-server.vercel.app/api/v1/auth/refresh-token",
  //       {
  //         method: "POST",
  //         credentials: "include",
  //       }
  //     );

  //     const data = await res.json();

  //     if (data.data.accessToken) {
  //       const userInfo = verifyToken(data.data.accessToken);
  //       dispatch(setUser({ user: userInfo, token: data.data.accessToken }));
  //     }
  //     setIsLoading(false);
  //   })();

  //   setTimeout(() => setIsLoading(false), 3000);
  // }, []);

  // if (isLoading) {
  //   return <h1 style={{ fontWeight: "bold", fontSize: "24px" }}>Loading...</h1>;
  // }
  const token = useAppSelector(useCurrentToken);

  if (!token) {
    return <Navigate to="/user/signin" replace={true} />;
  }

  return children;
};

export default ProtectedRoute;
