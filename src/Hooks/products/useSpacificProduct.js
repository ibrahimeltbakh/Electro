import { useQuery } from "@tanstack/react-query";
import { GetSpacificProduct } from "./productFunction";

const useSpacificProduct = ({ productId }) => {
    const spacificProduct = useQuery({
        queryKey: ["product", productId],
        queryFn: () => GetSpacificProduct(productId),
        enabled: !!productId,
    });

    return spacificProduct;
};

export default useSpacificProduct;
