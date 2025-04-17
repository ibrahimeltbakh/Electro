import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addBrand } from "./BrandsFunctions";
import toast from "react-hot-toast";

const useAddBrand = () => {
    const query = useQueryClient();

    return useMutation({
        mutationFn: (brandData) => addBrand(brandData),
        onSuccess: () => {
            query.invalidateQueries(["brands"]);
            toast.success("Brand added successfully ✅");
        },
        onError: (error) => {
            console.error("Error adding brand:", error);
            toast.error("Failed to add brand ❌");
        },
    });
};

export default useAddBrand;
