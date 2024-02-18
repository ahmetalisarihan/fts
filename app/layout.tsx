import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { AntdRegistry } from '@ant-design/nextjs-registry';
import Navbar from "./(root)/Navbar/page";
import Footer from "@/components/Footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "FTS",
  description: "Fetes Endustriyel Yapi",
};

const RootLayout = ({ children }: React.PropsWithChildren) => (
  <html lang="en">
    <body>
      <Navbar />
      <AntdRegistry>{children}</AntdRegistry>
      <Footer />
    </body>
  </html>
);

export default RootLayout;
