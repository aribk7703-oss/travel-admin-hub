import { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import { WebsiteLayout } from "@/components/website/WebsiteLayout";
import { useBlogPosts } from "@/hooks/useBlogPosts";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Search, Calendar, User, ArrowRight, Tag } from "lucide-react";
import { format } from "date-fns";

const WebsiteBlog = () => {
  const { getPublishedPosts } = useBlogPosts();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const publishedPosts = getPublishedPosts();

  const filteredPosts = useMemo(() => {
    return publishedPosts.filter((post) => {
      const matchesSearch =
        post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.tags.some((tag) => tag.toLowerCase().includes(searchQuery.toLowerCase()));
      const matchesCategory = !selectedCategory || post.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }, [publishedPosts, searchQuery, selectedCategory]);

  const categories = [
    { value: "travel-tips", label: "Travel Tips" },
    { value: "destination-guide", label: "Destination Guides" },
    { value: "news", label: "News" },
    { value: "announcement", label: "Announcements" },
  ];

  const getCategoryColor = (category: string) => {
    const colors: Record<string, string> = {
      "travel-tips": "bg-blue-100 text-blue-800 hover:bg-blue-200",
      "destination-guide": "bg-green-100 text-green-800 hover:bg-green-200",
      news: "bg-purple-100 text-purple-800 hover:bg-purple-200",
      announcement: "bg-orange-100 text-orange-800 hover:bg-orange-200",
    };
    return colors[category] || "bg-gray-100 text-gray-800";
  };

  const formatCategoryLabel = (category: string) => {
    return category
      .split("-")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  };

  return (
    <WebsiteLayout>
      {/* Hero Section */}
      <section className="relative bg-primary py-16 lg:py-24">
        <div className="absolute inset-0 bg-gradient-to-br from-primary via-primary to-primary/80" />
        <div className="container mx-auto px-4 relative z-10 text-center">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-primary-foreground mb-4">
            Travel Blog & Guides
          </h1>
          <p className="text-lg text-primary-foreground/80 max-w-2xl mx-auto">
            Discover travel tips, destination guides, and insider knowledge for your Maharashtra heritage tours.
          </p>
        </div>
      </section>

      {/* Content Section */}
      <section className="py-12 bg-background">
        <div className="container mx-auto px-4">
          {/* Search and Filters */}
          <div className="mb-8 space-y-4">
            <div className="relative max-w-md mx-auto">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <Input
                placeholder="Search articles..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 h-12"
              />
            </div>
            <div className="flex flex-wrap justify-center gap-2">
              <Button
                variant={selectedCategory === null ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedCategory(null)}
              >
                All
              </Button>
              {categories.map((cat) => (
                <Button
                  key={cat.value}
                  variant={selectedCategory === cat.value ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedCategory(cat.value)}
                >
                  {cat.label}
                </Button>
              ))}
            </div>
          </div>

          {/* Posts Grid */}
          {filteredPosts.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-muted-foreground">No articles found matching your search.</p>
            </div>
          ) : (
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {filteredPosts.map((post) => (
                <Card key={post.id} className="overflow-hidden group hover:shadow-lg transition-shadow">
                  <div className="aspect-video relative overflow-hidden">
                    <img
                      src={post.image}
                      alt={post.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <Badge
                      className={`absolute top-3 left-3 ${getCategoryColor(post.category)}`}
                      variant="secondary"
                    >
                      {formatCategoryLabel(post.category)}
                    </Badge>
                  </div>
                  <CardContent className="p-5">
                    <div className="flex items-center gap-4 text-sm text-muted-foreground mb-3">
                      <span className="flex items-center gap-1">
                        <Calendar className="h-4 w-4" />
                        {format(new Date(post.publishedAt), "MMM d, yyyy")}
                      </span>
                      <span className="flex items-center gap-1">
                        <User className="h-4 w-4" />
                        {post.author}
                      </span>
                    </div>
                    <h3 className="font-semibold text-lg text-foreground mb-2 line-clamp-2 group-hover:text-primary transition-colors">
                      {post.title}
                    </h3>
                    <p className="text-sm text-muted-foreground mb-4 line-clamp-3">{post.excerpt}</p>
                    {post.tags.length > 0 && (
                      <div className="flex items-center gap-2 flex-wrap mb-4">
                        <Tag className="h-3 w-3 text-muted-foreground" />
                        {post.tags.slice(0, 3).map((tag) => (
                          <span key={tag} className="text-xs text-muted-foreground">
                            #{tag}
                          </span>
                        ))}
                      </div>
                    )}
                    <Link to={`/website/blog/${post.slug}`}>
                      <Button variant="ghost" size="sm" className="gap-2 p-0 h-auto text-primary hover:text-primary">
                        Read More <ArrowRight className="h-4 w-4" />
                      </Button>
                    </Link>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-12 bg-muted">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-2xl font-bold text-foreground mb-4">Ready to Explore?</h2>
          <p className="text-muted-foreground mb-6 max-w-xl mx-auto">
            Book your Maharashtra heritage tour today and experience these amazing destinations firsthand.
          </p>
          <Link to="/website/tours">
            <Button size="lg">Browse Tours</Button>
          </Link>
        </div>
      </section>
    </WebsiteLayout>
  );
};

export default WebsiteBlog;
