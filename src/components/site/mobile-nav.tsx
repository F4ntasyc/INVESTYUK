"use client";

import { Menu, X } from "lucide-react";
import { cn } from "cn";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Link, usePathname } from "@/i18n/navigation";
import type { Locale } from "@/i18n/routing";
import { LocaleSwitcher } from "./locale-switcher";
import { isActivePath, isGroup, type NavItem } from "./nav-items";

type Props = {
  items: NavItem[];
  labels: {
    open: string;
    close: string;
    title: string;
    nav: string;
    language: string;
    track: string;
    login: string;
  };
  localeNames: Record<Locale, string>;
};

const linkClass =
  "flex min-h-touch items-center rounded-lg px-3 text-base font-medium text-navy hover:bg-accent";

export function MobileNav({ items, labels, localeNames }: Props) {
  const pathname = usePathname();

  const navLink = (href: string, label: string, sub = false) => {
    const active = isActivePath(pathname, href);
    return (
      <SheetClose asChild>
        <Link
          href={href}
          aria-current={active ? "page" : undefined}
          className={cn(linkClass, sub && "text-[0.9375rem]", active && "bg-accent text-blue")}
        >
          {label}
        </Link>
      </SheetClose>
    );
  };

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="xl:hidden" aria-label={labels.open}>
          <Menu aria-hidden className="size-6" />
        </Button>
      </SheetTrigger>
      <SheetContent side="right" showCloseButton={false} className="w-[min(22rem,100vw)] gap-0 overflow-y-auto p-0">
        <div className="flex h-16 items-center justify-between border-b border-border px-4">
          <SheetTitle className="font-heading text-lg text-navy">{labels.title}</SheetTitle>
          <SheetDescription className="sr-only">{labels.nav}</SheetDescription>
          <SheetClose asChild>
            <Button variant="ghost" size="icon" aria-label={labels.close}>
              <X aria-hidden className="size-6" />
            </Button>
          </SheetClose>
        </div>

        <nav aria-label={labels.nav} className="px-3 py-4">
          <ul className="flex flex-col gap-1">
            {items.map((item) =>
              isGroup(item) ? (
                <li key={item.key} className="pt-2">
                  <p className="px-3 pb-1 text-sm font-semibold text-text-2">{item.label}</p>
                  <ul className="ml-3 flex flex-col gap-1 border-l-2 border-border pl-2">
                    {item.children.map((child) => (
                      <li key={child.key}>{navLink(child.href, child.label, true)}</li>
                    ))}
                  </ul>
                </li>
              ) : (
                <li key={item.key}>{navLink(item.href, item.label)}</li>
              ),
            )}
          </ul>
        </nav>

        <div className="mt-auto flex flex-col gap-3 border-t border-border px-6 py-5">
          <div className="flex items-center justify-between">
            <span className="text-sm text-text-2">{labels.language}</span>
            <LocaleSwitcher names={localeNames} />
          </div>
          <SheetClose asChild>
            <Link href="/lacak" className="inline-flex min-h-touch items-center text-sm font-semibold text-blue hover:underline">
              {labels.track}
            </Link>
          </SheetClose>
          <SheetClose asChild>
            <Button asChild variant="outline" className="w-full">
              <Link href="/masuk">{labels.login}</Link>
            </Button>
          </SheetClose>
        </div>
      </SheetContent>
    </Sheet>
  );
}
