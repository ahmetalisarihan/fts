import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import "./globals.css";
import { ClerkProvider } from '@clerk/nextjs'
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import Banner from "@/components/Banner";
import StructuredData from "@/components/StructuredData";
import { ThemeProvider } from "@/components/ThemeProvider";
import { generateOrganizationSchema, generateWebsiteSchema } from "@/utils/structured-data";
import { generateMetadata } from "@/utils/seo";

const roboto = Roboto({ 
  weight: '500',
  subsets: ["latin"] });

export const metadata: Metadata = generateMetadata();

export const viewport = {
  width: 'device-width',
  initialScale: 1,
}



const RootLayout = ({ children }: React.PropsWithChildren) => (
  <ClerkProvider>
  <html lang="tr" suppressHydrationWarning>
    <head>
      <StructuredData schema={[
        generateOrganizationSchema(),
        generateWebsiteSchema()
      ]} />
      <meta name="theme-color" content="#ffffff" />
    </head>
    <body className={`${roboto.className} theme-transition dark-scrollbar`}>
      <ThemeProvider defaultTheme="system">
        <div className="max-w-6xl lg:px-16 mx-auto py-2 dark-shadow min-h-screen 
        flex flex-col px-4 sm:px-6 md:px-8 bg-background">
          <Banner />
          <Header />
          <div className="flex-auto">
            {children}
          </div>
          <Footer />
        </div>
      </ThemeProvider>
    </body>
  </html>
  </ClerkProvider>
);

export default RootLayout;
