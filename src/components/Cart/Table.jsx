import { motion, AnimatePresence } from "framer-motion";
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
import {
  FaShoppingBag,
  FaTrashAlt,
  FaGift,
  FaTag,
  FaRegSadTear,
  FaShoppingCart,
  FaHeart,
} from "react-icons/fa";
import { Link } from "react-router-dom";

const tableHead = [
  { title: "Product", key: "name" },
  { title: "Price", key: "priceAfterDiscount" },
  { title: "Quantity", key: "amount" },
  { title: "Subtotal", key: "subtotal" },
  { title: "", key: "actions" },
];

// Animation variants
const tableVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.08 },
  },
};

const rowVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: "spring", stiffness: 120, damping: 14 },
  },
  exit: { opacity: 0, x: -100, transition: { duration: 0.3 } },
};

export default function CartTable({ cartProducts, total }) {
  // Function to format currency
  const formatCurrency = (amount) => {
    return `$${Number(amount).toFixed(2)}`;
  };

  return (
    <div className="overflow-x-auto">
      <AnimatePresence>
        <motion.div variants={tableVariants} initial="hidden" animate="visible">
          <Table className="w-full">
            <TableHeader className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/10 dark:to-blue-900/30">
              <TableRow>
                {tableHead.map((item) => (
                  <TableHead
                    key={item.key}
                    className={`px-6 py-4 text-sm font-semibold text-blue-900 dark:text-blue-100 ${
                      item.key === "actions" ? "text-right" : "text-left"
                    }`}>
                    {item.title}
                  </TableHead>
                ))}
              </TableRow>
            </TableHeader>

            <TableBody className="divide-y divide-gray-200 dark:divide-gray-700">
              <AnimatePresence>
                {cartProducts.map((product, index) => (
                  <motion.tr
                    key={product?.productId?._id}
                    variants={rowVariants}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                    transition={{ duration: 0.3, delay: index * 0.05 }}
                    className="group hover:bg-blue-50/70 dark:hover:bg-blue-900/10 transition-colors"
                    layoutId={`cart-item-${product?.productId?._id}`}>
                    <TableCell className="py-5 px-6">
                      <Link
                        to={`/product/${product?.productId?._id}`}
                        className="group-hover:opacity-80 transition-opacity">
                        <div className="flex items-center space-x-4">
                          <motion.div
                            whileHover={{ scale: 1.05 }}
                            className="h-20 w-20 flex-shrink-0 overflow-hidden rounded-lg border border-gray-200 group-hover:border-blue-200 transition-colors bg-white dark:bg-gray-800 shadow-sm">
                            <img
                              src={product?.productId?.imageCover?.secure_url}
                              alt={product?.productId?.title}
                              className="h-full w-full object-contain object-center p-1"
                            />
                          </motion.div>
                          <div>
                            <p className="text-base font-medium text-gray-900 dark:text-white line-clamp-1 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                              {product?.productId?.title}
                            </p>
                            <div className="mt-1.5 text-sm text-gray-500 dark:text-gray-400 flex flex-wrap items-center gap-2">
                              {product?.productId?.category?.name && (
                                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300">
                                  {product?.productId?.category?.name}
                                </span>
                              )}
                              {product?.productId?.brand?.name && (
                                <span className="inline-flex items-center px-2 py-0.5 text-xs bg-gray-100 dark:bg-gray-700 rounded-md">
                                  {product?.productId?.brand?.name}
                                </span>
                              )}
                            </div>
                          </div>
                        </div>
                      </Link>
                    </TableCell>

                    <TableCell className="py-5 px-6 text-base text-gray-700 dark:text-white">
                      <div className="flex flex-col">
                        <span className="font-medium">
                          {formatCurrency(
                            product?.productId?.priceAfterDiscount
                          )}
                        </span>
                        {product?.productId?.discount > 0 && (
                          <div className="flex items-center gap-2 mt-1">
                            <span className="text-xs text-gray-500 line-through">
                              {formatCurrency(product?.productId?.price)}
                            </span>
                            <span className="inline-flex items-center gap-0.5 px-1.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300">
                              <FaTag className="text-[10px]" />
                              {product?.productId?.discount}% off
                            </span>
                          </div>
                        )}
                      </div>
                    </TableCell>

                    <TableCell className="py-5 px-6">
                      <div className="flex items-center justify-start">
                        <motion.div
                          whileHover={{ scale: 1.03 }}
                          className="flex items-center border border-gray-200 dark:border-gray-600 rounded-lg overflow-hidden shadow-sm bg-white dark:bg-gray-700">
                          <MinusButton
                            productId={product?.productId?._id}
                            quantity={product?.quantity}
                          />
                          <span className="w-10 text-center py-1.5 font-medium text-gray-800 dark:text-gray-200 select-none bg-gray-50 dark:bg-gray-600">
                            {product?.quantity}
                          </span>
                          <PlusButton
                            productId={product?.productId?._id}
                            productStock={product?.productId?.stock}
                            quantity={product?.quantity}
                          />
                        </motion.div>

                        {product?.productId?.quantity <= 5 && (
                          <span className="ml-2 text-xs text-amber-600 dark:text-amber-400 font-medium">
                            {product?.productId?.quantity <= 1
                              ? "Last item!"
                              : `Only ${product?.productId?.quantity} left`}
                          </span>
                        )}
                      </div>
                    </TableCell>

                    <TableCell className="py-5 px-6 text-base font-medium">
                      <span className="text-blue-600 dark:text-blue-400">
                        {formatCurrency(
                          product?.productId?.priceAfterDiscount *
                            product?.quantity
                        )}
                      </span>
                    </TableCell>

                    <TableCell className="py-5 px-6 text-right">
                      <RemoveButton productId={product?.productId?._id} />
                    </TableCell>
                  </motion.tr>
                ))}
              </AnimatePresence>
            </TableBody>

            <TableFooter className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/10 dark:to-blue-900/30 border-t border-gray-200 dark:border-gray-700">
              <TableRow>
                <TableCell colSpan={3} className="px-6 py-4">
                  <ClearCartButton />
                </TableCell>
                <TableCell className="px-6 py-4 text-base font-semibold text-gray-900 dark:text-white">
                  Total
                </TableCell>
                <TableCell className="px-6 py-4 text-right text-lg font-bold text-blue-600 dark:text-blue-400">
                  {formatCurrency(total)}
                </TableCell>
              </TableRow>
            </TableFooter>
          </Table>
        </motion.div>
      </AnimatePresence>

      {cartProducts.length === 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="py-16 text-center">
          <div className="w-24 h-24 mx-auto bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/30 dark:to-indigo-900/20 rounded-full flex items-center justify-center shadow-inner">
            <FaRegSadTear className="text-blue-400 dark:text-blue-300 text-3xl" />
          </div>
          <h3 className="mt-6 text-xl font-semibold text-gray-900 dark:text-white">
            Your cart is empty
          </h3>
          <p className="mt-2 text-gray-500 dark:text-gray-400 max-w-md mx-auto">
            Looks like you haven't added any products to your cart yet. Start
            shopping to fill it with amazing items!
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
            <Link to="/shop">
              <motion.button
                whileHover={{
                  scale: 1.03,
                  boxShadow: "0 10px 15px -3px rgba(59, 130, 246, 0.3)",
                }}
                whileTap={{ scale: 0.97 }}
                className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white px-6 py-3 rounded-lg font-medium shadow-lg hover:shadow-blue-500/20 flex items-center justify-center gap-2 transition-all">
                <FaShoppingCart className="text-sm" />
                <span>Browse Shop</span>
              </motion.button>
            </Link>

            <Link to="/wishlist">
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className="bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 text-gray-700 dark:text-white px-6 py-3 rounded-lg font-medium shadow-sm hover:shadow-md flex items-center justify-center gap-2 transition-all">
                <FaHeart className="text-red-500 dark:text-red-400 text-sm" />
                <span>View Wishlist</span>
              </motion.button>
            </Link>
          </div>
        </motion.div>
      )}
    </div>
  );
}
