import { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import UpdateProductButton from "./UpdateProductButton";
import RemoveProductButton from "./RemoveProductButton";
import { Button } from "@/components/ui/button";

const tableHead = [
  { title: "Name", key: "name" },
  { title: "Price", key: "price" },
  { title: "Stock", key: "stock" },
  { title: "Sold", key: "sold" },
  { title: "Image", key: "image" },
  { title: "Actions", key: "actions" },
];

const ITEMS_PER_PAGE = 5;

export default function ProductsTable({ products = [] }) {
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(products.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;

  const selectedProducts = products.slice(startIndex, endIndex);

  return (
    <div>
      <Table className="w-full text-md my-6 border rounded-lg overflow-hidden">
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

        <TableBody className="divide-y divide-border">
          {selectedProducts.map((product) => (
            <TableRow
              key={product?._id}
              className="hover:bg-accent/30 transition-colors text-center">
              <TableCell className="px-6 py-3">{product?.title}</TableCell>
              <TableCell className="px-6 py-3">{product?.price}</TableCell>
              <TableCell className="px-6 py-3">{product?.stock}</TableCell>
              <TableCell className="px-6 py-3">{product?.sold}</TableCell>
              <TableCell className="px-6 py-3">
                <img
                  src={product?.imageCover?.secure_url}
                  alt={product?.title}
                  width={50}
                  height={50}
                  className="rounded-md mx-auto"
                />
              </TableCell>
              <TableCell className="px-6 py-3">
                <UpdateProductButton productId={product?._id || product?.id} />
                <RemoveProductButton productId={product?._id || product?.id} />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <div className="flex justify-center gap-2 mt-4">
        <Button
          variant="outline"
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}>
          Previous
        </Button>

        {[...Array(totalPages)].map((_, idx) => (
          <Button
            key={idx}
            variant={currentPage === idx + 1 ? "default" : "outline"}
            onClick={() => setCurrentPage(idx + 1)}>
            {idx + 1}
          </Button>
        ))}

        <Button
          variant="outline"
          onClick={() =>
            setCurrentPage((prev) => Math.min(prev + 1, totalPages))
          }
          disabled={currentPage === totalPages}>
          Next
        </Button>
      </div>
    </div>
  );
}
