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
    <Table className="w-full text-sm">
      <TableHeader className="bg-gray-100 dark:bg-gray-700">
        <TableRow>
          {tableHead.map((item) => (
            <TableHead
              key={item.key}
              className="px-4 py-2 text-left font-semibold">
              {item.title}
            </TableHead>
          ))}
        </TableRow>
      </TableHeader>
      <TableBody className="divide-y divide-gray-200 dark:divide-gray-600">
        {cartProducts.map((product) => (
          <TableRow
            key={product?.productId.id}
            className="hover:bg-gray-50 dark:hover:bg-gray-600">
            <TableCell className="px-4 py-2">
              {product?.productId?.title}
            </TableCell>
            <TableCell className="px-4 py-2">
              <img
                src={product?.productId?.imageCover?.secure_url}
                alt={product?.productId?.title}
                width={50}
                height={50}
                className="rounded-md"
              />
            </TableCell>
            <TableCell className="px-4 py-2">
              {product?.productId?.price}
            </TableCell>
            <TableCell className="px-4 py-2">
              {product?.productId?.discount}
            </TableCell>
            <TableCell className="px-4 py-2">
              {product?.productId?.priceAfterDiscount}
            </TableCell>
            <TableCell className="px-4 py-2">{product?.quantity}</TableCell>
            <TableCell className="px-4 py-2">
              <RemoveButton productId={product?._id} />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
      <TableFooter className="bg-gray-100 dark:bg-gray-700">
        <TableRow>
          <TableCell colSpan={6} className="px-4 py-2 text-left font-semibold">
            Total Price
          </TableCell>
          <TableCell className="px-4 py-2 text-left font-semibold text-lg">
            {total}
          </TableCell>
        </TableRow>
      </TableFooter>
    </Table>
  );
}
