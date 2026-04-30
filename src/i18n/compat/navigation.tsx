"use client";

import { Link as CustomLink } from "@/lib/link";
import { useLocation as CustomUseLocation } from "@/lib/navigation";

export const Link = CustomLink;
export const useLocation = CustomUseLocation;

// Stubs for next-intl compatibility if needed
export const defineRouting = (config: any) => config;
export const createNavigation = (routing: any) => ({
  Link: CustomLink,
  usePathname: () => {
    const { pathname } = CustomUseLocation();
    return pathname;
  },
  useRouter: () => ({}),
  redirect: () => ({}),
  getPathname: () => ""
});
