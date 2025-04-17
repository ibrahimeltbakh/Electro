import { useMutation, useQueryClient } from "@tanstack/react-query";
import { removeCategory } from "./CategoriesFunctions";
import toast from "react-hot-toast";

const useRemoveCategory = () => {
    const query = useQueryClient();

    return useMutation({
        mutationFn: ({ categoryId }) => removeCategory(categoryId),
        onSuccess: () => {
            query.invalidateQueries(["categories"]);
            toast.success("Category removed successfully ✅");
        },
        onError: (error) => {
            console.error("Error removing category:", error);
            toast.error("Failed to remove category ❌");
        },
    });
};

export default useRemoveCategory;
