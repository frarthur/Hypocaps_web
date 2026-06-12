"use client";

import { useState } from "react";
import classNames from "classnames";
import Link from "../atoms/Link";
import Action from "../atoms/Action";
import ImageBlock from "../blocks/ImageBlock";
import Footer from "../sections/Footer";
import MenuIcon from "../svgs/menu";
import CloseIcon from "../svgs/close";

import headerData from "../../../content/data/header.json";
import footerData from "../../../content/data/footer.json";

interface SiteLayoutProps {
  children: React.ReactNode;
}

export default function SiteLayout({ children }: SiteLayoutProps) {
  const [menuOpen, setMenuOpen] = useState(false);
  const header = headerData as any;
  const footer = footerData as any;

  return (
    <div className="sb-page">
      <div className="sb-base sb-default-base-layout">
        <header
          className={classNames(
            "sb-component sb-component-header bg-light-fg-dark relative shadow-header z-50 p-4"
          )}
        >
          <div className="mx-auto max-w-7xl">
            <div className="relative flex items-center">
              {header.logo?.url && (
                <div className="mr-10">
                  <Link href="/" className="flex items-center">
                    <ImageBlock {...header.logo} />
                  </Link>
                </div>
              )}

              {header.primaryLinks?.length > 0 && (
                <ul className="hidden lg:flex lg:items-center absolute w-auto left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 gap-x-10">
                  {header.primaryLinks.map((link: any, index: number) => (
                    <li key={index} className="py-2">
                      <Action {...link} className="whitespace-nowrap text-sm" />
                    </li>
                  ))}
                </ul>
              )}

              <button
                aria-label="Open Menu"
                title="Open Menu"
                className="ml-auto p-2 -mr-1 focus:outline-none lg:hidden"
                onClick={() => setMenuOpen(true)}
              >
                <MenuIcon className="w-6 h-6 fill-current" />
              </button>
            </div>

            {/* Mobile menu */}
            {menuOpen && (
              <div
                className={classNames("bg-light-fg-dark fixed inset-0 p-4 overflow-y-auto z-10")}
              >
                <div className="flex flex-col min-h-full">
                  <div className="flex items-center justify-between mb-10">
                    {header.logo?.url && (
                      <Link href="/" className="flex items-center">
                        <ImageBlock {...header.logo} />
                      </Link>
                    )}
                    <button
                      aria-label="Close Menu"
                      title="Close Menu"
                      className="p-2 -mr-1 focus:outline-none"
                      onClick={() => setMenuOpen(false)}
                    >
                      <CloseIcon className="w-6 h-6 fill-current" />
                    </button>
                  </div>

                  {header.primaryLinks?.length > 0 && (
                    <ul>
                      {header.primaryLinks.map((link: any, index: number) => (
                        <li
                          key={index}
                          className={classNames(
                            "border-t",
                            link.__metadata?.modelName === "Button" ? "py-4" : "py-3"
                          )}
                        >
                          <Action
                            {...link}
                            className={classNames(
                              "w-full justify-start",
                              link.__metadata?.modelName === "Link" && "py-3",
                              "whitespace-nowrap"
                            )}
                          />
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </div>
            )}
          </div>
        </header>

        {children}

        <Footer {...footer} />
      </div>
    </div>
  );
}
