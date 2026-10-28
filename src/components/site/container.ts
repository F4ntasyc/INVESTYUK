/** Lebar & margin halaman yang sama di semua section. */
export const container = "mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8";

/** SVG tidak perlu (dan tidak boleh) dioptimasi next/image; foto asli tetap dioptimasi. */
export const isSvg = (src: string) => src.toLowerCase().endsWith(".svg");
