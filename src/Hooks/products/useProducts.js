
import { useQuery } from '@tanstack/react-query'
import { GetProducts } from './productFunction'
export default function useProducts() {
    const Products = useQuery({
    queryKey:["products"],
    queryFn: GetProducts,
    staleTime: 5000,
  });
  return Products
}
