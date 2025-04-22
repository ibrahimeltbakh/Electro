import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import useAddBrand from "@/Hooks/dashboard/Brands/useAddBrand";

export default function BrandForm() {
  const [name, setName] = useState("");
  const [image, setImage] = useState(null);
  const { mutate: addBrand, isPending } = useAddBrand();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name || !image) {
      alert("Please fill all fields");
      return;
    }

    addBrand({ name, image });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-6 max-w-md mx-auto p-8 rounded-xl border shadow">
      <div>
        <Label>Brand Name</Label>
        <Input
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Enter brand name"
          className="bg-input text-foreground"
        />
      </div>

      <div>
        <Label>Brand Image</Label>
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
        {isPending ? "Adding..." : "Add Brand"}
      </Button>
    </form>
  );
}
