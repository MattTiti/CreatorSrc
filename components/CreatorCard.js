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

export default function CreatorCard({ creator }) {
  if (!creator) return null;

  // Helper function to format price range
  const formatPriceRange = (min, max) => {
    if (!max) return `From $${min}`;
    return `$${min} - $${max}`;
  };

  // Helper function to truncate text
  const truncateText = (text, maxLength) => {
    if (text.length <= maxLength) return text;
    return text.slice(0, maxLength) + "...";
  };

  return (
    <Card className="hover:shadow-lg transition-shadow h-[320px] flex flex-col">
      <CardHeader className="flex flex-row items-center gap-4 flex-shrink-0">
        <Avatar>
          <AvatarImage src={creator.avatar} alt={creator.name} />
          <AvatarFallback>{creator.name[0]}</AvatarFallback>
        </Avatar>
        <div>
          <CardTitle className="line-clamp-1">{creator.name}</CardTitle>
          <CardDescription className="line-clamp-1">
            {creator.specialty}
          </CardDescription>
        </div>
      </CardHeader>
      <CardContent className="flex-1 overflow-hidden">
        <p className="text-sm text-gray-500 dark:text-gray-400 mb-4 line-clamp-2">
          {creator.description}
        </p>
        <div className="flex flex-wrap gap-2 overflow-hidden max-h-[72px]">
          {creator.tags?.map((tag) => (
            <Badge key={tag} variant="secondary" className="mb-2">
              {truncateText(tag, 20)}
            </Badge>
          ))}
        </div>
      </CardContent>
      <CardFooter className="flex justify-between items-center flex-shrink-0 border-t pt-4">
        <div className="text-sm font-medium text-gray-500 dark:text-gray-400">
          Avg. Price:{" "}
          {formatPriceRange(creator.priceRange?.min, creator.priceRange?.max)}
        </div>
        <Button variant="outline" size="sm" asChild>
          <Link href={`/creators/${creator.id}`}>See More</Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
