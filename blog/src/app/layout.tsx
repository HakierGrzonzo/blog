import type { Metadata } from "next";
import { Karla } from "next/font/google";
import "./globals.css";
import classes from "./layout.module.css";
import Link from "next/link";

const karla = Karla({
  variable: "--font-karla",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "HakierGrzonzo's Page",
  description: "HakierGrzonzo's Personal Website",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${karla.className}`}>
      <body>
        <nav className={classes.nav}>
          <div className={classes.navContainer}>
            <Link href="/">Index</Link>
            <Link href="/projects.html">Projects</Link>
            <Link href="/about.html">About</Link>
            <Link href="/blog.html">Blog</Link>
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
