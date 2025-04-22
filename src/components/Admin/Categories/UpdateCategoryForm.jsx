import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import useUpdateCategory from "@/Hooks/dashboard/Categories/useUpdateCategory"; // افترضنا أنك بتستخدم هوك لتحديث الكاتيجوري
import Loading from "@/components/Loading/Loading";
import Error from "@/components/Error/Error";

export default function UpdateCategoryForm({ category }) {
  const [name, setName] = useState(category?.name || "");
  const [image, setImage] = useState(null);
  const { mutate: updateCategory, isPending } = useUpdateCategory(
    category?._id
  );

  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //   if (!name) {
  //     alert("Please fill all fields");
  //     return;
  //   }

  //   const payload = {
  //     name,
  //     ...(image && { image }),
  //   };
  //   console.log(payload);
  //   updateCategory(payload);
  // };
  const handleSubmit = (e) => {
    e.preventDefault();

    if (!name) {
      alert("Please fill all fields");
      return;
    }

    const formData = new FormData();
    formData.append("name", name);
    if (image) {
      formData.append("image", image);
    }

    updateCategory({
      categoryId: category?._id,
      name,
      image,
    });
  };

  if (isPending) return <Loading />;
  if (!category) return <Error error="Category not found" />;

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-6 max-w-2xl mx-auto p-8 rounded-xl border shadow ">
      <div>
        <Label>Category Name</Label>
        <Input
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="bg-input text-foreground"
        />
      </div>

      <div>
        <Label>Category Image (optional)</Label>
        <Input
          type="file"
          accept="image/*"
          onChange={(e) => setImage(e.target.files?.[0] || null)}
          className="bg-input text-foreground file:text-muted-foreground"
        />
      </div>
      <div className="flex items-center justify-center  gap-2">
        <img
          src={category?.image?.secure_url}
          alt={category?.name}
          className="w-40 h-40  border-2 border-blue-500 overflow-hidden shadow-md"
        />
      </div>

      <Button
        type="submit"
        disabled={isPending}
        className="bg-primary text-primary-foreground hover:bg-primary/90">
        {isPending ? "Updating..." : "Update Category"}
      </Button>
    </form>
  );
}
