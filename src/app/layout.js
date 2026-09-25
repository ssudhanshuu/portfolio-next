import { Inter, Space_Grotesk } from "next/font/google";
import "./globals.css";
import ToastProvider from "@/components/ToastProvider";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800", "900"],
});

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata = {
  title: "Sudhanshu | Full Stack Developer Portfolio",
  description:
    "Full Stack Developer specializing in React, Node.js, and modern web technologies. Building exceptional digital experiences with clean code and innovative solutions.",
  keywords: [
    "Full Stack Developer",
    "React Developer",
    "Node.js",
    "Web Developer",
    "Portfolio",
    "MERN Stack",
  ],
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${spaceGrotesk.variable} antialiased`}
    >
      <body className="min-h-screen">
        <ToastProvider />
        <div className="particles-bg" />
        <div className="grid-bg" style={{ position: "fixed", inset: 0, zIndex: 0, pointerEvents: "none" }} />
        <div style={{ position: "relative", zIndex: 1 }}>{children}</div>
      </body>
    </html>
  );
}
