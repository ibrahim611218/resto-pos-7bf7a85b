// Sidebar preferences service: order & visibility with localStorage
export type SidebarPreferences = {
  order: string[]; // array of link paths in desired order
  hidden: string[]; // array of link paths to hide
};

const STORAGE_KEY = "sidebar-preferences";

export const getSidebarPreferences = (): SidebarPreferences => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return { order: [], hidden: [] };
    const parsed = JSON.parse(raw);
    return {
      order: Array.isArray(parsed.order) ? parsed.order : [],
      hidden: Array.isArray(parsed.hidden) ? parsed.hidden : [],
    };
  } catch {
    return { order: [], hidden: [] };
  }
};

export const saveSidebarPreferences = (prefs: SidebarPreferences) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(prefs));
};

export const resetSidebarPreferences = () => {
  localStorage.removeItem(STORAGE_KEY);
};

// Generic apply function works with any link type having a `path` field
export const applySidebarPreferences = <T extends { path: string }>(links: T[]): T[] => {
  const prefs = getSidebarPreferences();
  const visible = links.filter((l) => !prefs.hidden.includes(l.path));

  if (!prefs.order.length) return visible; // no custom order

  const indexMap = new Map(prefs.order.map((p, i) => [p, i] as const));

  // Sort by custom order first; items not in order keep relative order after the ordered ones
  const ordered = [...visible].sort((a, b) => {
    const ia = indexMap.has(a.path) ? (indexMap.get(a.path) as number) : Number.POSITIVE_INFINITY;
    const ib = indexMap.has(b.path) ? (indexMap.get(b.path) as number) : Number.POSITIVE_INFINITY;
    if (ia === ib) return 0;
    return ia - ib;
  });

  return ordered;
};
