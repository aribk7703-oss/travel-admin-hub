import { useParams, Link, Navigate } from "react-router-dom";
import { WebsiteLayout } from "@/components/website/WebsiteLayout";
import { useBlogPosts } from "@/hooks/useBlogPosts";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowLeft, Calendar, User, Tag, Share2 } from "lucide-react";
import { format } from "date-fns";
import { toast } from "sonner";

const WebsiteBlogArticle = () => {
  const { slug } = useParams<{ slug: string }>();
  const { getPostBySlug, getPublishedPosts } = useBlogPosts();

  const post = slug ? getPostBySlug(slug) : null;

  if (!post || post.status !== "published") {
    return <Navigate to="/website/blog" replace />;
  }

  const relatedPosts = getPublishedPosts()
    .filter((p) => p.id !== post.id && p.category === post.category)
    .slice(0, 3);

  const getCategoryColor = (category: string) => {
    const colors: Record<string, string> = {
      "travel-tips": "bg-blue-100 text-blue-800",
      "destination-guide": "bg-green-100 text-green-800",
      news: "bg-purple-100 text-purple-800",
      announcement: "bg-orange-100 text-orange-800",
    };
    return colors[category] || "bg-gray-100 text-gray-800";
  };

  const formatCategoryLabel = (category: string) => {
    return category
      .split("-")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  };

  const handleShare = async () => {
    const url = window.location.href;
    if (navigator.share) {
      try {
        await navigator.share({
          title: post.title,
          text: post.excerpt,
          url,
        });
      } catch {
        // User cancelled sharing
      }
    } else {
      await navigator.clipboard.writeText(url);
      toast.success("Link copied to clipboard");
    }
  };

  return (
    <WebsiteLayout>
      {/* Hero Section */}
      <section className="relative h-[50vh] min-h-[400px]">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${post.image})` }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent" />
        <div className="container mx-auto px-4 h-full relative z-10 flex flex-col justify-end pb-12">
          <Link to="/website/blog">
            <Button variant="ghost" size="sm" className="text-white/80 hover:text-white mb-4 -ml-2">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Blog
            </Button>
          </Link>
          <Badge className={`w-fit mb-4 ${getCategoryColor(post.category)}`}>
            {formatCategoryLabel(post.category)}
          </Badge>
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4 max-w-4xl">
            {post.title}
          </h1>
          <div className="flex flex-wrap items-center gap-4 text-white/80">
            <span className="flex items-center gap-2">
              <Calendar className="h-4 w-4" />
              {format(new Date(post.publishedAt), "MMMM d, yyyy")}
            </span>
            <span className="flex items-center gap-2">
              <User className="h-4 w-4" />
              {post.author}
            </span>
          </div>
        </div>
      </section>

      {/* Article Content */}
      <section className="py-12 bg-background">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            {/* Share Button */}
            <div className="flex justify-end mb-6">
              <Button variant="outline" size="sm" onClick={handleShare} className="gap-2">
                <Share2 className="h-4 w-4" />
                Share
              </Button>
            </div>

            {/* Excerpt */}
            <p className="text-lg text-muted-foreground mb-8 leading-relaxed">{post.excerpt}</p>

            {/* Content */}
            <div
              className="prose prose-lg max-w-none
                prose-headings:text-foreground prose-headings:font-bold
                prose-h2:text-2xl prose-h2:mt-8 prose-h2:mb-4
                prose-h3:text-xl prose-h3:mt-6 prose-h3:mb-3
                prose-p:text-muted-foreground prose-p:leading-relaxed prose-p:mb-4
                prose-ul:my-4 prose-li:text-muted-foreground prose-li:mb-2
                prose-ol:my-4
                prose-strong:text-foreground"
              dangerouslySetInnerHTML={{ __html: post.content }}
            />

            {/* Tags */}
            {post.tags.length > 0 && (
              <div className="mt-12 pt-8 border-t border-border">
                <div className="flex items-center gap-3 flex-wrap">
                  <Tag className="h-5 w-5 text-muted-foreground" />
                  {post.tags.map((tag) => (
                    <Badge key={tag} variant="outline" className="text-sm">
                      #{tag}
                    </Badge>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Related Posts */}
      {relatedPosts.length > 0 && (
        <section className="py-12 bg-muted">
          <div className="container mx-auto px-4">
            <h2 className="text-2xl font-bold text-foreground mb-8 text-center">Related Articles</h2>
            <div className="grid gap-6 md:grid-cols-3 max-w-5xl mx-auto">
              {relatedPosts.map((relatedPost) => (
                <Card key={relatedPost.id} className="overflow-hidden group hover:shadow-lg transition-shadow">
                  <div className="aspect-video relative overflow-hidden">
                    <img
                      src={relatedPost.image}
                      alt={relatedPost.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <CardContent className="p-4">
                    <p className="text-xs text-muted-foreground mb-2">
                      {format(new Date(relatedPost.publishedAt), "MMM d, yyyy")}
                    </p>
                    <h3 className="font-semibold text-foreground line-clamp-2 mb-3 group-hover:text-primary transition-colors">
                      {relatedPost.title}
                    </h3>
                    <Link to={`/website/blog/${relatedPost.slug}`}>
                      <Button variant="link" size="sm" className="p-0 h-auto text-primary">
                        Read More →
                      </Button>
                    </Link>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* CTA Section */}
      <section className="py-12 bg-primary">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-2xl font-bold text-primary-foreground mb-4">
            Ready to Experience This?
          </h2>
          <p className="text-primary-foreground/80 mb-6 max-w-xl mx-auto">
            Book your tour today and explore Maharashtra's incredible heritage sites with our professional service.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link to="/website/tours">
              <Button size="lg" variant="secondary">
                Browse Tours
              </Button>
            </Link>
            <Link to="/website/contact">
              <Button
                size="lg"
                variant="outline"
                className="border-primary-foreground/20 text-primary-foreground hover:bg-primary-foreground/10"
              >
                Contact Us
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </WebsiteLayout>
  );
};

export default WebsiteBlogArticle;
