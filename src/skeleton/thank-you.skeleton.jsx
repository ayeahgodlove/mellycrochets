"use client";
import { Button } from "@/components/ui";
import { Check, MessageCircle, Phone, Send } from "lucide-react";

const ThankYouPage = () => {
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center relative px-4">
      {/* Main Content */}
      <div className="text-center max-w-xl mx-auto">
        {/* Check Icon */}
        <div className="flex justify-center mb-6">
          <div className="bg-green-700 text-white rounded-full w-20 h-20 flex items-center justify-center text-3xl">
            <Check />
          </div>
        </div>

        {/* Heading */}
        <h1 className="text-3xl md:text-4xl font-bold tracking-wide mb-2">
          THANK YOU FOR YOUR PURCHASE!
        </h1>

        {/* Subtext */}
        <p className="text-gray-600 mb-6">
          We've received your order and are processing it. A confirmation email
          has been sent to you.
        </p>

        {/* Buttons */}
        <div className="flex justify-center gap-4">
          <Button
            type="primary"
            className="bg-rose-600 rounded-full px-6 py-2 text-white"
          >
            Back to Home
          </Button>
          <Button className="rounded-full px-6 py-2 shadow-md">
            View My Orders
          </Button>
        </div>
      </div>

      {/* Floating Contact Buttons */}
      <div className="fixed bottom-6 right-6 flex flex-col items-center gap-3">
        <Button
          shape="circle"
          size="large"
          icon={<Send size={18} />}
          className="bg-green-600 text-white shadow-lg"
        />
        <Button
          shape="circle"
          size="large"
          icon={<Phone size={18} />}
          className="bg-rose-600 text-white shadow-lg"
        />
        <Button
          shape="circle"
          size="large"
          icon={<MessageCircle size={18} />}
          className="bg-white text-black shadow-md"
        />
      </div>
    </div>
  );
};

export default ThankYouPage;
