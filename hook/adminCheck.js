import { useRouter } from "next/router";
import { useEffect } from "react";
import Loading from "../components/Shared/Loading/Loading";
import useAuth from "./useAuth";
// import { useSelector } from "react-redux";

const adminCheck = (WrappedComponent) => {
  const PrivateRoute = () => {
    const {user} = useAuth();
    const router = useRouter();
    // user info
    // const user = useSelector((state) => state?.reducers?.user?.userInfoFromDB);

    useEffect(() => {
      if (user?.role !== "admin") {
        router.replace("/");
      }
    }, [router, user?.role]);

    if (user?.email && user?.role === "admin") {
      return <WrappedComponent />;
    }

    return <Loading />;
  };
  return PrivateRoute;
};

export default adminCheck;
