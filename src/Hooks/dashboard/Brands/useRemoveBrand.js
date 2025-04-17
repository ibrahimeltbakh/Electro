import { useMutation, useQueryClient } from "@tanstack/react-query";
import { removeBrand } from "./BrandsFunctions";
import toast from "react-hot-toast";

const useRemoveBrand = () => {
    const query = useQueryClient();

    return useMutation({
        mutationFn: ({ brandId }) => removeBrand(brandId),
        onSuccess: () => {
            query.invalidateQueries(["brands"]);
            toast.success("Brand removed successfully ✅");
        },
        onError: (error) => {
            console.error("Error removing brand:", error);
            toast.error("Failed to remove brand ❌");
        },
    });
};

export default useRemoveBrand;
