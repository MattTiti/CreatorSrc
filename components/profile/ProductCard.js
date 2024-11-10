import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { X, Loader2, Plus, ExternalLink } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import toast from "react-hot-toast";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { useState, useRef } from "react";
import Link from "next/link";

export default function ProductCard({
  product,
  index,
  handleProductInputChange,
  handleBudgetChange,
  removeProduct,
  handleProductTagKeyDown,
  removeProductTag,
  handleImageUpload,
  handleImageDelete,
}) {
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef(null);

  const handleProductSubmit = async (e) => {
    e.preventDefault();

    // Required fields for products
    const requiredFields = [
      { field: "name", label: "Product Name" },
      { field: "description", label: "Description" },
      { field: "category", label: "Category" },
      { field: "marketingBudget.min", label: "Minimum Budget" },
    ];

    const missingFields = requiredFields.filter(({ field }) => {
      if (field.includes(".")) {
        const [parent, child] = field.split(".");
        return !product[parent]?.[child];
      }
      return !product[field];
    });

    if (missingFields.length > 0) {
      toast.error(
        `Please fill in required fields: ${missingFields
          .map((f) => f.label)
          .join(", ")}`
      );
      return;
    }

    try {
      const response = await fetch("/api/product/save", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(product),
      });

      if (!response.ok) throw new Error("Failed to save product");

      const data = await response.json();
      if (data.success) {
        handleProductInputChange({
          target: {
            name: "_id",
            value: data.product._id,
          },
        });
        toast.success(`Product ${index + 1} saved successfully`);
      }
    } catch (error) {
      console.error("Error saving product:", error);
      toast.error("Failed to save product");
    }
  };

  const handleFileUpload = async (event, type, imageIndex = null) => {
    const file = event.target.files?.[0];
    if (!file) return;

    try {
      setIsUploading(true);

      // Create FormData and append file
      const formData = new FormData();
      formData.append("file", file);

      // Send file to API
      const response = await fetch("/api/avatar/upload", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Upload failed");
      }

      // Update the product with the new image URL
      handleImageUpload(index, type, data.url, imageIndex);
    } catch (error) {
      console.error("Error uploading image:", error);
      toast.error("Failed to upload image");
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <Card key={index} className="mx-auto relative">
      <div className="absolute top-4 right-4 flex gap-2">
        <Button variant="outline" size="sm" disabled={!product._id}>
          <Link
            href={`/product/${product._id}`}
            className="flex items-center gap-2"
          >
            <ExternalLink className="h-4 w-4" />
            View Live Page
          </Link>
        </Button>
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              className="hover:bg-destructive/10 hover:text-destructive"
            >
              <X className="h-4 w-4" />
            </Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Delete Product</AlertDialogTitle>
              <AlertDialogDescription>
                Are you sure you want to delete this product? This action cannot
                be undone.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction
                onClick={() => removeProduct(index)}
                className="bg-red-700 hover:bg-red-700/90"
              >
                Delete
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>

      <CardHeader className="flex flex-row justify-between items-start space-y-0">
        <div>
          <CardTitle>Product Information ({index + 1})</CardTitle>
          <CardDescription>
            Add details about your product or service
          </CardDescription>
        </div>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleProductSubmit} className="space-y-6">
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="productName">
                  Product Name <span className="text-destructive">*</span>
                </Label>
                <Input
                  id="productName"
                  name="name"
                  value={product.name}
                  onChange={handleProductInputChange}
                  placeholder="Enter product name"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="category">
                  Short Title <span className="text-destructive">*</span>
                </Label>
                <Input
                  id="category"
                  name="category"
                  value={product.category}
                  onChange={handleProductInputChange}
                  placeholder="e.g., To-Do App, AI Expense Tracker, etc."
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label>Marketing Budget Range (USD)</Label>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label
                    htmlFor="minBudget"
                    className="text-sm text-muted-foreground"
                  >
                    Minimum <span className="text-destructive">*</span>
                  </Label>
                  <Input
                    id="minBudget"
                    type="number"
                    value={product.marketingBudget.min}
                    onChange={(e) => handleBudgetChange("min", e.target.value)}
                    placeholder="Min budget"
                  />
                </div>
                <div className="space-y-2">
                  <Label
                    htmlFor="maxBudget"
                    className="text-sm text-muted-foreground"
                  >
                    Maximum
                  </Label>
                  <Input
                    id="maxBudget"
                    type="number"
                    value={product.marketingBudget.max}
                    onChange={(e) => handleBudgetChange("max", e.target.value)}
                    placeholder="Max budget"
                  />
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">
                Description <span className="text-destructive">*</span>
              </Label>
              <Textarea
                id="description"
                name="description"
                value={product.description}
                onChange={handleProductInputChange}
                placeholder="Describe your product"
                rows={4}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor={`productTags-${index}`}>Tags</Label>
              <Input
                id={`productTags-${index}`}
                onKeyDown={(e) => handleProductTagKeyDown(index, e)}
                placeholder="Type a tag and press Enter"
              />
              {product.tags.length > 0 && (
                <div className="flex flex-wrap gap-2 mt-2">
                  {product.tags.map((tag) => (
                    <Badge
                      key={tag}
                      variant="secondary"
                      className="px-2 py-1 flex items-center gap-1"
                    >
                      {tag}
                      <X
                        className="h-3 w-3 cursor-pointer hover:text-destructive"
                        onClick={() => removeProductTag(index, tag)}
                      />
                    </Badge>
                  ))}
                </div>
              )}
            </div>

            <div className="space-y-2">
              <Label>Product Avatar</Label>
              <div className="flex items-center gap-4">
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={(e) => handleFileUpload(e, "avatar")}
                  ref={fileInputRef}
                />
                <Avatar className="h-24 w-24 cursor-pointer border border-gray-200">
                  <AvatarImage src={product.avatar} />
                  <AvatarFallback>{product.name?.charAt(0)}</AvatarFallback>
                </Avatar>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => fileInputRef.current?.click()}
                  disabled={isUploading}
                >
                  {isUploading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Uploading...
                    </>
                  ) : (
                    "Change Avatar"
                  )}
                </Button>
              </div>
            </div>

            <div className="space-y-2">
              <Label>Product Images (Max 3)</Label>
              <div className="flex flex-wrap gap-4">
                {[0, 1, 2].map((imgIndex) => (
                  <div key={imgIndex}>
                    <input
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={(e) => handleFileUpload(e, "images", imgIndex)}
                      id={`product-image-${index}-${imgIndex}`}
                    />
                    <div
                      className="relative w-32 h-24 border border-gray-200 rounded-lg overflow-hidden cursor-pointer hover:border-gray-300 transition-colors"
                      onClick={() => {
                        if (!isUploading) {
                          if (
                            imgIndex === 0 ||
                            product.images?.[imgIndex - 1]
                          ) {
                            document
                              .getElementById(
                                `product-image-${index}-${imgIndex}`
                              )
                              .click();
                          } else {
                            toast.error("Please upload images in sequence");
                          }
                        }
                      }}
                    >
                      {product.images?.[imgIndex] ? (
                        <>
                          <img
                            src={product.images[imgIndex]}
                            alt={`Product image ${imgIndex + 1}`}
                            className="w-full h-full object-cover"
                          />
                          <Button
                            type="button"
                            variant="destructive"
                            size="icon"
                            className="absolute top-1 right-1 h-6 w-6"
                            onClick={(e) => {
                              e.stopPropagation(); // Prevent triggering the parent's onClick
                              handleImageDelete(index, imgIndex);
                            }}
                          >
                            <X className="h-3 w-3" />
                          </Button>
                        </>
                      ) : (
                        <div className="w-full h-full flex flex-col items-center justify-center bg-muted gap-1">
                          <Plus className="h-6 w-6 text-muted-foreground" />
                          <span className="text-xs text-muted-foreground">
                            {isUploading ? "Uploading..." : "Click to upload"}
                          </span>
                        </div>
                      )}
                      {isUploading && (
                        <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                          <Loader2 className="h-6 w-6 text-white animate-spin" />
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <Button type="submit" className="w-full">
            Save Product
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
