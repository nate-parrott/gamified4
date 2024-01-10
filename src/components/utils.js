import { withPrefix as wp } from 'gatsby-link'

export const withPrefix = wp;

export function uuid() {
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

export function pick1(list) {
	if (list.length === 0) return null;
	return list[(Math.random() * list.length) | 0]
}

export function shuffle(a) {
    var j, x, i;
    for (i = a.length - 1; i > 0; i--) {
        j = Math.floor(Math.random() * (i + 1));
        x = a[i];
        a[i] = a[j];
        a[j] = x;
    }
    return a;
}

export function clamp(val, min, max) {
  return Math.min(Math.max(val, min), max);
}

export function remap(val, min1, max1, min2, max2) {
  const t = clamp((val - min1) / (max1 - min1), 0, 1);
  return min2 + t * (max2 - min2);
}

// export function withPrefix(name) {
//   return 'static' + name
// }
