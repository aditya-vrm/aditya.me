import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";

const plusJakarta = Plus_Jakarta_Sans({
  variable: "--font-jakarta",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
  display: "swap",
});

export const metadata = {
  title: "Aditya Verma — Full Stack Developer",
  description: "Portfolio of Aditya Verma, a premium Full Stack Developer specializing in highly interactive, fluid web experiences, 3D graphics, and clean design.",
  openGraph: {
    title: "Aditya Verma — Full Stack Developer Portfolio",
    description: "Explore the premium portfolio of Aditya Verma, displaying full-stack expertise, interactive timelines, and 3D graphics.",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Aditya Verma — Full Stack Developer Portfolio",
    description: "Explore the premium portfolio of Aditya Verma, displaying full-stack expertise, interactive timelines, and 3D graphics.",
  }
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${plusJakarta.variable} h-full antialiased scroll-smooth`}
    >
      <body className="min-h-full flex flex-col bg-background text-foreground font-sans selection:bg-accent selection:text-white overflow-x-hidden">
        <div className="noise-overlay" />
        {children}
      </body>
    </html>
  );
}
