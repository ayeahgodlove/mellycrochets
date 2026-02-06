"use client";

import { useEffect, useState } from "react";
import { Button } from '@/components/ui';

export default function PrivacyConsentBanner() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem("privacyConsent");
    if (!consent) {
      setVisible(true);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem("privacyConsent", "accepted");
    setVisible(false);
  };

  const handleReject = () => {
    localStorage.setItem("privacyConsent", "rejected");
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div className="fixed bottom-0 left-0 w-full z-[100] bg-white border-t border-gray-200 shadow-lg p-4 sm:flex sm:items-center sm:justify-between text-sm sm:text-base">
      <div className="text-gray-700 mb-2 sm:mb-0 sm:mr-4">
        We use cookies to improve your experience and send promotional emails.
        By clicking Accept, you agree to our privacy policy.
      </div>
      <div className="flex gap-2 justify-end">
        <Button size="small" onClick={handleReject}>
          Reject
        </Button>
        <Button type="primary" size="small" onClick={handleAccept}>
          Accept
        </Button>
      </div>
    </div>
  );
}
