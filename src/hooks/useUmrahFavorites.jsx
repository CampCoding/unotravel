"use client";
import { useCallback, useEffect, useState } from "react";

const KEY = "umrah_favorites";

const read = () => {
  try { return JSON.parse(localStorage.getItem(KEY) ?? "[]"); } catch { return []; }
};
const write = (list) => {
  try { localStorage.setItem(KEY, JSON.stringify(list)); } catch {}
};

export function useUmrahFavorites() {
  const [favorites, setFavorites] = useState([]);

  useEffect(() => { setFavorites(read()); }, []);

  const isFavorite = useCallback((id) => favorites.some(f => f.id === id), [favorites]);

  const toggle = useCallback((pkg) => {
    setFavorites(prev => {
      const exists = prev.some(f => f.id === pkg.id);
      const next = exists ? prev.filter(f => f.id !== pkg.id) : [...prev, pkg];
      write(next);
      return next;
    });
  }, []);

  const remove = useCallback((id) => {
    setFavorites(prev => {
      const next = prev.filter(f => f.id !== id);
      write(next);
      return next;
    });
  }, []);

  return { favorites, isFavorite, toggle, remove };
}
