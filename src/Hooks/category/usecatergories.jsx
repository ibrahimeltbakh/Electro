import { useQuery } from "@tanstack/react-query";
import GetCategories from "./categoryFn";

const useCategories = () => {
  const { data, isLoading, error } = useQuery({
    queryKey: ["categories"],
    queryFn: GetCategories,
  });
  return { data, isLoading, error };
};

export default useCategories;
