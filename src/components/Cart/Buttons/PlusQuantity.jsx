import { Button } from "@/components/ui/button";
import { CiCirclePlus } from "react-icons/ci";
import useUpdateCart from "@/Hooks/cart/useUpdateCart";
import toast from "react-hot-toast";
export default function PlusButton({ productId, quantity, productStock }) {
  const { mutate } = useUpdateCart();

  return (
    <Button
      className="bg-transparent cursor-pointer text-green-800 hover:text-green-600 hover:border hover:border-green-600  hover:bg-transparent focus:outline-none"
      onClick={() => {
        if (quantity == productStock) {
          toast.error("Product Out of stock");
          return;
        }
        mutate({ productId, quantity: quantity + 1 });
      }}>
      <CiCirclePlus />
    </Button>
  );
}
