import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ProductProvider } from "@/components/context/product-provider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title:
    "Explore Our Extensive Collection of High-Quality Products - Discover the Best Deals and More",
  description:
    "Delve into our diverse product gallery, featuring a wide range of top-quality products, exclusive offers, and much more.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className} suppressHydrationWarning={true}>
        <ProductProvider>{children}</ProductProvider>
      </body>
    </html>
  );
}
