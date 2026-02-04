import { Inter } from "next/font/google";
import '../styles/globals.css';

import Header from "@/components/layout/Header/Header";
import Footer from "@/components/layout/Footer/Footer";

const inter = Inter({
  subsets: ["latin"],
  weight: ["300", "400", "700"],
  variable: "--font-sans",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.variable}>
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
