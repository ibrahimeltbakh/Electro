import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateBrand } from "./BrandsFunctions";
import toast from "react-hot-toast";

const useUpdateBrand = () => {
    const query = useQueryClient();

    return useMutation({
        mutationFn: (brandData) => updateBrand(brandData),
        onSuccess: () => {
            query.invalidateQueries(["brands"]);
            toast.success("Brand updated successfully ✅");
        },
        onError: (error) => {
            console.error("Error updating brand:", error);
            toast.error("Failed to update brand ❌");
        },
    });
};

export default useUpdateBrand;
