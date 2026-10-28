"use server";

import { hasLocale } from "next-intl";
import { getTranslations } from "next-intl/server";
import { routing } from "@/i18n/routing";
import {
  recommendOpportunities,
  type BudgetRange,
  type OpportunityCardData,
} from "@/lib/data/opportunities";
import { formatList } from "@/lib/format";

export type RecommendState =
  | { status: "idle" }
  | { status: "error" }
  | { status: "empty" }
  | {
      status: "ok";
      items: { card: OpportunityCardData; reason: string }[];
    };

const SLUG = /^[a-z0-9-]{1,80}$/;
const BUDGETS: BudgetRange[] = ["kecil", "menengah", "besar"];

function pickSlug(value: FormDataEntryValue | null): string | undefined {
  return typeof value === "string" && value !== "all" && SLUG.test(value)
    ? value
    : undefined;
}

export async function recommendAction(
  _prev: RecommendState,
  formData: FormData,
): Promise<RecommendState> {
  const rawLocale = formData.get("locale");
  const locale = hasLocale(routing.locales, rawLocale)
    ? rawLocale
    : routing.defaultLocale;
  const budgetRaw = formData.get("budget");
  const filters = {
    sector: pickSlug(formData.get("sector")),
    district: pickSlug(formData.get("district")),
    budget: BUDGETS.find((b) => b === budgetRaw),
  };

  try {
    const results = await recommendOpportunities(locale, filters);
    if (results.length === 0) return { status: "empty" };

    const t = await getTranslations({ locale, namespace: "home.recommend" });
    const criteria = [
      filters.sector && t("criteriaSector"),
      filters.district && t("criteriaDistrict"),
      filters.budget && t("criteriaBudget"),
    ].filter((c): c is string => Boolean(c));

    return {
      status: "ok",
      items: results.map(({ card, featured }) => ({
        card,
        reason:
          criteria.length > 0
            ? t("reasonMatch", { criteria: formatList(criteria, locale) })
            : featured
              ? t("reasonFeatured")
              : t("reasonOpen"),
      })),
    };
  } catch (error) {
    console.error("[recommend]", error);
    return { status: "error" };
  }
}
