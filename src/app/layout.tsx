import { ReactNode } from "react";
import { Metadata } from "next";
import { NextIntlClientProvider } from "@/i18n/compat/client";
import { getLocale, getMessages } from "@/i18n/compat/server";
import { Providers } from "./providers";
import Document from "@/components/Document";
import "./globals.css";
import "./font.css";
import "@/styles/tiptap.scss";

type Props = {
  children: ReactNode;
};

export const metadata: Metadata = {
  metadataBase: new URL("https://magicv.art"),
  title: "Jobly Resume - AI Powered Resume Builder",
  description: "Modern, AI-powered online resume editor optimized for Vercel.",
  icons: {
    icon: "/icon.png",
    shortcut: "/icon.png",
    apple: "/icon.png"
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1
    }
  }
};

export default async function RootLayout({ children }: Props) {
  const locale = await getLocale();
  const messages = await getMessages();

  return (
    <Document locale={locale}>
      <NextIntlClientProvider locale={locale} messages={messages}>
        <Providers>
          {children}
        </Providers>
      </NextIntlClientProvider>
    </Document>
  );
}
