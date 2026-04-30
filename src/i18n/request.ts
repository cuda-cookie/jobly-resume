import { getRequestConfig } from "@/i18n/compat/server";
import { defaultLocale } from "./config";

export default getRequestConfig(async () => {
  return {
    locale: defaultLocale,
    messages: (await import(`./locales/${defaultLocale}.json`)).default,
  };
});
