import Error from "@/components/Error/Error";
import useGetCart from "@/Hooks/cart/useGetCart";
import React from "react";
import Loading from "@/components/Loading/Loading";
import CartTable from "@/components/Cart/Table";

export default function Cart() {
  const { data, isLoading, isError, error } = useGetCart();
  const cartProducts = data?.cart?.products || [];
  if (isError) {
    <Error error={error} />;
  }
  if (isLoading) {
    return <Loading />;
  }
  return (
    <div className="container m-auto flex flex-col justify-center gap-3 items-center mt-10 ">
      <h2>Your Products</h2>
      <CartTable
        cartProducts={cartProducts}
        total={data?.cart?.totalCartPrice}
      />
    </div>
  );
}
{
  /*
  {
    "message": "Success",
    "count": 1,
    "cart": {
        "_id": "67feb7c872cba04506db6db0",
        "user": "67feab3caa841aef202afb56",
        "products": [
            {
                "productId": {
                    "imageCover": {
                        "secure_url": "https://res.cloudinary.com/decau6fvv/image/upload/v1727794136/Depi/E-commerce/categories/Images/xrB0z/products/9JHGi/okttinsbywuyah0hvwag.jpg",
                        "public_id": "Depi/E-commerce/categories/Images/xrB0z/products/9JHGi/okttinsbywuyah0hvwag"
                    },
                    "_id": "66fc0bd9e28a330b4311c30b",
                    "title": "dell g15 5520 gaming laptop",
                    "slug": "dell-g15-5520-gaming-laptop",
                    "description": "DELL5520 G15 Gaming Laptop With 15.6 Inch Intel Core i7-12700H/16GB RAM/512 GB SSD/6 GB Nvidia GeForce RTX 3060 Series/Ubuntu English Black/Dark Shadow Grey",
                    "price": 1783,
                    "discount": 10,
                    "priceAfterDiscount": 1604.7,
                    "category": "66fb593d6e4c17342b4cfc21",
                    "brand": "66fc0a7b6e4c17342b4cfcbc",
                    "createdBy": "66fb57dd6e4c17342b4cfc0f",
                    "images": [
                        {
                            "secure_url": "https://res.cloudinary.com/decau6fvv/image/upload/v1727794132/Depi/E-commerce/categories/Images/xrB0z/products/9JHGi/nqip3wvtekd81vv55qur.avif",
                            "public_id": "Depi/E-commerce/categories/Images/xrB0z/products/9JHGi/nqip3wvtekd81vv55qur",
                            "_id": "66fc0bd9e28a330b4311c30c",
                            "id": "66fc0bd9e28a330b4311c30c"
                        },
                        {
                            "secure_url": "https://res.cloudinary.com/decau6fvv/image/upload/v1727794133/Depi/E-commerce/categories/Images/xrB0z/products/9JHGi/dc3exnbplttseodlnl1w.avif",
                            "public_id": "Depi/E-commerce/categories/Images/xrB0z/products/9JHGi/dc3exnbplttseodlnl1w",
                            "_id": "66fc0bd9e28a330b4311c30d",
                            "id": "66fc0bd9e28a330b4311c30d"
                        },
                        {
                            "secure_url": "https://res.cloudinary.com/decau6fvv/image/upload/v1727794134/Depi/E-commerce/categories/Images/xrB0z/products/9JHGi/eiplckzp7sdhr74sibil.avif",
                            "public_id": "Depi/E-commerce/categories/Images/xrB0z/products/9JHGi/eiplckzp7sdhr74sibil",
                            "_id": "66fc0bd9e28a330b4311c30e",
                            "id": "66fc0bd9e28a330b4311c30e"
                        },
                        {
                            "secure_url": "https://res.cloudinary.com/decau6fvv/image/upload/v1727794135/Depi/E-commerce/categories/Images/xrB0z/products/9JHGi/n4cwtqsmihivk4tg0sba.avif",
                            "public_id": "Depi/E-commerce/categories/Images/xrB0z/products/9JHGi/n4cwtqsmihivk4tg0sba",
                            "_id": "66fc0bd9e28a330b4311c30f",
                            "id": "66fc0bd9e28a330b4311c30f"
                        }
                    ],
                    "customId": "9JHGi",
                    "stock": 85,
                    "sold": 5,
                    "rateAvg": 5,
                    "rateNum": 1,
                    "createdAt": "2024-10-01T14:48:57.145Z",
                    "updatedAt": "2025-04-10T13:59:29.037Z",
                    "id": "66fc0bd9e28a330b4311c30b"
                },
                "quantity": 1,
                "price": 1783,
                "_id": "67feb7c872cba04506db6db1"
            }
        ],
        "totalCartPrice": 1783,
        "createdAt": "2025-04-15T19:47:20.670Z",
        "updatedAt": "2025-04-15T19:47:20.670Z"
    }
}
  
  
  
  */
}
