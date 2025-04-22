import { useQuery } from "@tanstack/react-query";
import { GetSpacificCategory } from "./categoryFn";

const useSpacificCategory = ({ categoryId }) => {
    const spacificCategory = useQuery({
        queryKey: ["category", categoryId],
        queryFn: () => GetSpacificCategory(categoryId),
        enabled: !!categoryId,
    });

    return spacificCategory;
};

export default useSpacificCategory;
