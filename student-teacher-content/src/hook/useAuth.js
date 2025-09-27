
import { useEffect, useState } from "react";
import { useAppContext } from "./context/useContext";
import { useServices } from "./useServices";
const useAuth = () => {
    const { accessToken, setAccessToken,userInfo,setuserInfo } = useAppContext();
    const {refereshToken,getUserInfo} = useServices()
    const [loading, setLoading] = useState(true)
    useEffect(() => {
        const refToken = async () => {
            if (!accessToken) {
                const res = await refereshToken();
               const userinfo = await getUserInfo();
               setuserInfo(userinfo?.data?.allUser)
                setAccessToken(res?.data?.accessToken)
            }
            setLoading(false);
        };
        refToken();
    }, [accessToken, loading]);
    return { accessToken, loading,userInfo };
};

export default useAuth;
