"use client";
import { Button, Tooltip } from "@/components/ui";
import { useEffect, useState } from "react";
import { FaRegShareFromSquare } from "react-icons/fa6";

export default function ShareButton({ title, text }) {
  const [canShare, setCanShare] = useState(false);

  useEffect(() => {
    // Check if Web Share API is supported
    if (navigator.share) {
      setCanShare(true);
    }
  }, []);

  const handleShare = async () => {
    try {
      await navigator.share({
        title,
        text,
        url: window.location.href,
      });
    } catch (err) {
      console.error("Sharing failed:", err);
    }
  };

  if (!canShare) return null; // Hide if not supported

  return (
    <Tooltip title="Share this item">
      <Button
        onClick={handleShare}
        icon={<FaRegShareFromSquare size={22} />}
        type="link"
      >
        Share
      </Button>
    </Tooltip>
  );
}
