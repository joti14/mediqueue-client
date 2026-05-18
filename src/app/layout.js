import { Inter, Montserrat } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/shared/Navbar";
import Footer from "@/components/shared/Footer";

// Load Inter font (used for body, labels and standard text)
const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

// Load Montserrat font (used for primary headers and logo)
const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-montserrat",
});

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${inter.variable} ${montserrat.variable}`}>
      <body className="bg-[#f8f9ff] text-[#0b1c30] antialiased">
        <Navbar />
        <main className="pt-20">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
