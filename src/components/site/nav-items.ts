// Struktur menu utama (PRD 4.1). Label sudah diterjemahkan di server,
// lalu dikirim ke komponen client sebagai props.

export type NavLink = { key: string; href: string; label: string };
export type NavGroup = { key: string; label: string; children: NavLink[] };
export type NavItem = NavLink | NavGroup;

export const isGroup = (item: NavItem): item is NavGroup => "children" in item;

type Translate = (key: string) => string;

export function buildNav(t: Translate): NavItem[] {
  return [
    { key: "home", href: "/", label: t("home") },
    {
      key: "potensi",
      label: t("potensi"),
      children: [
        { key: "potensiProfil", href: "/potensi", label: t("potensiProfil") },
        { key: "sektor", href: "/sektor", label: t("sektor") },
        { key: "lokasi", href: "/peluang", label: t("lokasi") },
      ],
    },
    { key: "peluang", href: "/peluang", label: t("peluang") },
    {
      key: "panduan",
      label: t("panduan"),
      children: [
        { key: "prosedur", href: "/prosedur", label: t("prosedur") },
        { key: "edukasi", href: "/edukasi", label: t("edukasi") },
        { key: "faq", href: "/faq", label: t("faq") },
      ],
    },
    { key: "tentang", href: "/tentang", label: t("tentang") },
  ];
}

/** Aktif bila path sama, atau berada di bawahnya (kecuali Beranda). */
export function isActivePath(pathname: string, href: string): boolean {
  if (href === "/") return pathname === "/";
  return pathname === href || pathname.startsWith(`${href}/`);
}

/** Grup aktif hanya untuk halaman khas grup itu (Lokasi & Proyek berbagi /peluang). */
export function isActiveGroup(pathname: string, group: NavGroup): boolean {
  return group.children
    .filter((c) => c.key !== "lokasi")
    .some((c) => isActivePath(pathname, c.href));
}
