"use client";

import { cn } from "cn";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { Link, usePathname } from "@/i18n/navigation";
import { isActiveGroup, isActivePath, isGroup, type NavItem } from "./nav-items";

const itemBase =
  "relative inline-flex h-11 flex-row items-center gap-0 rounded-full px-3 py-0 text-sm font-medium whitespace-nowrap text-navy transition-colors hover:bg-accent hover:text-navy focus:bg-transparent focus-visible:bg-accent focus-visible:ring-3 focus-visible:ring-ring focus-visible:outline-none data-[active=true]:bg-transparent";
// Item aktif: teks biru + garis bawah (seperti mockup).
const activeMark =
  "text-blue data-[active=true]:text-blue after:absolute after:inset-x-3 after:-bottom-[9px] after:h-0.5 after:rounded-full after:bg-blue";

export function DesktopNav({ items, label }: { items: NavItem[]; label: string }) {
  const pathname = usePathname();

  return (
    <NavigationMenu viewport={false} aria-label={label} className="hidden xl:flex">
      <NavigationMenuList className="gap-1">
        {items.map((item) =>
          isGroup(item) ? (
            <NavigationMenuItem key={item.key}>
              <NavigationMenuTrigger
                className={cn(
                  itemBase,
                  "bg-transparent data-[state=open]:bg-accent",
                  isActiveGroup(pathname, item) && activeMark,
                )}
              >
                {item.label}
              </NavigationMenuTrigger>
              <NavigationMenuContent className="min-w-64 p-2">
                <ul className="flex flex-col gap-1">
                  {item.children.map((child) => {
                    const active = isActivePath(pathname, child.href);
                    return (
                      <li key={child.key}>
                        <NavigationMenuLink
                          asChild
                          active={active}
                          className={cn(
                            "flex min-h-touch flex-row items-center rounded-lg px-3 py-0 text-sm font-medium text-navy hover:bg-accent focus:bg-accent data-[active=true]:bg-accent data-[active=true]:text-blue",
                          )}
                        >
                          <Link href={child.href} aria-current={active ? "page" : undefined}>
                            {child.label}
                          </Link>
                        </NavigationMenuLink>
                      </li>
                    );
                  })}
                </ul>
              </NavigationMenuContent>
            </NavigationMenuItem>
          ) : (
            <NavigationMenuItem key={item.key}>
              <NavigationMenuLink
                asChild
                active={isActivePath(pathname, item.href)}
                className={cn(itemBase, isActivePath(pathname, item.href) && activeMark)}
              >
                <Link
                  href={item.href}
                  aria-current={isActivePath(pathname, item.href) ? "page" : undefined}
                >
                  {item.label}
                </Link>
              </NavigationMenuLink>
            </NavigationMenuItem>
          ),
        )}
      </NavigationMenuList>
    </NavigationMenu>
  );
}
