import { getLocale, getTranslations } from "next-intl/server";
import { container } from "@/components/site/container";
import type { Locale } from "@/i18n/routing";
import { getRecommendOptions } from "@/lib/data/opportunities";
import { RecommendForm } from "./recommend-form";

// Tidak ada di mockup; dirancang dengan bahasa visual yang sama (kartu putih di
// latar section biru muda, kontrol pil, kartu peluang yang sama).
export async function RecommendSection() {
  const t = await getTranslations("home.recommend");
  const locale = (await getLocale()) as Locale;
  const options = await getRecommendOptions(locale);

  return (
    <section aria-labelledby="recommend-title" className="mt-16 bg-section py-16 lg:mt-20 lg:py-20">
      <div className={container}>
        <h2 id="recommend-title" className="text-2xl font-extrabold tracking-tight sm:text-3xl">
          {t("title")}
        </h2>
        <p className="mt-2 max-w-2xl text-base text-text-2">{t("subtitle")}</p>
        <div className="mt-8">
          <RecommendForm sectors={options.sectors} districts={options.districts} />
        </div>
      </div>
    </section>
  );
}
