import type { Metadata } from "next";
import { Karla } from "next/font/google";
import "./globals.css";
import classes from "./layout.module.css";
import Link from "next/link";
import { baseOpenGraph, SITE_URL } from "@/site";

const karla = Karla({
  variable: "--font-karla",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: "HakierGrzonzo's Page",
  description: "HakierGrzonzo's Personal Website",
  robots: { index: true, follow: true },
  openGraph: { ...baseOpenGraph, type: "website" },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${karla.className}`}>
      <body>
        <nav className={classes.nav}>
          <div className={classes.navContainer}>
            <Link href="/">Index</Link>
            <Link href="/projects">Projects</Link>
            <Link href="/about">About</Link>
            <Link href="/blog">Blog</Link>
          </div>
        </nav>
        <div className={classes.container}>{children}</div>
        <div className={`${classes.container} ${classes.foot}`}>
          <p>
            Grzegorz <em>HakierGrzonzo</em> Koperwas
          </p>
        </div>
      </body>
    </html>
  );
}
