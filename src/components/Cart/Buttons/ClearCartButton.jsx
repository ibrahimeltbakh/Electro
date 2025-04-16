import { Button } from "@/components/ui/button";
import Swal from "sweetalert2";
import useClearCart from "@/Hooks/cart/useClearCart";
export default function ClearCartButton() {
  const { mutate } = useClearCart();
  return (
    <Button
      variant={"outline"}
      className="text-red-800 hover:text-red-600 focus:outline-none"
      onClick={() => {
        Swal.fire({
          title: "Are you sure?",
          text: "You need to clear Cart !",
          icon: "warning",
          showCancelButton: true,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          confirmButtonText: "Yes, Clear it!",
        }).then((result) => {
          if (result.isConfirmed) {
            mutate();
          }
        });
      }}>
      Clear Cart
    </Button>
  );
}
