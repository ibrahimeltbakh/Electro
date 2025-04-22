import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteReview } from "./reviewsFunctions";
import toast from "react-hot-toast";

const useDeleteReview = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (reviewId) => deleteReview(reviewId),
        onSuccess: () => {
            queryClient.invalidateQueries(["productReviews"]);
            toast.success("Review deleted successfully ✅");
        },
        onError: (err) => {
            console.error("Error deleting review:", err);
            toast.error("Failed to delete review ❌");
            toast.error(err.response?.data?.message || err.message);
        },
    });
};

export default useDeleteReview;
