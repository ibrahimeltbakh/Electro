import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import RemoveButton from "./Buttons/RemoveButton";
import PlusButton from "./Buttons/PlusQuantity";
import MinusButton from "./Buttons/minusQuantity";
import ClearCartButton from "./Buttons/ClearCartButton";
import AddToCartButton from "./Buttons/AddToCartButton";

const tableHead = [
  { title: "Product Name", key: "name" },
  { title: "Image", key: "image" },
  { title: "Price", key: "price" },
  { title: "Discount", key: "discount" },
  { title: "Price After Discount", key: "priceAfterDiscount" },
  { title: "Amount", key: "amount" },
  { title: "Actions", key: "actions" },
];

export default function CartTable({ cartProducts, total }) {
  return (
    <Table className=" w-full text-md my-6 border rounded-lg overflow-hidden ">
      <TableHeader className="bg-muted text-muted-foreground dark:bg-muted/50">
        <TableRow>
          {tableHead.map((item) => (
            <TableHead
              key={item.key}
              className="px-6 py-3 text-center font-semibold uppercase tracking-wide">
              {item.title}
            </TableHead>
          ))}
        </TableRow>
      </TableHeader>

      <TableBody className="divide-y divide-border ">
        {cartProducts.map((product) => (
          <TableRow
            key={product?.productId?.id}
            className="hover:bg-accent/30 transition-colors text-center">
            <TableCell className="px-6 py-3">
              {product?.productId?.title}
            </TableCell>
            <TableCell className="px-6 py-3">
              <img
                src={product?.productId?.imageCover?.secure_url}
                alt={product?.productId?.title}
                width={50}
                height={50}
                className="rounded-md mx-auto"
              />
            </TableCell>
            <TableCell className="px-6 py-3">
              {product?.productId?.price}
            </TableCell>
            <TableCell className="px-6 py-3">
              {product?.productId?.discount <= 1
                ? `-`
                : `${product?.productId?.discount}%`}
            </TableCell>
            <TableCell className="px-6 py-3">
              {product?.productId?.priceAfterDiscount}
            </TableCell>
            <TableCell className="px-6 py-3">
              <div className="flex gap-2 items-center justify-center ">
                <PlusButton
                  productId={product?.productId?._id}
                  quantity={product?.quantity}
                />
                <span className="mx-1">{product?.quantity}</span>
                <MinusButton
                  productId={product?.productId?._id}
                  quantity={product?.quantity}
                />
              </div>
            </TableCell>
            <TableCell className="px-6 py-3 ">
              <RemoveButton productId={product?.productId?._id} />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>

      <TableFooter className="bg-muted  dark:bg-muted/50">
        <TableRow>
          <TableCell colSpan={4} className="px-6 py-3  text-left font-medium">
            {`Total Price: ${total}`}
          </TableCell>
          <TableCell colSpan={3} className="px-6 py-3 text-right">
            <ClearCartButton />
          </TableCell>
        </TableRow>
      </TableFooter>
    </Table>
  );
}
