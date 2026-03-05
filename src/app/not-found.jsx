import Link from "next/link";
import { FiHome, FiShoppingBag } from "react-icons/fi";

export default function NotFound() {
  return (
    <main
      className="min-h-[calc(100vh-8rem)] flex flex-col items-center justify-center px-4 py-16 sm:py-24"
      role="main"
      aria-label="Page not found"
    >
      <div className="max-w-lg w-full text-center">
        {/* Decorative 404 */}
        <div className="relative mb-6 sm:mb-8">
          <span
            className="text-[7rem] sm:text-[9rem] font-extrabold leading-none tracking-tighter text-[#82181a]/10 select-none"
            aria-hidden
          >
            404
          </span>
        </div>

        {/* Icon and heading */}
        <div className="flex justify-center mb-4">
          <span
            className="flex items-center justify-center w-14 h-14 rounded-2xl bg-[#fef2f2] text-[#82181a] border border-[#82181a]/10"
            aria-hidden
          >
            <FiShoppingBag className="w-7 h-7" strokeWidth={1.5} />
          </span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 mb-2">
          Page not found
        </h1>
        <p className="text-slate-600 text-base sm:text-lg mb-8 max-w-md mx-auto">
          The page you’re looking for doesn’t exist or has been moved. Let’s get you back to something lovely.
        </p>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4">
          <Link
            href="/"
            className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full text-base font-semibold text-white bg-[#82181a] hover:bg-[#6c1315] shadow-md shadow-rose-200/50 hover:shadow-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#82181a]"
          >
            <FiHome className="w-5 h-5 shrink-0" aria-hidden />
            Back to home
          </Link>
          <Link
            href="/shop"
            className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full text-base font-semibold border-2 border-[#82181a] text-[#82181a] bg-transparent hover:bg-[#82181a]/5 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#82181a]"
          >
            <FiShoppingBag className="w-5 h-5 shrink-0" aria-hidden />
            Browse shop
          </Link>
        </div>

        {/* Optional helper link */}
        <p className="mt-8 text-sm text-slate-500">
          Need help?{" "}
          <Link
            href="/contact"
            className="font-medium text-[#82181a] hover:underline focus:outline-none focus:ring-2 focus:ring-[#82181a] focus:ring-offset-1 rounded"
          >
            Contact us
          </Link>
        </p>
      </div>
    </main>
  );
}
