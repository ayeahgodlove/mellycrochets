import React, { useState } from "react";
import { useCreate, useGetIdentity } from "@refinedev/core";
import { Rate, Input, Button, message } from "@/components/ui";
import { useTranslations } from "next-intl";

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
        userId: user ? user.id : null, // Replace with logged-in user ID
        crochetId,
        rating,
        comment,
        username,
      },
    });
  };

  return (
    <div className="mt-8 p-4 rounded-lg shadow-sm bg-white">
      <h3 className="text-lg font-semibold mb-3">{t("reviewTitle")}</h3>
      <Rate value={rating} onChange={setRating} />
      {!user && (
        <Input
          value={username}
          placeholder="Username"
          onChange={(e) => setUsername(e.target.value)}
          style={{ borderRadius: 10, marginBottom: 20, marginTop: 20 }}
          size="large"
          required
        />
      )}
      <Input.TextArea
        rows={4}
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        placeholder="Share your thoughts..."
        className="my-3"
        style={{ borderRadius: 10 }}
      />
      <Button
        style={{ borderRadius: 10, marginTop: 10 }}
        size="large"
        type="primary"
        loading={isLoading}
        onClick={handleSubmit}
      >
        {t("btnMsg")}
      </Button>
    </div>
  );
};
