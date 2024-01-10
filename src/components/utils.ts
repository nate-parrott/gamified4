import { withPrefix as wp } from 'gatsby-link'

export const withPrefix = wp;

export function uuid(): string {
  var uuid = "", i, random;
  for (i = 0; i < 32; i++) {
    random = Math.random() * 16 | 0;

    if (i == 8 || i == 12 || i == 16 || i == 20) {
      uuid += "-"
    }
    uuid += (i == 12 ? 4 : (i == 16 ? (random & 3 | 8) : random)).toString(16);
  }
  return uuid;
}

export function pick1<T>(list: T[]): T | null {
	if (list.length === 0) return null;
	return list[(Math.random() * list.length) | 0]
}

// Modifies input
export function shuffle<T>(a: T[]): T[] {
    var j, x, i;
    for (i = a.length - 1; i > 0; i--) {
        j = Math.floor(Math.random() * (i + 1));
        x = a[i];
        a[i] = a[j];
        a[j] = x;
    }
    return a;
}

export function clamp(val: number, min: number, max: number): number {
  return Math.min(Math.max(val, min), max);
}

export function remap(val: number, min1: number, max1: number, min2: number, max2: number): number {
  return min2 + (val - min1) * (max2 - min2) / (max1 - min1);
}

// Returns the count of the most repeated element in the array
export function mostRepeats<T>(of: T[]): number {
  if (of.length === 0) return 0;
  const counts = new Map<T, number>();
  for (const item of of) {
    const count = counts.get(item) || 0;
    counts.set(item, count + 1);
  }
  return Math.max(...counts.values());
}
