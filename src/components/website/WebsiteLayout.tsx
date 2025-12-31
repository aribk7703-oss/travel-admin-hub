import { ReactNode } from "react";
import { Navbar } from "./Navbar";
import { WebsiteFooter } from "./WebsiteFooter";

interface WebsiteLayoutProps {
  children: ReactNode;
}

export const WebsiteLayout = ({ children }: WebsiteLayoutProps) => {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />
      <main className="flex-1">{children}</main>
      <WebsiteFooter />
    </div>
  );
};
