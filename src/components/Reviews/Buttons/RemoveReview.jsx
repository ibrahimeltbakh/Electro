import { Button } from "@/components/ui/button";
import Swal from "sweetalert2";
import { FaTrash } from "react-icons/fa";
import useDeleteReview from "@/Hooks/Reviews/useDeleteReview";
export default function RemoveReview({ reviewId }) {
  const { mutate } = useDeleteReview();
  return (
    <Button
      className="bg-transparent cursor-pointer text-red-800 hover:text-red-600 hover:border hover:border-red-600  hover:bg-transparent focus:outline-none"
      onClick={() => {
        Swal.fire({
          title: "Are you sure?",
          text: "You Need to remove this!",
          icon: "warning",
          showCancelButton: true,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          confirmButtonText: "Yes, remove it!",
        }).then((result) => {
          if (result.isConfirmed) {
            mutate(reviewId);
          }
        });
      }}>
      <FaTrash />
    </Button>
  );
}
