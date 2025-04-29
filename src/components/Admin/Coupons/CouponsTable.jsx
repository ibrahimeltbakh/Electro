import { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";

import UpdateCouponButton from "@/components/Admin/Coupons/UpdateCouponButton";
import RemoveCouponButton from "@/components/Admin/Coupons/RemoveCouponButton";

const tableHead = [
  { title: "Code", key: "code" },
  { title: "Amount", key: "amount" },
  { title: "From Date", key: "fromDate" },
  { title: "To Date", key: "toDate" },
  { title: "Actions", key: "actions" },
];

const ITEMS_PER_PAGE = 5;

export default function CouponsTable({ coupons }) {
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.ceil(coupons.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const selectedCoupons = coupons.slice(startIndex, endIndex);

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
          {selectedCoupons.map((coupon) => (
            <TableRow
              key={coupon?._id}
              className="hover:bg-accent/30 transition-colors text-center">
              <TableCell className="px-6 py-3">{coupon?.code}</TableCell>
              <TableCell className="px-6 py-3">{coupon?.amount}</TableCell>
              <TableCell className="px-6 py-3">{coupon?.fromDate}</TableCell>
              <TableCell className="px-6 py-3">{coupon?.toDate}</TableCell>
              <TableCell className="px-6 py-3">
                <UpdateCouponButton couponId={coupon?._id} />
                <RemoveCouponButton couponId={coupon?._id} />
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
