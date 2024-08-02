import Icon from "@/lib/icon";
import React from "react";
import { Toaster } from "react-hot-toast";
import { Dock, DockIcon } from "../magicui/dock";
import Footer from "./Footer";
import Navbar from "./Navbar";
export type IconProps = React.HTMLAttributes<SVGElement>;

const SiteLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <main id="main" className="h-screen relative">
      <Navbar />
      {children}
      <Footer />
      <Toaster position="bottom-right" />
    </main>
  );
};

export default SiteLayout;
