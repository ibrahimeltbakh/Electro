import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addCategory } from "./CategoriesFunctions";
import toast from "react-hot-toast";

const useAddCategory = () => {
    const query = useQueryClient();

    return useMutation({
        mutationFn: (categoryData) => addCategory(categoryData),
        onSuccess: () => {
            query.invalidateQueries(["categories"]);
            toast.success("Category added successfully ✅");
        },
        onError: (error) => {
            console.error("Error adding category:", error);
            toast.error("Failed to add category ❌");
        },
    });
};

export default useAddCategory;
