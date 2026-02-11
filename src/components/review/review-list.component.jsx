import React from "react";
import { useList } from "@refinedev/core";
import { Card, Rate, Skeleton, Avatar, Typography, Empty } from "@/components/ui";
import { useTranslations } from "next-intl";
import { format } from "../../lib/format";
import { MessageSquare, User } from "lucide-react";

export const ReviewList = ({ crochetId }) => {
  const t = useTranslations("customer_detail");
  const { data, isLoading } = useList({
    resource: "reviews",
  });

  if (isLoading) {
    return (
      <Card className="shadow-xl border-0 p-6">
        <Skeleton active paragraph={{ rows: 4 }} />
      </Card>
    );
  }
  const reviews = data?.data ?? [];

  const crochetReviews = reviews.filter((d) => d.crochetId === crochetId);

  return (
    <Card className="shadow-xl border-0 overflow-hidden p-0 bg-white">
      <div className="bg-gradient-to-r from-red-900 to-red-800 px-6 py-4">
        <h3 className="text-xl font-bold text-white flex items-center gap-2">
          <MessageSquare size={24} />
          {t("reviewListTitle")}
          {crochetReviews.length > 0 && (
            <span className="ml-auto text-white/90 text-sm font-normal">
              {crochetReviews.length} {crochetReviews.length === 1 ? "review" : "reviews"}
            </span>
          )}
        </h3>
      </div>
      <div className="p-6 md:p-8 bg-white">
        {crochetReviews && crochetReviews.length > 0 ? (
          <div className="space-y-6">
            {crochetReviews.map((review) => {
              const user = review.user;
              return (
                <div
                  key={review.id}
                  className="p-6 rounded-xl border border-gray-200 bg-gray-50 hover:bg-white hover:shadow-md transition-all"
                >
                  <div className="flex items-start gap-4">
                    {user ? (
                      <Avatar
                        src={review.user?.image}
                        size={56}
                        className="flex-shrink-0 border-2 border-white shadow-sm"
                      >
                        {review.user?.username?.[0]?.toUpperCase() || <User size={24} />}
                      </Avatar>
                    ) : (
                      <Avatar 
                        size={56}
                        className="flex-shrink-0 border-2 border-white shadow-sm bg-gradient-to-br from-orange-200 to-orange-300"
                      >
                        <span className="text-orange-700 font-bold text-lg">
                          {format.initials(review.username)}
                        </span>
                      </Avatar>
                    )}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-4 mb-2">
                        <div>
                          <Typography.Title 
                            level={5} 
                            className="!mb-1 !text-base font-bold text-gray-900"
                          >
                            {review.username || "Anonymous"}
                          </Typography.Title>
                          <Rate 
                            disabled 
                            defaultValue={review.rating} 
                            className="text-sm"
                          />
                        </div>
                      </div>
                      <p className="text-gray-700 leading-relaxed mt-3 text-base">
                        {review.comment}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="py-12">
            <Empty
              description={
                <Typography.Text className="text-gray-500 text-lg">
                  {t("noDataMsg")}
                </Typography.Text>
              }
            />
          </div>
        )}
      </div>
    </Card>
  );
};
