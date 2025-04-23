import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AddReviews } from "./reviewsFunctions";
import toast from "react-hot-toast";

const useAddReviews = () => {
    const query = useQueryClient();
    const mutate = useMutation({
        mutationFn: ({ productId, rate, comment }) => AddReviews({ productId, rate, comment }),
        onSuccess: () => {
            query.invalidateQueries(["cart"]);
            toast.success("Comment added successfully ✅");
        },
        onError: (error) => {
            console.error("Error adding comment:", error);
            toast.error("Failed to add Comment ❌");
            toast.error(error.response?.data?.message);
        },
    });

    return mutate
};

export default useAddReviews;
