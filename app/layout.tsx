import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import "./globals.css";
import { AntdRegistry } from '@ant-design/nextjs-registry';
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import Banner from "@/components/Banner";

const roboto = Roboto({ 
  weight: '500',
  subsets: ["latin"] });

export const metadata: Metadata = {
  title: "FTS",
  description: "Fetes Endustriyel Yapi",
};



const RootLayout = ({ children }: React.PropsWithChildren) => (
  <html lang="en">
    <body className={roboto.className}>
      <div className="max-w-6xl lg:px-16 mx-auto py-2 shadow-xl min-h-screen 
      flex flex-col px-8">
      <Banner />
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
