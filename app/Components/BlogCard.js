// app/Components/BlogCard.jsx
import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Calendar, Clock, User, ArrowRight, Tag } from "lucide-react";

const BlogCard = ({ post, featured = false, compact = false }) => {
  if (featured) {
    return (
      <Link href={`/blog/${post.slug}`}>
        <div className="group bg-white rounded-2xl overflow-hidden border border-stone-200 hover:border-stone-300 transition-all duration-300 shadow-sm hover:shadow-md cursor-pointer">
          {/* Image */}
            <div className="relative h-48 overflow-hidden">
              {post.image ? (
                <Image
                  src={post.image}
                  alt={post.title}
                  fill
                  className="object-cover"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  loading="lazy"
                  quality={70}
                />
            ) : (
              <div className="w-full h-full bg-gradient-to-br from-stone-100 to-amber-100 flex items-center justify-center">
                <div className="text-4xl text-stone-300">🌸</div>
              </div>
            )}
            {/* Category Badge */}
            <div className="absolute top-4 left-4">
              <span className="px-3 py-1 bg-white/90 backdrop-blur-sm text-stone-700 text-xs font-medium rounded-full border border-stone-200">
                {post.category}
              </span>
            </div>
          </div>

          {/* Content */}
          <div className="p-6">
            <div className="flex items-center gap-4 text-sm text-stone-500 mb-3">
              <div className="flex items-center gap-1">
                <Calendar size={14} />
                <span>{post.date}</span>
              </div>
              <div className="flex items-center gap-1">
                <Clock size={14} />
                <span>{post.readTime}</span>
              </div>
            </div>

            <h3 className="text-xl font-bold text-stone-800 mb-2 group-hover:text-stone-900 transition-colors line-clamp-2">
              {post.title}
            </h3>

            <p className="text-stone-600 mb-4 line-clamp-2">{post.excerpt}</p>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-stone-100 rounded-full flex items-center justify-center">
                  <User size={14} className="text-stone-600" />
                </div>
                <div>
                  <p className="text-sm font-medium text-stone-700">
                    {post.author}
                  </p>
                  <p className="text-xs text-stone-500">{post.authorRole}</p>
                </div>
              </div>
              <div className="flex items-center gap-1 text-stone-600 group-hover:text-stone-800 transition-colors">
                <span className="text-sm font-medium">Read more</span>
                <ArrowRight
                  size={16}
                  className="group-hover:translate-x-1 transition-transform"
                />
              </div>
            </div>
          </div>
        </div>
      </Link>
    );
  }

  if (compact) {
    return (
      <Link href={`/blog/${post.slug}`}>
        <div className="group bg-white rounded-xl border border-stone-200 hover:border-stone-300 transition-all duration-300 p-4 cursor-pointer">
          <div className="flex items-start gap-4">
            <div className="relative flex-shrink-0 w-20 h-20 rounded-lg bg-gradient-to-br from-stone-100 to-amber-100 flex items-center justify-center overflow-hidden">
              {post.image ? (
                <Image
                  src={post.image}
                  alt={post.title}
                  fill
                  className="object-cover"
                  sizes="80px"
                  loading="lazy"
                />
              ) : (
                <div className="text-2xl text-stone-300">🌸</div>
              )}
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-1">
                <span className="px-2 py-0.5 bg-stone-100 text-stone-700 text-xs rounded-full">
                  {post.category}
                </span>
                <span className="text-xs text-stone-500">{post.readTime}</span>
              </div>
              <h3 className="font-semibold text-stone-800 mb-1 line-clamp-2 group-hover:text-stone-900">
                {post.title}
              </h3>
              <p className="text-sm text-stone-600 line-clamp-2">
                {post.excerpt}
              </p>
              <div className="flex items-center gap-2 mt-2">
                <User size={12} className="text-stone-500" />
                <span className="text-xs text-stone-600">{post.author}</span>
              </div>
            </div>
          </div>
        </div>
      </Link>
    );
  }

  // Regular card
  return (
    <Link href={`/blog/${post.slug}`}>
      <div className="group bg-white rounded-2xl overflow-hidden border border-stone-200 hover:border-stone-300 transition-all duration-300 shadow-sm hover:shadow-md cursor-pointer">
        {/* Image */}
        <div className="relative h-48 overflow-hidden">
          {post.image ? (
            <Image
              src={post.image}
              alt={post.title}
              fill
              className="object-cover"
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              loading="lazy"
              quality={70}
            />
          ) : (
            <div className="w-full h-full bg-gradient-to-br from-stone-100 to-amber-100 flex items-center justify-center">
              <div className="text-4xl text-stone-300">🌸</div>
            </div>
          )}
          {/* Category Badge */}
          <div className="absolute top-4 left-4">
            <span className="px-3 py-1 bg-white/90 backdrop-blur-sm text-stone-700 text-xs font-medium rounded-full border border-stone-200">
              {post.category}
            </span>
          </div>
        </div>

        {/* Content */}
        <div className="p-5">
          <div className="flex items-center gap-3 text-sm text-stone-500 mb-2">
            <div className="flex items-center gap-1">
              <Calendar size={12} />
              <span>{post.date}</span>
            </div>
            <span>•</span>
            <div className="flex items-center gap-1">
              <Clock size={12} />
              <span>{post.readTime}</span>
            </div>
          </div>

          <h3 className="text-lg font-bold text-stone-800 mb-2 group-hover:text-stone-900 transition-colors line-clamp-2">
            {post.title}
          </h3>

          <p className="text-stone-600 text-sm mb-4 line-clamp-2">
            {post.excerpt}
          </p>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-stone-100 rounded-full flex items-center justify-center">
                <User size={12} className="text-stone-600" />
              </div>
              <span className="text-sm text-stone-700">{post.author}</span>
            </div>
            <div className="flex items-center gap-1 text-stone-600 group-hover:text-stone-800 transition-colors">
              <span className="text-xs font-medium">Read</span>
              <ArrowRight
                size={14}
                className="group-hover:translate-x-1 transition-transform"
              />
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default BlogCard;
