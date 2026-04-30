import { ReactNode } from "react";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import {
  getTranslations,
  setRequestLocale
} from "@/i18n/compat/server";
import { locales } from "@/i18n/config";

type Props = {
  children: ReactNode;
  params: Promise<{ locale: string }>;
};

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params
}: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale: locale as any, namespace: "common" });
  const baseUrl = "https://magicv.art";

  return {
    title: t("title") + " - " + t("subtitle"),
    description: t("description"),
    alternates: {
      canonical: `${baseUrl}/${locale}`
    },
    openGraph: {
      title: t("title"),
      description: t("description"),
      locale: locale,
      alternateLocale: locale === "en" ? ["zh"] : ["en"]
    }
  };
}

export default async function LocaleLayout({
  children,
  params
}: Props) {
  const { locale } = await params;
  
  if (!locales.includes(locale as any)) {
    notFound();
  }

  setRequestLocale(locale as any);

  return (
    <>
      {children}
    </>
  );
}
