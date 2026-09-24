/**
 * Reads Pepper DS custom properties straight out of the loaded stylesheets
 * (pepper-tokens.css), instead of hardcoding token lists in stories. Keeps
 * the Storybook pilot honest to whatever the canonical CSS files contain —
 * if a token is renamed or removed upstream, it disappears here too.
 */

function declaredTokenNames(prefix) {
  const names = new Set();
  for (const sheet of document.styleSheets) {
    let rules;
    try {
      rules = sheet.cssRules;
    } catch {
      continue; // cross-origin stylesheet, not one of ours
    }
    if (!rules) continue;
    for (const rule of rules) {
      if (rule.selectorText !== ':root' || !rule.style) continue;
      for (let i = 0; i < rule.style.length; i++) {
        const prop = rule.style.item(i);
        if (prop.startsWith(prefix)) names.add(prop);
      }
    }
  }
  return [...names].sort();
}

/** Resolved (fully substituted) value of a token, as the browser computes it. */
export function resolvedValue(name) {
  return getComputedStyle(document.documentElement).getPropertyValue(name).trim();
}

/**
 * Resolved value of a token under a given `[data-theme]` breakpoint override
 * (space.css defines Tablet/Mobile responsive overrides this way, unlike
 * Typography's separate per-breakpoint token names). Reads live from the
 * cascade via a detached element carrying the attribute, rather than
 * hardcoding the three breakpoints' values in story code.
 */
export function resolvedValueForBreakpoint(name, breakpoint) {
  const el = document.createElement('div');
  if (breakpoint && breakpoint !== 'desktop') el.setAttribute('data-theme', breakpoint);
  el.style.display = 'none';
  document.body.appendChild(el);
  const value = getComputedStyle(el).getPropertyValue(name).trim();
  document.body.removeChild(el);
  return value;
}

/** All declared token names under a prefix, with their resolved values. */
export function listTokens(prefix) {
  return declaredTokenNames(prefix).map((name) => ({
    name,
    value: resolvedValue(name),
  }));
}

/** Trailing step off a token name or key: a scale number, or `white`/`black`. */
export function stepOf(name) {
  const match = name.match(/-(\d+|white|black)(?:-opacity)?$/);
  return match ? match[1] : name;
}

// white sorts lighter than every numbered step, black sorts darker than all of them.
export function stepSortValue(step) {
  if (step === 'white') return -1;
  if (step === 'black') return Infinity;
  return Number(step);
}

/**
 * Groups primitive tokens (…-family-name-100, …-family-name-500) by family.
 * A few families also have a bare `-white` / `-black` entry outside the
 * numbered scale (e.g. neutral-black, midnight-white) — those belong to
 * their family too, not a family of their own.
 */
export function groupPrimitives(tokens, stripPrefix) {
  const groups = new Map();
  for (const token of tokens) {
    const family = token.name.replace(stripPrefix, '').replace(/-(\d+|white|black)(?:-opacity)?$/, '');
    if (!groups.has(family)) groups.set(family, []);
    groups.get(family).push(token);
  }
  return groups;
}

/**
 * Groups the per-colour opacity ramps (--pepper-core-opacity-color-<family>-
 * <anchor>-opacity-<pct>) into one ramp per family+anchor (e.g. "system-green-600"),
 * the closest opacity equivalent to a primitive colour family. DesignBridge's
 * export doubles the anchor's own group name in the middle of these names
 * (e.g. "...-green-green-600-..."), so adjacent duplicate segments are
 * collapsed before grouping.
 */
export function groupOpacityRamps(tokens, stripPrefix) {
  const groups = new Map();
  for (const token of tokens) {
    const match = token.name.match(/-opacity-(\d+)$/);
    if (!match) continue;
    const anchorPath = token.name.slice(stripPrefix.length, match.index);
    const segments = anchorPath.split('-').filter((seg, i, arr) => i === 0 || seg !== arr[i - 1]);
    const key = segments.join('-');
    if (!groups.has(key)) groups.set(key, []);
    groups.get(key).push({ ...token, pct: Number(match[1]) });
  }
  return groups;
}

/** Splits an opacity ramp's group key ("system-green-600") into its family and anchor step. */
export function splitFamilyAnchor(key) {
  const anchor = stepOf(key);
  const family = anchor === key ? key : key.slice(0, key.length - anchor.length - 1);
  return { family, anchor };
}
