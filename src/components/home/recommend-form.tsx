"use client";

import { Lightbulb, Loader2, SlidersHorizontal } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import { useActionState } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { OpportunityCard } from "@/components/site/opportunity-card";
import { recommendAction, type RecommendState } from "@/lib/actions/recommend";

type Option = { value: string; label: string };

export function RecommendForm({
  sectors,
  districts,
}: {
  sectors: Option[];
  districts: Option[];
}) {
  const t = useTranslations("home.recommend");
  const locale = useLocale();
  const [state, formAction, pending] = useActionState<RecommendState, FormData>(
    recommendAction,
    { status: "idle" },
  );

  const field = (
    id: string,
    name: string,
    label: string,
    allLabel: string,
    options: Option[],
  ) => (
    <div className="flex min-w-0 flex-col gap-2">
      <Label htmlFor={id} className="text-sm font-semibold text-navy">
        {label}
      </Label>
      <Select name={name} defaultValue="all">
        <SelectTrigger id={id} className="w-full bg-white">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all" className="min-h-touch">
            {allLabel}
          </SelectItem>
          {options.map((o) => (
            <SelectItem key={o.value} value={o.value} className="min-h-touch">
              {o.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );

  return (
    <div className="flex flex-col gap-8">
      <form
        action={formAction}
        className="grid gap-4 rounded-card border border-border bg-white p-5 shadow-card sm:grid-cols-2 lg:grid-cols-[1fr_1fr_1fr_auto] lg:items-end lg:p-6"
      >
        <input type="hidden" name="locale" value={locale} />
        {field("rec-sector", "sector", t("sector"), t("sectorAll"), sectors)}
        {field("rec-district", "district", t("district"), t("districtAll"), districts)}
        {field("rec-budget", "budget", t("budget"), t("budgetAll"), [
          { value: "kecil", label: t("budgetSmall") },
          { value: "menengah", label: t("budgetMedium") },
          { value: "besar", label: t("budgetLarge") },
        ])}
        <Button type="submit" disabled={pending} className="sm:col-span-2 lg:col-span-1">
          {pending ? (
            <Loader2 aria-hidden className="animate-spin motion-reduce:animate-none" />
          ) : (
            <SlidersHorizontal aria-hidden />
          )}
          {pending ? t("pending") : t("submit")}
        </Button>
      </form>

      <div aria-live="polite" aria-busy={pending}>
        {state.status === "idle" ? (
          <p className="flex items-center gap-2 text-sm text-text-2">
            <Lightbulb aria-hidden className="size-4 shrink-0 text-blue" />
            {t("hint")}
          </p>
        ) : null}

        {state.status === "error" ? (
          <p role="alert" className="rounded-card bg-tint-pink px-5 py-4 text-sm font-medium text-icon-pink">
            {t("error")}
          </p>
        ) : null}

        {state.status === "empty" ? (
          <div className="rounded-card border border-dashed border-blue/40 bg-white px-6 py-8">
            <h3 className="text-lg font-bold">{t("emptyTitle")}</h3>
            <p className="mt-2 max-w-2xl text-text-2">{t("emptyBody")}</p>
          </div>
        ) : null}

        {state.status === "ok" ? (
          <>
            <h3 className="mb-4 text-lg font-bold">{t("results", { count: state.items.length })}</h3>
            <ul className="grid gap-5 md:grid-cols-3">
              {state.items.map(({ card, reason }) => (
                <li key={card.id} className="flex">
                  <OpportunityCard opportunity={card} reason={reason} className="w-full" />
                </li>
              ))}
            </ul>
          </>
        ) : null}
      </div>
    </div>
  );
}
