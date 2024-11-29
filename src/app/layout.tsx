import type { Metadata } from "next";
import localFont from "next/font/local";
import "./styles/globals.css";
import "./styles/theme.css";

const inter = localFont({
  src: "./fonts/Inter.ttf",
  variable: "--font-inter",
  weight: "100 900",
});
const interItalic = localFont({
  src: "./fonts/Inter-Italic.ttf",
  variable: "--font-inter-italic",
  weight: "100 900",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${inter.variable} ${interItalic.variable} antialiased flex justify-center`}
      >
        <div style={{ width: "1208px" }}>{children}</div>
      </body>
    </html>
  );
}
