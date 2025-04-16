import { useQuery } from "@tanstack/react-query";
import GetBrands from "./getBrandsFn";

  const useBrands = () => {
    const { data, isLoading,isError} = useQuery({
        queryKey: ["brands"],
        queryFn: GetBrands,
    });
    return { data, isLoading, isError };
};

export default useBrands;


