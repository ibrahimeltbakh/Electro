import { useDispatch } from "react-redux";
import { fetchCartData } from "../RTK/Slices/cartSlicewithAPI";
import { useQuery } from "@tanstack/react-query";

const useCart = () => {
  const dispatch = useDispatch();
  const fetchCartProducts = async () => {
    const response = await dispatch(fetchCartData());
    return response.payload;
  };
  const cartProducts = useQuery({
    queryKey: ["cart"],
    queryFn: fetchCartProducts,
    refetchInterval: 1000,
    staleTime: 5000,
  });
  return cartProducts;
};

export default useCart;
