// Fails when a route (passport requirements) or entry (document privileges)
// that this PR adds or changes is missing a required field or its source.
// Only changed items are checked: most legacy routes have no source record, so
// checking whole files would fail every PR that touches a country file.
// Usage: node check-required-fields.js <base-sha> [head-ref]
const { execFileSync } = require('child_process');

const base = process.argv[2];
const head = process.argv[3] || 'HEAD';
if (!base) { console.error('usage: check-required-fields.js <base-sha> [head-ref]'); process.exit(2); }

const git = (...args) => execFileSync('git', args, { encoding: 'utf8', maxBuffer: 256 * 1024 * 1024, stdio: ['ignore', 'pipe', 'ignore'] });
const load = (ref, file) => { try { return JSON.parse(git('show', `${ref}:${file}`)); } catch (e) { return null; } };
const get = (o, path) => path.split('.').reduce((v, k) => (v == null ? undefined : v[k]), o);
const missing = (item, paths) => paths.filter(p => get(item, p) == null);

const files = git('diff', '--name-only', base, head).split('\n');
let errors = 0;

function check(file, listKey, keyOf, required, label) {
  const next = load(head, file);
  if (!next) { console.log(`::error file=${file}::Invalid or missing JSON`); errors++; return; }
  const prev = load(base, file);
  const before = new Map(((prev && prev[listKey]) || []).map(i => [keyOf(i), JSON.stringify(i)]));
  for (const item of next[listKey] || []) {
    if (before.get(keyOf(item)) === JSON.stringify(item)) continue; // unchanged
    const gaps = missing(item, required);
    if (gaps.length) {
      console.log(`::error file=${file}::${label} ${keyOf(item) || 'unknown'} is missing: ${gaps.join(', ')}`);
      errors++;
    }
  }
}

for (const file of files) {
  if (/^data\/passport-requirements\/[^/]+\.json$/.test(file)) {
    check(file, 'routes', r => r.to && r.to.code, ['to.code', 'visa.required', 'visa.policy', 'source.url', 'source.accessedDate'], 'Route to');
  } else if (/^data\/document-privileges\/[^/]+\.json$/.test(file)) {
    check(file, 'unlocks', u => u.country, ['country', 'conditions', 'source.url'], 'Entry');
  }
}
if (errors) { console.log(`Found ${errors} changed item(s) with missing required fields`); process.exit(1); }
console.log('Every changed route or entry has its required fields and a source');
