import "./globals.css";
import { ReactNode } from "react";
import Navigation from "@/app/components/Navigation";
import SupabaseProvider from "@/app/components/SupabaseProvider";

const RootLayout = ({ children }: { children: ReactNode }) => {
  return (
    <html lang="ja">
      <head />
      <body>
        <SupabaseProvider>
          <div className="flex flex-col min-h-screen bg-[#7494C0]">
            <Navigation />

            <main className="flex-1 container max-w-screen-md mx-auto px-2 py-5 relative">
              {children}
            </main>
          </div>
        </SupabaseProvider>
      </body>
    </html>
  );
};

export default RootLayout;
