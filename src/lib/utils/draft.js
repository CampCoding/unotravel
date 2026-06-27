const KEYS = {
  umrah: "uno_draft_umrah",
  offer: "uno_draft_offer",
  tour:  "uno_draft_tour",
};

const DISMISSED_KEY = "uno_draft_dismissed";

export function saveDraft(type, payload) {
  if (typeof window === "undefined") return;
  const key = KEYS[type];
  if (!key) return;
  localStorage.setItem(key, JSON.stringify({ ...payload, type, savedAt: Date.now() }));
}

export function getDraft(type) {
  if (typeof window === "undefined") return null;
  const key = KEYS[type];
  if (!key) return null;
  try {
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

export function deleteDraft(type) {
  if (typeof window === "undefined") return;
  const key = KEYS[type];
  if (key) localStorage.removeItem(key);
}

export function getLatestDraft() {
  const all = Object.keys(KEYS)
    .map((type) => getDraft(type))
    .filter(Boolean)
    .sort((a, b) => (b.savedAt ?? 0) - (a.savedAt ?? 0));
  return all[0] ?? null;
}

export function isDismissedThisSession() {
  if (typeof window === "undefined") return true;
  return sessionStorage.getItem(DISMISSED_KEY) === "1";
}

export function dismissForSession() {
  if (typeof window === "undefined") return;
  sessionStorage.setItem(DISMISSED_KEY, "1");
}
