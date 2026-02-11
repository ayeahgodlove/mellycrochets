"use client";

import { usePathname } from "next/navigation";
import AppNavigation from "../nav.component";
import Footer from "../footer/footer.component";
import PrivacyConsent from "../privacy-policy/privacy-policy.component";

const AppShell = ({ children }) => {
  const pathname = usePathname();
  const isDashboard = pathname.startsWith("/dashboard");

  if (isDashboard) {
    return <>{children}</>;
  }

  return (
    <>
      <AppNavigation />
      {/* Spacer so content is not hidden under fixed nav (nav height: h-16 = 4rem) */}
      <div className="pt-16">
        {children}
        <Footer />
        <PrivacyConsent />
      </div>
    </>
  );
};

export default AppShell;
