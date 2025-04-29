import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { updateCoupon } from "./CouponsFunctions";


const useUpdateCoupon = () => {
    const query = useQueryClient();

    const mutation = useMutation({
        mutationFn: (data) => updateCoupon(data.couponId, data.couponData),
        onSuccess: () => {
            query.invalidateQueries(["coupons"]);
            toast.success("Coupon updated successfully ✅");
        },
        onError: (error) => {
            console.error("Error updating coupon:", error);
            toast.error("Failed to update coupon ❌");
            toast.error(error.response?.data?.message || error.message);
        },
    });

    return mutation;
}

export default useUpdateCoupon