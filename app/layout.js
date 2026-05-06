import { Playfair_Display, DM_Sans } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import SessionProvider from "@/components/SessionProvider";

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-dm-sans",
  display: "swap",
});

export const metadata = {
  title: {
    default: "Profile App — Meet the Team",
    template: "%s | Profile App",
  },
  description:
    "Browse and discover team member profiles — developers, designers, and more.",
  keywords: ["profiles", "team", "developers", "designers"],
  openGraph: {
    title: "Profile App — Meet the Team",
    description: "Browse and discover team member profiles.",
    type: "website",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${playfair.variable} ${dmSans.variable}`}>
      <body>
        <SessionProvider>
          <Navbar />
          <main className="main-content">{children}</main>
          <footer className="site-footer">
            <p>© {new Date().getFullYear()} Profile App. All rights reserved.</p>
          </footer>
        </SessionProvider>
      </body>
    </html>
  );
}
