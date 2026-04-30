"use client";

import { usePathname as useNextPathname, useRouter as useNextRouter, useParams as useNextParams, redirect, notFound } from "next/navigation";

export function useLocation() {
  const pathname = useNextPathname();
  return {
    pathname,
  };
}

export function usePathname() {
  return useNextPathname();
}

export function useRouter() {
  return useNextRouter();
}

export function useParams() {
  return useNextParams();
}

export { redirect, notFound };
