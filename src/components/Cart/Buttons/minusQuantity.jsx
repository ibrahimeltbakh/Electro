import { Button } from "@/components/ui/button";
import { CiCircleMinus } from "react-icons/ci";
import useUpdateCart from "@/Hooks/cart/useUpdateCart";
export default function MinusButton({ productId, quantity }) {
  const { mutate } = useUpdateCart();

  return (
    <Button
      className="bg-transparent cursor-pointer text-red-800 hover:text-red-600 hover:border hover:border-red-600  hover:bg-transparent focus:outline-none"
      disabled={quantity === 1}
      onClick={() => {
        mutate({ productId, quantity: quantity - 1 });
      }}>
      <CiCircleMinus />
    </Button>
  );
}
