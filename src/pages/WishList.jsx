import Error from "@/components/Error/Error";
import Loading from "@/components/Loading/Loading";
import useGetWishList from "@/Hooks/wishList/useGetWishList";

export default function WishList() {
  const { data, isLoading, isError, error } = useGetWishList();
  // const WishListProducts = data?.wishList?.products || [];

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
  console.log("WishList data", data.wishlist.products);
  return (
    <div className="container m-auto flex flex-col justify-center gap-3 items-center my-10 ">
      <h1 className="text-secondary-foreground text-3xl font-bold ">
        Your WishList Products
      </h1>
      {data.wishlist.products.map((product) => (
        <div key={product._id} className="border rounded-lg p-4 shadow-md bg-white relative flex flex-col justify-between min-h-[400px]">
          {/* صورة المنتج */}
          <img
            src={product.imageCover.secure_url}
            alt={product.title}
            className="w-full h-48 object-contain rounded-lg mb-4"
          />
          {/* عنوان وتقييم */}
          <h2 className="text-lg font-semibold mb-1 text-center">{product.title}</h2>
          <div className="flex justify-center text-yellow-400 mb-2">
            {'★'.repeat(5)}
          </div>
          {/* السعر */}
          <div className="flex justify-center items-center gap-2 mb-4">
            <span className="text-xl font-bold text-gray-800">{product.price} EGP</span>
          </div>
        </div>
      ))}
      <div className="flex justify-center items-center mt-4">
        <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition duration-300">
          Checkout
        </button>
        </div>
    </div>
  );
}
