import { useRouter } from "next/router";
import { useEffect } from "react";
import LoginMain from "../components/Login/LoginMain";
import Loading from "../components/Shared/Loading/Loading";
// import { useSelector } from "react-redux";
// import Loading from "../components/Loading";
import useAuth from "./useAuth";

const authCheck = (WrappedComponent) => {
  const PrivateRoute = () => {
    const router = useRouter();
    // user info
    // const user = useSelector((state) => state?.reducers?.user?.currentUser);
    const { user, isLoading } = useAuth();

    // useEffect(() => {
    //   if (!user?.email) {
    //     router.replace("/login");
    //   }
    // }, [router, user?.email]);

    if (isLoading) {
      return <Loading />;
    }
    if (user?.email) {
      return <WrappedComponent />;
    } else {
      router.replace("/login");
    }

    return <Loading />;
  };
  return PrivateRoute;
};

export default authCheck;
