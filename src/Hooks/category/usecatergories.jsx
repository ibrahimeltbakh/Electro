import { useQuery } from "@tanstack/react-query";
import GetCategories from "./categoryFn";

const useCategories = () => {
    const { data, isLoading, isError } = useQuery({
        queryKey: ["categories"],
        queryFn: GetCategories,
    });
    return { data, isLoading, isError };
};

export default useCategories;
