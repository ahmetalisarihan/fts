import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { QueryClient, QueryClientProvider } from 'react-query';
import { AntdRegistry } from '@ant-design/nextjs-registry';
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import Banner from "@/components/Banner";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "FTS",
  description: "Fetes Endustriyel Yapi",
};

const query = new QueryClient();

const RootLayout = ({ children }: React.PropsWithChildren) => (
  <html lang="en">
    <body>
      <div className="max-w-6xl lg:px-16 mx-auto py-2 shadow-xl min-h-screen 
      flex flex-col px-8">
      <Banner />
      <Header />
      <div className="flex-auto">
      <QueryClientProvider client={query}>
      <AntdRegistry>{children}</AntdRegistry>
      </QueryClientProvider>
      </div>
      <Footer />
      </div>
    </body>
  </html>
);

export default RootLayout;
