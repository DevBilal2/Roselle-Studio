// app/api/comments/route.js
import { NextResponse } from "next/server";

// In-memory storage (in production, use a database)
// This is a simple implementation - you should use a database like MongoDB, PostgreSQL, etc.
let commentsStore = [];

// GET - Fetch comments for an article
export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const articleId = searchParams.get("articleId");

    if (!articleId) {
      return NextResponse.json(
        { error: "Article ID is required" },
        { status: 400 }
      );
    }

    // Filter comments by articleId and only show approved ones
    const articleComments = commentsStore
      .filter((comment) => comment.articleId === articleId && comment.status === "approved")
      .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

    return NextResponse.json({ comments: articleComments });
  } catch (error) {
    console.error("Error fetching comments:", error);
    return NextResponse.json(
      { error: "Failed to fetch comments" },
      { status: 500 }
    );
  }
}

// POST - Create a new comment
export async function POST(request) {
  try {
    const body = await request.json();
    const { articleId, articleHandle, content, authorName, authorEmail } = body;

    // Validation
    if (!articleId || !content || !authorName || !authorEmail) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    if (content.trim().length < 3) {
      return NextResponse.json(
        { error: "Comment must be at least 3 characters" },
        { status: 400 }
      );
    }

    // Create new comment
    const newComment = {
      id: `comment_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      articleId,
      articleHandle,
      content: content.trim(),
      authorName,
      authorEmail,
      status: "pending", // Comments need moderation by default
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    // Add to store
    commentsStore.push(newComment);

    // In production, you would:
    // 1. Save to database
    // 2. Send notification to admin for moderation
    // 3. Optionally sync with Shopify's comment system via Admin API

    return NextResponse.json({
      comment: newComment,
      message: "Comment submitted successfully. It will appear after moderation.",
    });
  } catch (error) {
    console.error("Error creating comment:", error);
    return NextResponse.json(
      { error: "Failed to create comment" },
      { status: 500 }
    );
  }
}

// Optional: Admin endpoint to approve/reject comments
// This would require authentication
export async function PATCH(request) {
  try {
    const body = await request.json();
    const { commentId, status } = body;

    if (!commentId || !["approved", "rejected", "pending"].includes(status)) {
      return NextResponse.json(
        { error: "Invalid request" },
        { status: 400 }
      );
    }

    const commentIndex = commentsStore.findIndex((c) => c.id === commentId);
    if (commentIndex === -1) {
      return NextResponse.json(
        { error: "Comment not found" },
        { status: 404 }
      );
    }

    commentsStore[commentIndex].status = status;
    commentsStore[commentIndex].updatedAt = new Date().toISOString();

    return NextResponse.json({
      comment: commentsStore[commentIndex],
      message: "Comment status updated",
    });
  } catch (error) {
    console.error("Error updating comment:", error);
    return NextResponse.json(
      { error: "Failed to update comment" },
      { status: 500 }
    );
  }
}


