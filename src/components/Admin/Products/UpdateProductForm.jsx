import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import useUpdateProduct from "@/Hooks/dashboard/Products/useUpdateProduct";
import useBrands from "@/Hooks/Brands/useBrands";
import useCategories from "@/Hooks/category/usecatergories";
import Loading from "@/components/Loading/Loading";
import Error from "@/components/Error/Error";

export default function UpdateProductForm({ product }) {
  const [title, setTitle] = useState(product?.title || "");
  const [description, setDescription] = useState(product?.description || "");
  const [price, setPrice] = useState(product?.price || "");
  const [stock, setStock] = useState(product?.stock || "");
  const [category, setCategory] = useState(product?.category?._id || "");
  const [brand, setBrand] = useState(product?.brand?._id || "");
  const [imageCover, setImageCover] = useState(null);
  const [images, setImages] = useState([]);

  const { mutate: updateProduct, isPending } = useUpdateProduct(
    product?._id || product?.id
  );
  const {
    data: categories,
    isLoading: isLoadingCategories,
    error: categoryError,
  } = useCategories();
  const {
    data: brands,
    isLoading: isLoadingBrands,
    error: brandError,
  } = useBrands();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title || !description || !price || !stock || !category || !brand) {
      alert("Please fill all fields");
      return;
    }

    const payload = {
      productId: product?._id || product?.id,
      title,
      description,
      price,
      stock,
      category,
      brand,
      ...(imageCover && { imageCover }),
      images: images ? Array.from(images) : [],
    };
    console.log(payload);
    updateProduct(payload);
  };

  if (isLoadingCategories || isLoadingBrands) return <Loading />;
  if (categoryError || brandError)
    return <Error error={categoryError || brandError} />;

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-6 max-w-2xl mx-auto p-8 rounded-xl border shadow ">
      <div>
        <Label>Title</Label>
        <Input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="bg-input text-foreground"
        />
      </div>

      <div>
        <Label>Description</Label>
        <Textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="bg-input text-foreground"
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label>Price</Label>
          <Input
            type="number"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            className="bg-input text-foreground"
          />
        </div>
        <div>
          <Label>Stock</Label>
          <Input
            type="number"
            value={stock}
            onChange={(e) => setStock(e.target.value)}
            className="bg-input text-foreground"
          />
        </div>
      </div>

      <div className="flex justify-between flex-wrap items-center">
        <div>
          <Label>Category</Label>
          <Select onValueChange={setCategory} value={category}>
            <SelectTrigger className="bg-input text-foreground">
              <SelectValue placeholder="Select category" />
            </SelectTrigger>
            <SelectContent>
              {categories?.categories?.map((cat) => (
                <SelectItem key={cat._id} value={cat._id}>
                  {cat.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div>
          <Label>Brand</Label>
          <Select onValueChange={setBrand} value={brand}>
            <SelectTrigger className="bg-input text-foreground">
              <SelectValue placeholder="Select brand" />
            </SelectTrigger>
            <SelectContent>
              {brands?.brands?.map((br) => (
                <SelectItem key={br._id} value={br._id}>
                  {br.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      <div>
        <Label>Cover Image (optional)</Label>
        <Input
          type="file"
          accept="image/*"
          onChange={(e) => setImageCover(e.target.files?.[0] || null)}
          className="bg-input text-foreground file:text-muted-foreground"
        />
      </div>
      <div className="flex items-center justify-center  gap-2">
        <img
          src={product?.imageCover?.secure_url}
          alt={product?.title}
          className="w-40 h-40  border-2 border-blue-500 overflow-hidden shadow-md"
        />
      </div>

      <div>
        <Label>Additional Images (optional)</Label>
        <Input
          type="file"
          multiple
          accept="image/*"
          onChange={(e) => setImages(e.target.files)}
          className="bg-input text-foreground file:text-muted-foreground"
        />
      </div>
      <div className="flex items-center justify-center  gap-2">
        {product?.images?.map((image) => (
          <img
            src={image.secure_url}
            alt={product?.title}
            className="w-30 h-30  border-2 border-blue-500 overflow-hidden shadow-md"
          />
        ))}
      </div>

      <Button
        type="submit"
        disabled={isPending}
        className="bg-primary text-primary-foreground hover:bg-primary/90">
        {isPending ? "Updating..." : "Update Product"}
      </Button>
    </form>
  );
}
