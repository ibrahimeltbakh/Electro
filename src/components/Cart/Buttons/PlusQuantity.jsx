import { Button } from "@/components/ui/button";
import { CiCirclePlus } from "react-icons/ci";
import useUpdateCart from "@/Hooks/cart/useUpdateCart";
export default function PlusButton({ productId, quantity }) {
  const { mutate } = useUpdateCart();

  return (
    <Button
      className="bg-transparent cursor-pointer text-green-800 hover:text-green-600 hover:border hover:border-green-600  hover:bg-transparent focus:outline-none"
      onClick={() => {
        mutate({ productId, quantity: quantity + 1 });
      }}>
      <CiCirclePlus />
    </Button>
  );
}
