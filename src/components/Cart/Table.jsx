import { motion } from "framer-motion";
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
import { FaShoppingBag } from "react-icons/fa";

const tableHead = [
  { title: "Product", key: "name" },
  { title: "Price", key: "priceAfterDiscount" },
  { title: "Quantity", key: "amount" },
  { title: "Subtotal", key: "subtotal" },
  { title: "", key: "actions" },
];

export default function CartTable({ cartProducts, total }) {
  // Function to format currency
  const formatCurrency = (amount) => {
    return `$${Number(amount).toFixed(2)}`;
  };

  return (
    <div className="overflow-x-auto">
      <Table className="w-full">
        <TableHeader className="bg-gray-50 dark:bg-gray-800/50">
          <TableRow>
            {tableHead.map((item) => (
              <TableHead
                key={item.key}
                className={`px-6 py-4 text-sm font-medium text-gray-700 dark:text-black ${
                  item.key === "actions" ? "text-right" : "text-left"
                }`}
              >
                {item.title}
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>

        <TableBody className="divide-y divide-gray-200 dark:divide-gray-700">
          {cartProducts.map((product, index) => (
            <motion.tr
              key={product?.productId?._id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.05 }}
              className="group hover:bg-blue-50 dark:hover:bg-blue-900/10 transition-colors"
            >
              <TableCell className="py-4 px-6">
                <div className="flex items-center space-x-4">
                  <div className="h-16 w-16 flex-shrink-0 overflow-hidden rounded-md border border-gray-200 group-hover:border-blue-200 transition-colors">
                    <img
                      src={product?.productId?.imageCover?.secure_url}
                      alt={product?.productId?.title}
                      className="h-full w-full object-contain object-center p-1"
                    />
                  </div>
                  <div>
                    <p className="text-base font-medium text-gray-900 dark:text-black line-clamp-1">
                      {product?.productId?.title}
                    </p>
                    <p className="mt-1 text-sm text-gray-500 dark:text-black hidden sm:block">
                      {product?.productId?.category?.name}
                    </p>
                  </div>
                </div>
              </TableCell>
              
              <TableCell className="py-4 px-6 text-base text-gray-700 dark:text-black">
                <div className="flex flex-col">
                  <span className="font-medium">{formatCurrency(product?.productId?.priceAfterDiscount)}</span>
                  {product?.productId?.discount > 0 && (
                    <span className="text-xs text-gray-500 line-through">
                      {formatCurrency(product?.productId?.price)}
                    </span>
                  )}
                </div>
              </TableCell>
              
              <TableCell className="py-4 px-6">
                <div className="flex items-center justify-start">
                  <div className="flex items-center border border-gray-300 dark:border-gray-600 rounded-lg overflow-hidden">
                    <MinusButton
                      productId={product?.productId?._id}
                      quantity={product?.quantity}
                    />
                    <span className="w-10 text-center py-1 font-medium text-gray-800 dark:text-gray-200">
                      {product?.quantity}
                    </span>
                    <PlusButton
                      productId={product?.productId?._id}
                      quantity={product?.quantity}
                    />
                  </div>
                </div>
              </TableCell>
              
              <TableCell className="py-4 px-6 text-base font-medium text-gray-900 dark:text-black">
                {formatCurrency(product?.productId?.priceAfterDiscount * product?.quantity)}
              </TableCell>
              
              <TableCell className="py-4 px-6 text-right">
                <RemoveButton productId={product?.productId?._id} />
              </TableCell>
            </motion.tr>
          ))}
        </TableBody>

        <TableFooter className="bg-gray-50 dark:bg-gray-800/50 border-t border-gray-200 dark:border-gray-700">
          <TableRow>
            <TableCell colSpan={3} className="px-6 py-4">
              <ClearCartButton />
            </TableCell>
            <TableCell className="px-6 py-4 text-base font-semibold text-gray-900 dark:text-black">
              Total
            </TableCell>
            <TableCell className="px-6 py-4 text-right text-lg font-bold text-blue-600 dark:text-blue-400 ">
              {formatCurrency(total)}
            </TableCell>
          </TableRow>
        </TableFooter>
      </Table>

      {cartProducts.length === 0 && (
        <div className="py-12 text-center">
          <FaShoppingBag className="mx-auto h-12 w-12 text-gray-300" />
          <h3 className="mt-2 text-lg font-medium text-gray-900">No products in cart</h3>
          <p className="mt-1 text-gray-500">Your cart is empty. Add some products to continue.</p>
        </div>
      )}
    </div>
  );
}
