import { Geist, Geist_Mono, Lato } from "next/font/google";
import "./globals.css";
import Head from "next/head";
// import SideNav from "../components/SideNav/SideNav";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const lato = Lato({
  variable: "--font-lato",
  subsets: ["latin"],
  weight: ["400", "700"],
});

const title = process.env.NEXT_PUBLIC_COMPANY_NAME;

export const metadata = {
  default: {title},
  template: `"%s" | ${title}`
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${lato.variable}`}
      >
        {children}
      </body>
    </html>
  );
}
