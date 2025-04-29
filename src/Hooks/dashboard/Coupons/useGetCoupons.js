import { useQuery } from "@tanstack/react-query";
import { getCoupons } from "./CouponsFunctions";
const useGetCoupons = () => {
    const coupons = useQuery({
        queryKey: ["coupons"],
        queryFn: getCoupons,
        refetchInterval: 1000,
        staleTime: 5000,
    })
    return coupons;
}

export default useGetCoupons;