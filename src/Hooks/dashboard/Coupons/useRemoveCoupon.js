import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { removeCoupon } from "./CouponsFunctions";

const useRemoveCoupon = () => {
    const query = useQueryClient();
    const mutate = useMutation({
        mutationFn: (couponId) => removeCoupon(couponId),
        onSuccess: () => {
            query.invalidateQueries(["coupons"])
            toast.success("Coupon removed successfully ✅");

        },
        onError: (error) => {
            console.error("Error removing coupon:", error);
            toast.error("Failed to remove coupon ❌");
            toast.error(error.response?.data?.message || error.message);
        },
    });

    return mutate

};
export default useRemoveCoupon