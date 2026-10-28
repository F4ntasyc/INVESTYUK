"use client";

import { useSyncExternalStore } from "react";
import { cn } from "cn";

function subscribe(onChange: () => void) {
  window.addEventListener("scroll", onChange, { passive: true });
  return () => window.removeEventListener("scroll", onChange);
}

/** Header sticky; garis bawah halus muncul setelah halaman digulir. */
export function HeaderShell({ children }: { children: React.ReactNode }) {
  const scrolled = useSyncExternalStore(
    subscribe,
    () => window.scrollY > 4,
    () => false,
  );

  return (
    <header
      className={cn(
        "sticky top-0 z-40 border-b bg-white transition-[border-color,box-shadow]",
        scrolled
          ? "border-border shadow-[0_1px_8px_rgb(11_37_69/0.06)]"
          : "border-transparent",
      )}
    >
      {children}
    </header>
  );
}
