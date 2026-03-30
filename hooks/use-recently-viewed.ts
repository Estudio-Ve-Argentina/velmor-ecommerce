"use client"

import { useEffect } from "react"

const KEY = "velmor_recently_viewed"
const MAX = 6

export function useRecentlyViewed(productId: number) {
  useEffect(() => {
    if (productId < 0) return
    try {
      const raw = localStorage.getItem(KEY)
      const ids: number[] = raw ? JSON.parse(raw) : []
      // Remove current if already there, then prepend
      const updated = [productId, ...ids.filter(id => id !== productId)].slice(0, MAX)
      localStorage.setItem(KEY, JSON.stringify(updated))
    } catch {
      // ignore
    }
  }, [productId])
}

export function getRecentlyViewedIds(excludeId?: number): number[] {
  try {
    const raw = localStorage.getItem(KEY)
    const ids: number[] = raw ? JSON.parse(raw) : []
    return excludeId ? ids.filter(id => id !== excludeId) : ids
  } catch {
    return []
  }
}
