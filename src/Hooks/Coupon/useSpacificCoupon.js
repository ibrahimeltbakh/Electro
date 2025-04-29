import { useQuery } from "@tanstack/react-query";
import { GetSpecificCoupon } from "./couponFn";

const useSpecificCoupon = ({ couponId }) => {
    const specificCoupon = useQuery({
        queryKey: ["coupon", couponId],
        queryFn: () => GetSpecificCoupon(couponId),
        enabled: !!couponId,

        onError: (error) => {
            console.error("Error fetching coupon:", error);
        },
        onSuccess: (data) => {
            console.log("Successfully fetched coupon data:", data);
        },
    });

    return specificCoupon;
};

export default useSpecificCoupon;
