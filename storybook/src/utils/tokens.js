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

/** All declared token names under a prefix, with their resolved values. */
export function listTokens(prefix) {
  return declaredTokenNames(prefix).map((name) => ({
    name,
    value: resolvedValue(name),
  }));
}

/** Groups primitive tokens (…-family-name-100, …-family-name-500) by family. */
export function groupPrimitives(tokens, stripPrefix) {
  const groups = new Map();
  for (const token of tokens) {
    const family = token.name
      .replace(stripPrefix, '')
      .replace(/-\d+$/, '')
      .replace(/-opacity$/, '');
    if (!groups.has(family)) groups.set(family, []);
    groups.get(family).push(token);
  }
  return groups;
}
