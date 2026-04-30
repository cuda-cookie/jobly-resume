import { redirect } from "next/navigation";
import { getLocale } from "@/i18n/compat/server";

export default async function RootPage() {
  const locale = await getLocale();
  redirect(`/${locale}`);
}
