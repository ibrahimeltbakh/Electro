import useGetCart from "@/Hooks/cart/useGetCart";
import { FaShoppingCart } from "react-icons/fa";

export default function CartIcon() {
  const { data } = useGetCart();
  return (
    <div className="relative">
      <span className="absolute  top-[-8px] right-[-15px] inline-flex items-center justify-center w-3 h-3 p-2 text-xs font-bold leading-none text-white bg-red-500 rounded-full">
        {data?.count}
      </span>
      <FaShoppingCart className="text-xl" />
    </div>
  );
}
