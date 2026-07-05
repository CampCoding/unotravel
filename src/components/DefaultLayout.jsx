"use client";

import { Provider } from "react-redux";
import { store } from "../lib/store";

import Header from "@/layouts/Header/Header";
import Footer from "@/layouts/Footer/Footer";
import AosAnimation from "@/components/shared/AosComponent/AosComponent";
import SplashLoader from "@/components/shared/SplashLoader/SplashLoader";
import { usePathname } from "next/navigation";
import { UmrahProvider } from "@/context/UmrahContext";
import { usePageVisit } from "@/hooks/usePageVisit";

function VisitTracker() {
  usePageVisit();
  return null;
}

export default function DefaultLayout({ children }) {
  const pathname = usePathname();
  const hideLayout = ["/sign-in"].some((path) => pathname.startsWith(path));

  return (
    <Provider store={store}>
      <UmrahProvider>
        <VisitTracker />
        <SplashLoader />
        {!hideLayout && <Header />}
        <main style={{ overflowY: "auto", minHeight: "100vh" }}>
          {children}
        </main>
        {!hideLayout && <Footer />}
      </UmrahProvider>

      <AosAnimation />
    </Provider>
  );
}
