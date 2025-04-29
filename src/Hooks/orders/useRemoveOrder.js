import { useMutation, useQueryClient } from "@tanstack/react-query";
import { removeOrder } from "./ordersFunctions";
import toast from "react-hot-toast";


const useRemoveOrder = () => {

    const query = useQueryClient();

    return useMutation({
        mutationFn: ({ orderId }) => removeOrder(orderId),
        onSuccess: () => {
            query.invalidateQueries(["orders"]);
            toast.success("Order removed successfully ✅");
        },
        onError: (error) => {
            console.error("Error removing order:", error);
            toast.error("Failed to remove order ❌");
        },
    });
}

export default useRemoveOrder