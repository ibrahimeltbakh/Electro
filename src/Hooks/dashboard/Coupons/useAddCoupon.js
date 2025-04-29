import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addCoupon } from "./CouponsFunctions";
import toast from "react-hot-toast";



const useAddCoupon = () => {
    const query = useQueryClient();

    const mutation = useMutation({
        mutationFn: (couponData) => addCoupon(couponData),
        onSuccess: () => {
            query.invalidateQueries(["coupons"]);
            toast.success("Coupon added successfully ✅");
        },
        onError: (error) => {
            console.error("Error adding coupon:", error);
            toast.error("Failed to add coupon ❌");
        },
    });

    return mutation
}






export default useAddCoupon