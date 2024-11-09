import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FaTwitter, FaInstagram, FaYoutube, FaTwitch } from "react-icons/fa";
import Header from "@/components/landing/Header";
import config from "@/config";

export default function CreatorProfile({ params }) {
  const creator = config.creators.find((c) => c.id.toString() === params.id);

  if (!creator) {
    return <div>Creator not found</div>;
  }

  return (
    <div>
      <Header className="sticky top-0 z-50" />

      <div className="container mx-auto py-8 px-4">
        {/* Hero Section */}
        <div className="mb-12">
          <div className="flex flex-col md:flex-row items-start gap-8">
            <Avatar className="w-32 h-32">
              <AvatarImage src={creator.avatar} alt={creator.name} />
              <AvatarFallback>{creator.name[0]}</AvatarFallback>
            </Avatar>

            <div className="flex-1">
              <h1 className="text-4xl font-bold mb-2">{creator.name}</h1>
              <p className="text-xl text-muted-foreground mb-4">
                {creator.specialty}
              </p>

              {/* Social Links */}
              <div className="flex gap-4 mb-4">
                {creator.social.twitter && (
                  <Button variant="outline" size="icon" asChild>
                    <a
                      href={`https://twitter.com/${creator.social.twitter}`}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <FaTwitter className="h-4 w-4" />
                    </a>
                  </Button>
                )}
                {creator.social.instagram && (
                  <Button variant="outline" size="icon" asChild>
                    <a
                      href={`https://instagram.com/${creator.social.instagram}`}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <FaInstagram className="h-4 w-4" />
                    </a>
                  </Button>
                )}
                {creator.social.youtube && (
                  <Button variant="outline" size="icon" asChild>
                    <a
                      href={`https://youtube.com/${creator.social.youtube}`}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <FaYoutube className="h-4 w-4" />
                    </a>
                  </Button>
                )}
                {creator.social.twitch && (
                  <Button variant="outline" size="icon" asChild>
                    <a
                      href={`https://twitch.tv/${creator.social.twitch}`}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <FaTwitch className="h-4 w-4" />
                    </a>
                  </Button>
                )}
              </div>

              <div className="flex flex-wrap gap-2">
                {creator.tags.map((tag) => (
                  <Badge key={tag} variant="secondary">
                    {tag}
                  </Badge>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* About Section */}
        <div className="space-y-12">
          <section>
            <h2 className="text-2xl font-semibold mb-4">About</h2>
            <Card>
              <CardContent className="pt-6">
                <p className="text-lg leading-relaxed">{creator.description}</p>
              </CardContent>
            </Card>
          </section>
          {/* Services Section */}
          <section>
            <h2 className="text-2xl font-semibold mb-4">Services</h2>
            <div className="grid gap-4">
              <Card>
                <CardHeader>
                  <CardTitle>Custom Artwork</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex justify-between items-center">
                    <p className="text-muted-foreground">
                      High-quality custom artwork tailored to your needs
                    </p>
                    <p className="font-semibold">Starting from $100</p>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>Character Design</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex justify-between items-center">
                    <p className="text-muted-foreground">
                      Original character designs with multiple iterations
                    </p>
                    <p className="font-semibold">Starting from $150</p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
