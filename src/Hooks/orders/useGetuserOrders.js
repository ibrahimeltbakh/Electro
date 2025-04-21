import { useQuery } from "@tanstack/react-query";
import { GetOrders } from "./ordersFunctions";

// export const useGetuserOrders = () => {
//     return useQuery({ queryKey: ["orders"], queryFn: GetOrders });
// };


const useGetuserOrders = () => {
    const userOrders = useQuery({
      queryKey: ["orders"],
      queryFn: GetOrders,
      refetchInterval: 1000,
      staleTime: 5000,
    });
    return userOrders;
  };
  
  export default useGetuserOrders;
  
