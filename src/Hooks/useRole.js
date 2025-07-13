import { useQuery } from "@tanstack/react-query";
import useAuth from "./useAuth";
import useAxiosSecure from "./useAxiosSecure";


const useRole = () => {
    const axiosSecure = useAxiosSecure();
    const { user, loading } = useAuth();

    const { data: role, isLoading: isRoleLoading } = useQuery({
        queryKey: ['role', user?.email],
        enabled: !loading && !!user?.email,
        queryFn: async () => {
            const { data } = await axiosSecure(`/user/role/${user?.email}`)
            return data
        },
    })
    console.log(role, isRoleLoading)

    return [role?.role, isRoleLoading]

};

export default useRole;