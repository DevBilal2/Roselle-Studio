"use client";
import { useState, useEffect } from "react";
import { MessageCircle, Send, User, Lock, AlertCircle } from "lucide-react";
import Link from "next/link";
import { checkAuthStatus } from "../lib/auth";

export default function BlogComments({ articleId, articleHandle }) {
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [user, setUser] = useState(null);
  const [showLoginPrompt, setShowLoginPrompt] = useState(false);

  useEffect(() => {
    // Check if user is logged in
    const authUser = checkAuthStatus();
    setUser(authUser);
    
    // Load comments
    loadComments();
  }, [articleId]);

  const loadComments = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(`/api/comments?articleId=${articleId}`);
      if (response.ok) {
        const data = await response.json();
        setComments(data.comments || []);
      }
    } catch (error) {
      console.error("Error loading comments:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!user) {
      setShowLoginPrompt(true);
      return;
    }

    if (!newComment.trim()) {
      return;
    }

    setIsSubmitting(true);
    try {
      const response = await fetch("/api/comments", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          articleId,
          articleHandle,
          content: newComment.trim(),
          authorName: `${user.firstName || ""} ${user.lastName || ""}`.trim() || user.email,
          authorEmail: user.email,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        setComments([data.comment, ...comments]);
        setNewComment("");
        setShowLoginPrompt(false);
      } else {
        const error = await response.json();
        alert(error.message || "Failed to post comment");
      }
    } catch (error) {
      console.error("Error posting comment:", error);
      alert("Failed to post comment. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInSeconds = Math.floor((now - date) / 1000);

    if (diffInSeconds < 60) return "just now";
    if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)} minutes ago`;
    if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)} hours ago`;
    if (diffInSeconds < 604800) return `${Math.floor(diffInSeconds / 86400)} days ago`;
    
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const getInitials = (name) => {
    if (!name) return "U";
    const parts = name.split(" ");
    if (parts.length >= 2) {
      return (parts[0][0] + parts[1][0]).toUpperCase();
    }
    return name[0].toUpperCase();
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-xl font-bold text-stone-800">
          Comments ({comments.length})
        </h3>
      </div>

      {/* Comment Form */}
      {user ? (
        <form onSubmit={handleSubmit} className="bg-white rounded-xl p-6 border border-stone-200">
          <div className="flex items-start gap-4">
            <div className="w-10 h-10 bg-stone-100 rounded-full flex items-center justify-center flex-shrink-0">
              <span className="font-medium text-stone-700 text-sm">
                {getInitials(user.firstName || user.email)}
              </span>
            </div>
            <div className="flex-1">
              <textarea
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                placeholder="Write your comment..."
                className="w-full px-4 py-3 border border-stone-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-stone-400 focus:border-transparent resize-none"
                rows={4}
                disabled={isSubmitting}
              />
              <div className="flex items-center justify-between mt-3">
                <p className="text-xs text-stone-500">
                  Commenting as {user.firstName || user.email}
                </p>
                <button
                  type="submit"
                  disabled={isSubmitting || !newComment.trim()}
                  className="flex items-center gap-2 px-6 py-2 bg-stone-800 text-white rounded-full hover:bg-stone-900 transition-colors disabled:opacity-50 disabled:cursor-not-allowed font-medium"
                >
                  {isSubmitting ? (
                    "Posting..."
                  ) : (
                    <>
                      <Send size={16} />
                      Post Comment
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        </form>
      ) : (
        <div className="bg-amber-50 border border-amber-200 rounded-xl p-6">
          <div className="flex items-start gap-4">
            <div className="p-2 bg-amber-100 rounded-full">
              <Lock size={20} className="text-amber-700" />
            </div>
            <div className="flex-1">
              <h4 className="font-semibold text-amber-900 mb-2">
                Sign in to comment
              </h4>
              <p className="text-sm text-amber-800 mb-4">
                You need to be logged in to leave a comment on this article.
              </p>
              <div className="flex gap-3">
                <Link
                  href="/login"
                  className="px-4 py-2 bg-amber-700 text-white rounded-lg hover:bg-amber-800 transition-colors font-medium text-sm"
                >
                  Sign In
                </Link>
                <Link
                  href="/register"
                  className="px-4 py-2 bg-white text-amber-700 border border-amber-300 rounded-lg hover:bg-amber-50 transition-colors font-medium text-sm"
                >
                  Create Account
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Comments List */}
      {isLoading ? (
        <div className="text-center py-8 text-stone-500">
          Loading comments...
        </div>
      ) : comments.length > 0 ? (
        <div className="space-y-6">
          {comments.map((comment) => (
            <div
              key={comment.id}
              className="bg-white rounded-xl p-5 border border-stone-200"
            >
              <div className="flex items-start gap-3 mb-3">
                <div className="w-10 h-10 bg-stone-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="font-medium text-stone-700 text-sm">
                    {getInitials(comment.authorName)}
                  </span>
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <p className="font-medium text-stone-800">
                      {comment.authorName}
                    </p>
                    {comment.status === "pending" && (
                      <span className="px-2 py-0.5 bg-amber-100 text-amber-700 text-xs rounded-full">
                        Pending
                      </span>
                    )}
                  </div>
                  <p className="text-sm text-stone-500">
                    {formatDate(comment.createdAt)}
                  </p>
                </div>
              </div>
              <p className="text-stone-700 leading-relaxed">{comment.content}</p>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-12 bg-white rounded-xl border border-stone-200">
          <MessageCircle size={48} className="text-stone-300 mx-auto mb-4" />
          <p className="text-stone-600 font-medium mb-2">No comments yet</p>
          <p className="text-sm text-stone-500">
            Be the first to share your thoughts!
          </p>
        </div>
      )}
    </div>
  );
}

