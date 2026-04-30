"use client";

import NextLink from "next/link";
import { AnchorHTMLAttributes, forwardRef, PropsWithChildren } from "react";

type Props = PropsWithChildren<
  AnchorHTMLAttributes<HTMLAnchorElement> & {
    to?: string;
    href?: string;
    params?: Record<string, string>;
    search?: any;
  }
>;

export const Link = forwardRef<HTMLAnchorElement, Props>(
  ({ to, href, children, ...props }, ref) => {
    const targetHref = href || to || "#";
    
    // Simple Next.js Link wrapper
    return (
      <NextLink href={targetHref} ref={ref} {...props}>
        {children}
      </NextLink>
    );
  }
);

Link.displayName = "Link";

export default Link;
