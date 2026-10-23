// Fails when a route that this PR adds or changes uses a visa.policy value that
// is not in SCHEMA.md. Only changed routes are checked, so legacy values in
// untouched routes (for example visa_on_arrival) do not fail every PR.
// Usage: node check-visa-policy.js <base-sha> [head-ref]
const { execFileSync } = require('child_process');

const ALLOWED = ['visa_required', 'visa_free', 'evisa', 'voa', 'eta', 'transit_visa', 'no_admission', 'unknown'];
const HINTS = { visa_on_arrival: "use 'voa' (the API and database use 'voa')" };

const base = process.argv[2];
const head = process.argv[3] || 'HEAD';
if (!base) { console.error('usage: check-visa-policy.js <base-sha> [head-ref]'); process.exit(2); }

const git = (...args) => execFileSync('git', args, { encoding: 'utf8', maxBuffer: 256 * 1024 * 1024, stdio: ['ignore', 'pipe', 'ignore'] });
const load = (ref, file) => {
  try { return JSON.parse(git('show', `${ref}:${file}`)); } catch (e) { return null; }
};

const files = git('diff', '--name-only', base, head)
  .split('\n')
  .filter(f => /^data\/passport-requirements\/[^/]+\.json$/.test(f));

let errors = 0;
for (const file of files) {
  const next = load(head, file);
  if (!next) { console.log(`::error file=${file}::Invalid or missing JSON`); errors++; continue; }
  const prev = load(base, file);
  const prevRoutes = new Map(((prev && prev.routes) || []).map(r => [r.to && r.to.code, JSON.stringify(r)]));
  for (const route of next.routes || []) {
    const code = route.to && route.to.code;
    if (prevRoutes.get(code) === JSON.stringify(route)) continue; // unchanged route
    const policy = route.visa && route.visa.policy;
    if (!ALLOWED.includes(policy)) {
      const hint = HINTS[policy] ? ` (${HINTS[policy]})` : '';
      console.log(`::error file=${file}::Route to ${code} has visa.policy "${policy}", which is not in SCHEMA.md${hint}. Allowed: ${ALLOWED.join(', ')}`);
      errors++;
    }
  }
}
if (errors) { console.log(`Found ${errors} route(s) with a policy value that is not in the schema`); process.exit(1); }
console.log(`Checked ${files.length} file(s): every changed route uses an allowed visa.policy`);
