import { useQuery } from "@tanstack/react-query";
import { GetSpacificBrand } from "./getBrandsFn";

const useSpacificBrand = ({ brandId }) => {
    const spacificBrand = useQuery({
        queryKey: ["brand", brandId],
        queryFn: () => GetSpacificBrand(brandId),
        enabled: !!brandId,
    });

    return spacificBrand;
};

export default useSpacificBrand;
