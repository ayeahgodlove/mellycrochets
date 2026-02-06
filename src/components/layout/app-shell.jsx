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

      {children}
      <Footer />
      <PrivacyConsent />
    </>
  );
};

export default AppShell;
