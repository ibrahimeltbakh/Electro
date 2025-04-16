import useAddToCart from "@/Hooks/cart/useAddToCart";
import { Button } from "@/components/ui/button";

export default function AddToCartButton({ productId }) {
  const { mutate } = useAddToCart();
  return (
    <Button
      className="bg-secondary-foreground text-white hover:bg-secondary-foreground/80 hover:text-white cursor-pointer transition-colors duration-200"
      variant="outline"
      onClick={() => {
        mutate({ productId });
      }}>
      Add to Cart
    </Button>
  );
}
