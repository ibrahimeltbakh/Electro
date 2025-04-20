import { Button } from "@/components/ui/button";
import React from "react";
import { MdOutlineEditNote } from "react-icons/md";
import { Link } from "react-router-dom";
export default function UpdateProductButton({ productId }) {
  return (
    <Link to={`/admin/products/update/${productId}`}>
      <Button className="bg-transparent  cursor-pointer text-green-800 hover:text-green-600 hover:border hover:border-green-600  hover:bg-transparent focus:outline-none">
        <MdOutlineEditNote />
      </Button>
    </Link>
  );
}
