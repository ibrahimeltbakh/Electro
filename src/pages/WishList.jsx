import Error from "@/components/Error/Error";
import Loading from "@/components/Loading/Loading";
import useGetWishList from "@/Hooks/wishList/useGetWishList";
import { WishList } from "@/pages/WishList";

export default function WishList() {
  const { data, isLoading, isError, error } = useGetWishList();
  const WishListProducts = data?.cart?.products || [];

  if (isError) {
    <Error error={error} />;
  }
  if (isLoading) {
    return <Loading />;
  }
  if (data?.count === 0) {
    return (
      <div className="container m-auto flex flex-col justify-center gap-3 items-center mt-10">
        <h2>Your WishList is empty</h2>
      </div>
    );
  }
  return (
    <div className="container m-auto flex flex-col justify-center gap-3 items-center mt-10 ">
      <h1 className="text-secondary-foreground text-3xl font-bold ">
        Your WishList Products
      </h1>
    </div>
  );
}
