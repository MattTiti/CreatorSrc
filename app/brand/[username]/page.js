"use client";
import { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { Loader2, Link as LinkIcon, ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function BrandProfilePage({ params }) {
  const [brand, setBrand] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBrand = async () => {
      try {
        const response = await fetch(`/api/brand/${params.username}`);
        if (!response.ok) {
          throw new Error("Brand not found");
        }
        const data = await response.json();
        setBrand(data.brand);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchBrand();
  }, [params.username]);

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
              <h2 className="text-2xl font-bold">Brand Not Found</h2>
              <p className="text-muted-foreground">
                The brand profile you're looking for doesn't exist.
              </p>
              <Link href={`/find-brands/all`}>
                <Button variant="outline">All Brands</Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-4 space-y-4">
      <Link href="/find-brands/all">
        <Button variant="ghost" className="flex items-center gap-2">
          <ArrowLeft className="h-4 w-4" />
          All Brands
        </Button>
      </Link>

      <Card className="w-full mx-auto">
        <CardContent className="py-6 space-y-8">
          <div className="flex flex-col md:flex-row gap-6">
            <div className="flex justify-center md:block">
              <Avatar className="h-24 w-24 border border-gray-200">
                <AvatarImage src={brand.avatar} />
                <AvatarFallback>{brand.displayName?.charAt(0)}</AvatarFallback>
              </Avatar>
            </div>
            <div className="space-y-2 text-center md:text-left flex-1">
              <div className="space-y-0">
                <h1 className="text-3xl font-semibold">{brand.displayName}</h1>
                <p className="text-xl text-black/70">{brand.shortTitle}</p>
              </div>
              <div className="flex flex-wrap gap-2 justify-center md:justify-start">
                {brand.industry && (
                  <Badge variant="secondary">{brand.industry}</Badge>
                )}
                {brand.tags.map((tag) => (
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
            <p className="whitespace-pre-wrap">{brand.about}</p>

            <div className="pt-4 space-y-2">
              <p className="font-medium">
                {brand.marketingBudget?.max
                  ? `Marketing Budget: $${brand.marketingBudget.min.toLocaleString()} - $${brand.marketingBudget.max.toLocaleString()}`
                  : `Marketing Budget: $${brand.marketingBudget.min.toLocaleString()}+`}
              </p>
              <div className="flex items-center gap-1">
                <span className="font-medium">Contact Email:</span>
                <a
                  href={`mailto:${brand.contactEmail}`}
                  className="text-primary hover:underline"
                >
                  {brand.contactEmail}
                </a>
              </div>
            </div>
          </div>

          {brand.links && brand.links.length > 0 && (
            <>
              <Separator />
              <div className="space-y-4">
                <h2 className="text-2xl font-semibold">Links</h2>
                <div className="flex flex-wrap gap-4">
                  {brand.links.map((link, index) => (
                    <a
                      key={index}
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-4 py-2 rounded-lg border hover:bg-muted transition-colors sm:w-auto w-full"
                    >
                      <LinkIcon className="h-4 w-4 flex-shrink-0" />
                      <span>{link.name}</span>
                    </a>
                  ))}
                </div>
              </div>
            </>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
