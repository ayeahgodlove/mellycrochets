import { Skeleton, Button } from "@/components/ui";
import { PlayCircle, Send, Share2 } from "lucide-react";

export default function PageSkeleton() {
  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center text-center bg-white px-4 py-12">
      <div className="w-full max-w-md space-y-4">
        <Skeleton.Input active size="large" className="w-full h-8" />
        <Skeleton active paragraph={{ rows: 2 }} />

        <div className="mt-12">
          <Skeleton.Input active size="default" className="w-40 mb-2" />
          <Skeleton.Input active size="small" className="w-60 mb-4" />
          <Skeleton.Button active shape="round" size="large" className="w-32" />
        </div>
      </div>

      {/* Floating Buttons */}
      <div className="fixed bottom-8 right-6 space-y-3 flex flex-col items-center">
        <Button
          shape="circle"
          size="large"
          icon={<Send size={18} />}
          disabled
          className="bg-gray-200 text-gray-400 border-none shadow-md"
        />
        <Button
          shape="circle"
          size="large"
          icon={<Share2 size={18} />}
          disabled
          className="bg-gray-200 text-gray-400 border-none shadow-md"
        />
        <Button
          shape="circle"
          size="large"
          icon={<PlayCircle size={18} />}
          disabled
          className="bg-gray-200 text-gray-400 border-none shadow-md"
        />
      </div>
    </div>
  );
}
