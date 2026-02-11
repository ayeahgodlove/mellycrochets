"use client";
import { Input, Button, Tooltip, Typography, message } from "@/components/ui";
import { useEffect, useState } from "react";
import { commentAPI } from "../../store/api/comment_api";
import { useGetIdentity } from "@refinedev/core";
import { useCreate } from "@refinedev/core";
import dayjs from "dayjs";
const { TextArea } = Input;
const { Paragraph, Text } = Typography;

const PostComments = ({ postId }) => {
  const [justPosted, setJustPosted] = useState(false);

  const { mutate } = useCreate({
    resource: "comments",
  });

  const {
    data: comments,
    isLoadingComment,
    isFetchingComment,
    refetch,
  } = commentAPI.useFetchAllCommentsQuery(1);

  const { data: user } = useGetIdentity({});

  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);

  const handlePost = async () => {
    if (!content.trim()) return;
    try {
      setLoading(true);
      mutate(
        {
          values: {
            userId: user.id,
            postId: postId,
            message: content,
            toggle: true,
          },
        },
        {
          onSuccess: () => {
            setContent("");
            setJustPosted(true);
            message.success("Your comment has been posted!");
            refetch();
          },
          onError: () => {
            message.error("Failed to post comment.");
          },
          onSettled: () => {
            setLoading(false);
          },
        }
      );
      setContent("");
    } catch (err) {
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (justPosted && comments?.length > 0 && postId) {
      const postComments = comments.filter((c) => c.postId === postId);
      const last = postComments[postComments.length - 1];
      if (last) {
        document.getElementById(`comment-${last.id}`)?.scrollIntoView({ behavior: "smooth" });
      }
      setJustPosted(false);
    }
  }, [comments, justPosted, postId]);

  if (isLoadingComment || isFetchingComment) {
    return (
      <div
        style={{
          minHeight: "65vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <p className="text-lg text-center">Details loading...</p>
      </div>
    );
  }

  return (
    <div className="rounded-2xl border border-[#e5e5e5] bg-white shadow-sm overflow-hidden">
      <div className="px-5 py-4 border-b border-[#e5e5e5] bg-[#fafaf9]">
        <h2 className="text-base font-semibold text-[#1a1a1a]">Comments</h2>
      </div>
      <div className="p-5">
        {/* Comment Form or Prompt */}
        {user ? (
          <div className="mb-6">
            <Paragraph strong className="mb-2">
              Comment as <Text type="success">{user.name}</Text>
            </Paragraph>
            <TextArea
              rows={4}
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Write your comment here..."
            />
            <div className="text-right mt-2">
              <Button
                type="primary"
                loading={loading}
                onClick={handlePost}
                disabled={!content.trim()}
              >
                Post Comment
              </Button>
            </div>
          </div>
        ) : (
          <Paragraph className="text-center text-gray-500 italic">
            Please{" "}
            <a href={`/login?redirect=${encodeURIComponent(window.location.pathname)}`} className="text-blue-600 underline">
              sign in
            </a>{" "}
            to leave a comment.
          </Paragraph>
        )}

        {/* Comment List (filtered by current post) */}
        <div className="space-y-6 mt-6">
          {(() => {
            const postComments = comments?.filter((c) => c.postId === postId) ?? [];
            return postComments.length > 0 ? (
            postComments.map((comment) => (
              <div key={comment.id} id={`comment-${comment.id}`}>
                <div className="flex gap-3">
                  {comment.user?.image ? (
                    <img
                      src={comment.user.image}
                      alt={comment.user.username ?? "User"}
                      className="w-8 h-8 rounded-full object-cover"
                    />
                  ) : (
                    <div className="w-8 h-8 rounded-full bg-[#fef2f2] text-[#82181a] flex items-center justify-center text-sm font-medium shrink-0">
                      {(comment.user?.username ?? "U").charAt(0).toUpperCase()}
                    </div>
                  )}
                  <div className="flex-1">
                    <div className="flex flex-wrap items-center gap-2 text-sm">
                      <span className="font-semibold text-gray-900">
                        {comment.user?.username ?? "Anonymous"}
                      </span>
                      <Tooltip
                        title={dayjs(comment.createdAt).format(
                          "YYYY-MM-DD HH:mm"
                        )}
                      >
                        <span className="text-gray-500">
                          {dayjs(comment.createdAt).format("MMM D, YYYY hh:mm A")}
                        </span>
                      </Tooltip>
                    </div>
                    <p className="mt-1 text-gray-700">{comment.message}</p>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <Paragraph type="secondary" className="text-center">
              No comments yet. Be the first to comment!
            </Paragraph>
          );
          })()}
        </div>
      </div>
    </div>
  );
};

export default PostComments;
