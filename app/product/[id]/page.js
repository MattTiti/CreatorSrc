"use client";
import { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Loader2, Link as LinkIcon, ArrowLeft } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

export default function ProductProfilePage({ params }) {
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await fetch(`/api/product/${params.id}`);
        if (!response.ok) {
          throw new Error("Product not found");
        }
        const data = await response.json();
        setProduct(data.product);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [params.id]);

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8 flex items-center justify-center min-h-screen">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-8 flex items-center justify-center min-h-screen">
        <Card className="w-full max-w-2xl">
          <CardContent className="py-8">
            <div className="text-center space-y-4">
              <h2 className="text-2xl font-bold">Product Not Found</h2>
              <p className="text-muted-foreground">
                The product you're looking for doesn't exist.
              </p>
              <Link href={`/find-products/all`}>
                <Button variant="outline">All Products</Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-4 space-y-4">
      <Link href={`/find-products/all`}>
        <Button variant="ghost" className="flex items-center gap-2">
          <ArrowLeft className="h-4 w-4" />
          All Products
        </Button>
      </Link>

      <Card className="w-full mx-auto">
        <CardContent className="py-6 space-y-8">
          <div className="flex flex-col md:flex-row gap-6">
            <div className="flex justify-center md:block">
              <Avatar className="h-24 w-24 rounded-full border">
                <AvatarImage src={product.avatar} alt={product.name} />
                <AvatarFallback>{product.name[0]}</AvatarFallback>
              </Avatar>
            </div>
            <div className="space-y-2 text-center md:text-left flex-1">
              <div className="space-y-0">
                <h1 className="text-3xl font-semibold">{product.name}</h1>
                {product.category && (
                  <p className="text-xl text-black/70">{product.category}</p>
                )}
              </div>
              <div className="flex flex-wrap gap-2 justify-center md:justify-start">
                {product.tags &&
                  product.tags.map((tag) => (
                    <Badge key={tag} variant="outline">
                      {tag}
                    </Badge>
                  ))}
              </div>
            </div>
          </div>

          <Separator />
          <div className="space-y-4">
            <h2 className="text-2xl font-semibold">About</h2>
            <p className="whitespace-pre-wrap">{product.description}</p>

            <div className="pt-4 space-y-2">
              <p className="font-medium">
                {product.marketingBudget?.max
                  ? `Marketing Budget: $${product.marketingBudget.min.toLocaleString()} - $${product.marketingBudget.max.toLocaleString()}`
                  : `Marketing Budget: $${product.marketingBudget.min.toLocaleString()}+`}
              </p>
            </div>
          </div>

          {product.images && product.images.length > 0 && (
            <>
              <Separator />
              <div className="space-y-4">
                <h2 className="text-2xl font-semibold">Images</h2>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                  {product.images.map((image, index) => (
                    <div
                      key={index}
                      className="relative aspect-video rounded-lg border border-gray-200 overflow-hidden cursor-pointer hover:opacity-90 transition-opacity"
                      onClick={() => setSelectedImage(image)}
                    >
                      <Image
                        src={image}
                        alt={`${product.name} image ${index + 1}`}
                        fill
                        className="object-cover"
                      />
                    </div>
                  ))}
                </div>
              </div>
            </>
          )}
        </CardContent>
      </Card>
      <Dialog
        open={!!selectedImage}
        onOpenChange={(open) => !open && setSelectedImage(null)}
      >
        <DialogContent className="max-w-[70vw] w-full max-h-[90vh] p-0">
          <div className="relative w-full h-[80vh]">
            {selectedImage && (
              <img
                src={selectedImage}
                alt={product?.name || "Product image"}
                className="w-full h-full object-contain"
              />
            )}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
