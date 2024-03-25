import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { AntdRegistry } from '@ant-design/nextjs-registry';
import Footer from "@/components/Footer";
import Header from "@/components/Header";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "FTS",
  description: "Fetes Endustriyel Yapi",
};

const RootLayout = ({ children }: React.PropsWithChildren) => (
  <html lang="en">
    <body>
      <div className="max-w-6xl lg:px-16 mx-auto py-8 shadow-xl min-h-screen 
      flex flex-col px-8">
      <Header />
      <div className="flex-auto">
      <AntdRegistry>{children}</AntdRegistry>
      </div>
      <Footer />
      </div>
    </body>
  </html>
);

export default RootLayout;
