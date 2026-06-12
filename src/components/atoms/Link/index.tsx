import * as React from "react";
import NextLink from "next/link";
import type { LinkProps } from "../../../types/stackbit";
export default function Link({ children, href, ...other }: LinkProps) {
  if (!href) {
    return <>{children}</>;
  }

  // Pass Any internal link to Next.js Link, for anything else, use <a> tag
  if (/^\/(?!\/)/.test(href)) {
    return (
      <NextLink href={href} {...other}>
        {children}
      </NextLink>
    );
  }

  return (
    <a href={href} target="_blank" rel="noopener noreferrer" {...other}>
      {children}
    </a>
  );
}
