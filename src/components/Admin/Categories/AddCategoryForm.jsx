import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import useAddCategory from "@/Hooks/dashboard/Categories/useAddCategory";

export default function CategoryForm() {
  const [name, setName] = useState("");
  const [image, setImage] = useState(null);
  const { mutate: addCategory, isPending } = useAddCategory();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name || !image) {
      alert("Please fill all fields");
      return;
    }

    addCategory({ name, image });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-6 max-w-md mx-auto p-8 rounded-xl border shadow">
      <div>
        <Label>Category Name</Label>
        <Input
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Enter category name"
          className="bg-input text-foreground"
        />
      </div>

      <div>
        <Label>Category Image</Label>
        <Input
          type="file"
          accept="image/*"
          onChange={(e) => setImage(e.target.files?.[0] || null)}
          className="bg-input text-foreground file:text-muted-foreground"
        />
      </div>

      <Button
        type="submit"
        disabled={isPending}
        className="bg-primary text-primary-foreground hover:bg-primary/90">
        {isPending ? "Adding..." : "Add Category"}
      </Button>
    </form>
  );
}
