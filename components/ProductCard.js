import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { formatCurrency } from "@/lib/utils";

export default function ProductCard({ product }) {
  if (!product) return null;

  // Helper function to truncate text
  const truncateText = (text, maxLength) => {
    if (text.length <= maxLength) return text;
    return text.slice(0, maxLength) + "...";
  };

  // Calculate total available slots and items
  const MAX_VISIBLE_ITEMS = 4;
  const totalItems = product.tags?.length || 0;
  const hiddenCount = Math.max(0, totalItems - MAX_VISIBLE_ITEMS);
  const tagsToShow = Math.min(product.tags?.length || 0, MAX_VISIBLE_ITEMS);

  return (
    <Card className="hover:shadow-lg transition-shadow h-[320px] flex flex-col">
      <CardHeader className="flex flex-row items-center gap-4 flex-shrink-0">
        <Avatar className="h-12 w-12 rounded-full border">
          <AvatarImage src={product.avatar} alt={product.name} />
          <AvatarFallback>{product.name[0]}</AvatarFallback>
        </Avatar>
        <div>
          <CardTitle className="line-clamp-1">{product.name}</CardTitle>
          <CardDescription className="line-clamp-1">
            {product.category}
          </CardDescription>
        </div>
      </CardHeader>

      <CardContent className="flex-1 overflow-hidden space-y-4">
        <p className="text-sm text-gray-500 dark:text-gray-400 line-clamp-2">
          {product.description}
        </p>

        <div className="flex flex-wrap gap-2 overflow-hidden max-h-[72px]">
          <Badge variant="secondary" className="mb-2">
            {product.category}
          </Badge>
          {product.tags?.slice(0, tagsToShow).map((tag) => (
            <Badge key={tag} variant="outline" className="mb-2">
              {truncateText(tag, 20)}
            </Badge>
          ))}
          {hiddenCount > 0 && (
            <Badge variant="outline" className="mb-2 shrink-0">
              +{hiddenCount} more
            </Badge>
          )}
        </div>
      </CardContent>

      <CardFooter className="flex justify-between items-center flex-shrink-0 border-t pt-4">
        <div className="text-sm font-medium text-gray-500 dark:text-gray-400">
          {product.marketingBudget?.max
            ? `Marketing: ${formatCurrency(
                parseInt(product.marketingBudget.min)
              )} - ${formatCurrency(parseInt(product.marketingBudget.max))}`
            : `Marketing: ${formatCurrency(
                parseInt(product.marketingBudget.min)
              )}+`}
        </div>
        <Button variant="outline" size="sm" asChild>
          <Link href={`/product/${product.brandId}`}>View Product</Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
