import { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import { WebsiteLayout } from "@/components/website/WebsiteLayout";
import { useBlogPosts } from "@/hooks/useBlogPosts";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Calendar, User, Search, ArrowRight } from "lucide-react";

const WebsiteBlog = () => {
  const { posts } = useBlogPosts();
  const [searchQuery, setSearchQuery] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");

  const categories = [
    { value: "destination-guide", label: "Destination Guide" },
    { value: "travel-tips", label: "Travel Tips" },
    { value: "culture", label: "Culture & Heritage" },
    { value: "food", label: "Food & Cuisine" },
    { value: "adventure", label: "Adventure" },
  ];

  const publishedPosts = useMemo(() => {
    return posts
      .filter((post) => post.status === "published")
      .filter((post) => {
        const matchesSearch =
          post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          post.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
          post.tags.some((tag) => tag.toLowerCase().includes(searchQuery.toLowerCase()));

        const matchesCategory = categoryFilter === "all" || post.category === categoryFilter;

        return matchesSearch && matchesCategory;
      })
      .sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime());
  }, [posts, searchQuery, categoryFilter]);

  const featuredPost = publishedPosts[0];
  const otherPosts = publishedPosts.slice(1);

  const getCategoryLabel = (value: string) => {
    return categories.find((c) => c.value === value)?.label || value;
  };

  return (
    <WebsiteLayout>
      {/* Hero */}
      <section className="bg-primary py-16">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl md:text-4xl font-bold text-primary-foreground mb-4">
            Travel Blog
          </h1>
          <p className="text-primary-foreground/80 max-w-2xl">
            Discover travel tips, destination guides, and insider knowledge to make the most of your journeys.
          </p>
        </div>
      </section>

      {/* Filters */}
      <section className="bg-card border-b border-border py-6">
        <div className="container mx-auto px-4">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search articles..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={categoryFilter} onValueChange={setCategoryFilter}>
              <SelectTrigger className="w-full sm:w-[200px]">
                <SelectValue placeholder="Category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                {categories.map((cat) => (
                  <SelectItem key={cat.value} value={cat.value}>
                    {cat.label}
                  </SelectItem>
                ))}</SelectContent>
            </Select>
          </div>
        </div>
      </section>

      {/* Blog Content */}
      <section className="py-12 bg-background">
        <div className="container mx-auto px-4">
          {publishedPosts.length === 0 ? (
            <div className="text-center py-16">
              <p className="text-muted-foreground text-lg">No articles found matching your criteria.</p>
            </div>
          ) : (
            <div className="space-y-12">
              {/* Featured Post */}
              {featuredPost && !searchQuery && categoryFilter === "all" && (
                <Link to={`/website/blog/${featuredPost.slug}`} className="block group">
                  <Card className="overflow-hidden hover:shadow-xl transition-shadow">
                    <div className="grid md:grid-cols-2 gap-0">
                      <div className="aspect-video md:aspect-auto relative overflow-hidden">
                        <img
                          src={featuredPost.image}
                          alt={featuredPost.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                        <Badge className="absolute top-4 left-4 bg-primary">Featured</Badge>
                      </div>
                      <CardContent className="p-6 md:p-8 flex flex-col justify-center">
                        <Badge variant="outline" className="w-fit mb-3">
                          {getCategoryLabel(featuredPost.category)}
                        </Badge>
                        <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-3 group-hover:text-primary transition-colors">
                          {featuredPost.title}
                        </h2>
                        <p className="text-muted-foreground mb-4">{featuredPost.excerpt}</p>
                        <div className="flex items-center gap-4 text-sm text-muted-foreground mb-4">
                          <span className="flex items-center gap-1">
                            <User className="h-4 w-4" />
                            {featuredPost.author}
                          </span>
                          <span className="flex items-center gap-1">
                            <Calendar className="h-4 w-4" />
                            {new Date(featuredPost.publishedAt).toLocaleDateString("en-US", {
                              month: "long",
                              day: "numeric",
                              year: "numeric",
                            })}
                          </span>
                        </div>
                        <span className="flex items-center gap-1 text-primary font-medium group-hover:gap-2 transition-all">
                          Read More <ArrowRight className="h-4 w-4" />
                        </span>
                      </CardContent>
                    </div>
                  </Card>
                </Link>
              )}

              {/* Other Posts Grid */}
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {(searchQuery || categoryFilter !== "all" ? publishedPosts : otherPosts).map((post) => (
                  <Link key={post.id} to={`/website/blog/${post.slug}`} className="block group">
                    <Card className="overflow-hidden h-full hover:shadow-lg transition-shadow">
                      <div className="aspect-video relative overflow-hidden">
                        <img
                          src={post.image}
                          alt={post.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                      </div>
                      <CardContent className="p-5">
                        <Badge variant="outline" className="mb-3">
                          {getCategoryLabel(post.category)}
                        </Badge>
                        <h3 className="font-semibold text-lg text-foreground mb-2 group-hover:text-primary transition-colors line-clamp-2">
                          {post.title}
                        </h3>
                        <p className="text-sm text-muted-foreground mb-4 line-clamp-2">{post.excerpt}</p>
                        <div className="flex items-center gap-3 text-xs text-muted-foreground">
                          <span className="flex items-center gap-1">
                            <User className="h-3 w-3" />
                            {post.author}
                          </span>
                          <span className="flex items-center gap-1">
                            <Calendar className="h-3 w-3" />
                            {new Date(post.publishedAt).toLocaleDateString()}
                          </span>
                        </div>
                      </CardContent>
                    </Card>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>
    </WebsiteLayout>
  );
};

export default WebsiteBlog;
