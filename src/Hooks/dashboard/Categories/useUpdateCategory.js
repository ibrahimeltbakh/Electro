import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateCategory } from "./CategoriesFunctions";
import toast from "react-hot-toast";

const useUpdateCategory = () => {
    const query = useQueryClient();

    return useMutation({
        mutationFn: (categoryData) => updateCategory(categoryData),
        onSuccess: () => {
            query.invalidateQueries(["categories"]);
            toast.success("Category updated successfully ✅");
        },
        onError: (error) => {
            console.error("Error updating category:", error);
            toast.error("Failed to update category ❌");
        },
    });
};

export default useUpdateCategory;
