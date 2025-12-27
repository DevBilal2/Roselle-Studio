// app/Components/CompactBlogSection.jsx
"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowRight, BookOpen } from "lucide-react";
import BlogCard from "./BlogCard";
import { fetchShopifyBlogArticles, fetchShopifyBlogs } from "../lib/shopify";

const CompactBlogSection = ({ showTitle = true, limit = 3, blogHandle = "elor-scents-blog" }) => {
  const [blogPosts, setBlogPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadBlogPosts() {
      try {
        let posts = await fetchShopifyBlogArticles(blogHandle, 50);
        
        // If no posts found with default handle, try to find any blog
        if (posts.length === 0) {
          const blogs = await fetchShopifyBlogs(10);
          if (blogs.length > 0) {
            posts = await fetchShopifyBlogArticles(blogs[0].handle, 50);
          }
        }
        
        setBlogPosts(posts);
      } catch (error) {
        console.error("Error loading blog posts:", error);
        setBlogPosts([]);
      } finally {
        setLoading(false);
      }
    }
    loadBlogPosts();
  }, [blogHandle]);

  const latestPosts = blogPosts.slice(0, limit);

  return (
    <section id="blog" className="py-12 px-5 bg-white">
      <div className="max-w-7xl mx-auto">
        {showTitle && (
          <div className="flex items-center justify-between mb-8">
            <div>
              <div className="inline-flex items-center gap-2 mb-2">
                <BookOpen size={18} className="text-amber-600" />
                <span className="text-sm font-medium text-amber-600 uppercase tracking-wider">
                  Latest Articles
                </span>
              </div>
              <h2 className="text-2xl md:text-3xl font-bold text-stone-800">
                From Our Blog
              </h2>
            </div>
            <Link
              href="/blogpage"
              className="inline-flex items-center gap-2 text-stone-600 hover:text-stone-800 text-sm font-medium"
            >
              View all
              <ArrowRight size={16} />
            </Link>
          </div>
        )}

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(limit)].map((_, i) => (
              <div key={i} className="bg-white rounded-2xl border border-stone-200 p-5 animate-pulse">
                <div className="h-48 bg-stone-200 rounded-xl mb-4"></div>
                <div className="h-4 bg-stone-200 rounded mb-2"></div>
                <div className="h-4 bg-stone-200 rounded w-3/4"></div>
              </div>
            ))}
          </div>
        ) : latestPosts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {latestPosts.map((post) => (
              <BlogCard key={post.id} post={post} compact={false} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12 text-stone-600">
            <p>No blog posts available at the moment.</p>
          </div>
        )}

        {showTitle && (
          <div className="text-center mt-8">
            <Link
              href="/blogpage"
              className="inline-flex items-center gap-2 px-6 py-2.5 border border-stone-300 text-stone-700 rounded-full hover:bg-stone-50 transition-colors font-medium"
            >
              Browse All Articles
              <ArrowRight size={16} />
            </Link>
          </div>
        )}
      </div>
    </section>
  );
};

export default CompactBlogSection;
