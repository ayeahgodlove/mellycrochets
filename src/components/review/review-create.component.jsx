import React, { useState } from "react";
import { useCreate, useGetIdentity } from "@refinedev/core";
import { Rate, Input, Button, message, Card } from "@/components/ui";
import { useTranslations } from "next-intl";
import { MessageSquare, Star } from "lucide-react";

export const ReviewCreate = ({ crochetId }) => {
  const { mutate, isLoading } = useCreate();
  const { data: user } = useGetIdentity({});
  const [rating, setRating] = useState(3);
  const [username, setUsername] = useState("");
  const [comment, setComment] = useState("");
  const t = useTranslations("customer_detail");

  const handleSubmit = () => {
    const isUsername = !user && !username 
    if (!rating || !comment.trim() || isUsername) {
      return message.warning(t("warningMsg"));
    }

    mutate({
      resource: "reviews",
      values: {
        userId: user ? user.id : null,
        crochetId,
        rating,
        comment,
        username,
      },
    });
    
    // Reset form after successful submission
    setComment("");
    setRating(3);
    if (!user) setUsername("");
  };

  return (
    <Card className="shadow-xl border-0 overflow-hidden p-0 bg-white">
      <div className="bg-gradient-to-r from-red-900 to-red-800 px-6 py-4">
        <h3 className="text-xl font-bold text-white flex items-center gap-2">
          <MessageSquare size={24} />
          {t("reviewTitle")}
        </h3>
      </div>
      <div className="p-6 md:p-8 bg-white">
        <div className="space-y-6">
          <div className="space-y-2">
            <label className="text-sm font-semibold text-gray-700 flex items-center gap-2">
              <Star size={16} className="text-yellow-500" />
              Your Rating
            </label>
            <Rate value={rating} onChange={setRating} className="text-2xl" />
          </div>
          
          {!user && (
            <div className="space-y-2">
              <label className="text-sm font-semibold text-gray-700">Your Name</label>
              <Input
                value={username}
                placeholder="Enter your name"
                onChange={(e) => setUsername(e.target.value)}
                className="rounded-lg h-11"
                size="large"
                required
              />
            </div>
          )}
          
          <div className="space-y-2">
            <label className="text-sm font-semibold text-gray-700">Your Review</label>
            <Input.TextArea
              rows={5}
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="Share your thoughts about this product..."
              className="rounded-lg resize-none"
            />
          </div>
          
          <Button
            className="w-full sm:w-auto rounded-lg h-12 px-8 bg-red-800 hover:bg-red-900 text-white font-semibold shadow-md hover:shadow-lg transition-all"
            size="large"
            type="primary"
            loading={isLoading}
            onClick={handleSubmit}
          >
            {t("btnMsg")}
          </Button>
        </div>
      </div>
    </Card>
  );
};
