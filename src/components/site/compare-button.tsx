"use client";

import { Check, Plus } from "lucide-react";
import { useTranslations } from "next-intl";
import { useRef, useState, useSyncExternalStore } from "react";
import { cn } from "cn";

// Daftar id peluang yang akan dibandingkan, disimpan di localStorage (maks 3).
// Halaman /bandingkan (nanti) membaca kunci yang sama.
const KEY = "investyuk:bandingkan";
const EVENT = "investyuk:bandingkan-berubah";
const MAX = 3;

function readRaw(): string {
  try {
    return window.localStorage.getItem(KEY) ?? "[]";
  } catch {
    return "[]";
  }
}

function parse(raw: string): number[] {
  try {
    const value: unknown = JSON.parse(raw);
    return Array.isArray(value)
      ? value.filter((v): v is number => Number.isInteger(v)).slice(0, MAX)
      : [];
  } catch {
    return [];
  }
}

function subscribe(onChange: () => void) {
  window.addEventListener("storage", onChange);
  window.addEventListener(EVENT, onChange);
  return () => {
    window.removeEventListener("storage", onChange);
    window.removeEventListener(EVENT, onChange);
  };
}

export function CompareButton({ id }: { id: number }) {
  const t = useTranslations("peluang.card");
  const raw = useSyncExternalStore(subscribe, readRaw, () => "[]");
  const ids = parse(raw);
  const selected = ids.includes(id);
  const [message, setMessage] = useState("");
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  function announce(text: string) {
    setMessage(text);
    if (timer.current) clearTimeout(timer.current);
    timer.current = setTimeout(() => setMessage(""), 4000);
  }

  function toggle() {
    const current = parse(readRaw());
    let next: number[];
    if (current.includes(id)) {
      next = current.filter((v) => v !== id);
    } else if (current.length >= MAX) {
      announce(t("compareFull"));
      return;
    } else {
      next = [...current, id];
    }
    try {
      window.localStorage.setItem(KEY, JSON.stringify(next));
      window.dispatchEvent(new Event(EVENT));
      announce(
        next.includes(id)
          ? t("compareAdded", { count: next.length })
          : t("compareRemoved"),
      );
    } catch {
      announce(t("compareError"));
    }
  }

  return (
    <div className="relative z-10 flex flex-col items-start gap-1">
      <button
        type="button"
        onClick={toggle}
        aria-pressed={selected}
        className={cn(
          "inline-flex min-h-touch items-center gap-1.5 rounded-full px-3 text-sm font-semibold transition-colors",
          selected
            ? "bg-tint-blue text-icon-blue hover:bg-tint-blue/70"
            : "text-blue hover:bg-accent",
        )}
      >
        {selected ? (
          <Check aria-hidden className="size-4" />
        ) : (
          <Plus aria-hidden className="size-4" />
        )}
        {selected ? t("compareOn") : t("compare")}
      </button>
      <p role="status" className="min-h-5 px-3 text-[0.8125rem] text-text-2">
        {message}
      </p>
    </div>
  );
}
