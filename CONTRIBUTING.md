# Contributing to Diaspora Visa Data

Thank you for your interest in contributing! Every update helps thousands of diaspora travelers make informed decisions.

---

## 📋 Table of Contents

- [Getting Started](#getting-started)
- [Types of Contributions](#types-of-contributions)
- [How to Submit](#how-to-submit)
- [Data Requirements](#data-requirements)
- [Source Verification](#source-verification)
- [Bounty Rewards](#bounty-rewards)
- [Code of Conduct](#code-of-conduct)

---

## 🚀 Getting Started

### Prerequisites

- GitHub account
- Basic understanding of JSON format
- Access to official visa/immigration websites

### Quick Start

1. **Fork** this repository
2. **Clone** your fork locally
3. **Create a branch** for your changes
4. **Make changes** to the relevant JSON files
5. **Submit a Pull Request**

---

## 📊 Types of Contributions

### 1. Update Existing Route (`verified_update`) — £15

Update visa requirements for an existing route when policies change.

**Example:** Ghana → UK visa processing time changed from 3 weeks to 15 business days.

### 2. Add New Origin Country (`new_origin_country`) — £80

Add a completely new origin country with minimum 50 destination routes.

**Requirements:**
- Minimum 50 routes
- At least 10 must have official source verification
- Include popular destinations (UK, US, Canada, Germany, France)

### 3. Critical Policy Change (`critical_change`) — £30

Report and document a significant policy change that affects many travelers.

**Examples:**
- Kenya introducing eTA system
- Country removing visa-free access
- New transit visa requirements

### 4. Document Privileges (`document_privilege`) — £20

Add rules for how holding a visa from one country unlocks access to others.

**Example:** Valid UK visa allows visa-free entry to Albania, Kosovo, North Macedonia.

### 5. Bug Fix (`bug_fix`) — £10

Correct incorrect or outdated information in existing data.

### 6. Verification (`verification`) — £5

Verify that existing data is still accurate by checking against current official sources.

---

## 📝 How to Submit

### Step 1: Find What to Update

Check `bounties/open.json` for needed updates, or find outdated data yourself.

### Step 2: Research the Change

Find the **official source** — government website, embassy page, or immigration authority.

**Accepted Sources:**
- Government visa portals (gov.uk, travel.state.gov, etc.)
- Embassy/consulate websites
- Official immigration authority sites
- IATA Timatic (for airlines)

**NOT Accepted:**
- Blog posts
- Travel forums
- Wikipedia
- News articles (unless citing official source)

### Step 3: Make Your Changes

Edit the relevant JSON file following our [schema](SCHEMA.md).

**File locations:**
- Passport requirements: `data/passport-requirements/{COUNTRY_CODE}.json`
- Document privileges: `data/document-privileges/{COUNTRY}-{type}.json`

### Step 4: Add Source Information

Every change must include:

```json
{
  "source": {
    "url": "https://official-government-site.gov/visa-info",
    "accessedDate": "2026-03-04",
    "archived": "https://web.archive.org/web/...",  // Optional but recommended
    "notes": "Section 3.2 - Visa Requirements for African Nationals"
  }
}
```

### Step 5: Submit Pull Request

1. **Title Format:** `[TYPE] Route/Country: Brief description`
   - `[UPDATE] GH→GB: Changed processing time to 15 business days`
   - `[NEW] NG: Added Nigeria passport requirements (67 routes)`
   - `[PRIVILEGE] US-visa: Added Mexico visa-free access`

2. **PR Description Template:**

```markdown
## Type of Change
- [ ] verified_update (£15)
- [ ] new_origin_country (£80)
- [ ] critical_change (£30)
- [ ] document_privilege (£20)
- [ ] bug_fix (£10)
- [ ] verification (£5)

## Changes Made
Brief description of what changed.

## Official Source
- URL: [link to official source]
- Accessed: YYYY-MM-DD
- Relevant section: (quote or describe)

## Contributor ID
Your registered contributor ID (for bounty payment).
If not registered, leave blank and register at: diasporaai.dev/contributors/register
```

---

## 📋 Data Requirements

### Required Fields

Every route entry must have:

| Field | Required | Description |
|-------|----------|-------------|
| `from` | ✅ | ISO 3166-1 alpha-2 origin country code |
| `to` | ✅ | ISO 3166-1 alpha-2 destination country code |
| `visa.required` | ✅ | Boolean - is visa required? |
| `visa.policy` | ✅ | One of: `visa_required`, `visa_free`, `evisa`, `voa`, `eta` |
| `source.url` | ✅ | Official source URL |
| `source.accessedDate` | ✅ | Date you accessed the source |

### Optional Fields

| Field | Description |
|-------|-------------|
| `visa.type` | Specific visa type name |
| `visa.maxStayDays` | Maximum allowed stay |
| `visa.processingDays` | Typical processing time |
| `visa.cost` | Visa cost with currency |
| `documents.*` | Document requirements |
| `transit.*` | Transit visa requirements |
| `notes` | Additional information |

See [SCHEMA.md](SCHEMA.md) for complete schema documentation.

---

## ✅ Source Verification

### Accepted Government Domains

We maintain a list of verified government domains in `sources/verified-domains.json`.

**Automatically Accepted:**
- `.gov` (US)
- `.gov.uk` (UK)
- `.gc.ca` (Canada)
- `.europa.eu` (EU)
- `.gouv.fr` (France)
- Other official government TLDs

**Manual Review Required:**
- Embassy websites
- Regional immigration sites
- Any domain not in verified list

### Verification Process

1. **Automated Check:** GitHub Actions verify domain is in trusted list
2. **Content Check:** Reviewers verify the data matches the source
3. **Archive Check:** If source might change, archive.org snapshot preferred

---

## 💰 Bounty Rewards

### Pricing

| Type | Reward |
|------|--------|
| `verified_update` | £15 |
| `new_origin_country` | £80 |
| `critical_change` | £30 |
| `document_privilege` | £20 |
| `bug_fix` | £10 |
| `verification` | £5 |

### How to Get Paid

1. **Register Once:** Create account at `diasporaai.dev/contributors/register`
2. **Add Payment Method:** Connect Stripe (bank/card) or Paystack (mobile money)
3. **Include Contributor ID:** Add your ID in PR description
4. **Get Paid:** Payment processed after PR is merged and verified

### Payment Methods

- **Stripe:** Bank transfer, debit/credit card (worldwide)
- **Paystack:** Mobile money (M-Pesa, MTN, Airtel), Nigerian bank accounts

### Timeline

- **Trusted Contributors:** Paid within 24-48 hours of merge
- **New Contributors:** Manual review, paid within 1 week

---

## 🔍 Review Process

### For New Contributors (First 3 PRs)

1. Submit PR with all required information
2. Maintainer reviews source and data accuracy
3. May request changes or clarification
4. Once approved, PR is merged
5. Payment processed after manual review

### For Trusted Contributors (3+ Merged PRs)

1. Submit PR
2. Automated verification runs
3. If all checks pass, auto-merged
4. Payment processed automatically

### For Maintainers (20+ PRs + Invitation)

1. Submit PR
2. Can self-merge after automated checks
3. Immediate payment

---

## 🎯 Tips for Successful Contributions

### DO ✅

- Use official government sources only
- Include page screenshots if content might change
- Link to archived versions (web.archive.org)
- Be specific about what changed
- Follow the JSON schema exactly
- Test your JSON is valid before submitting

### DON'T ❌

- Use blog posts or forums as sources
- Submit without a source URL
- Change multiple unrelated routes in one PR
- Include sensitive personal information
- Copy data from other websites without verification

---

## 🤝 Code of Conduct

### Be Accurate

Visa information affects real people's travel plans. Double-check everything.

### Be Helpful

If you see incorrect data, submit a fix. If you find a better source, share it.

### Be Respectful

This is a collaborative project. Treat other contributors with respect.

### Be Responsible

Don't submit unverified data. Don't game the bounty system.

---

## ❓ Questions?

- **GitHub Issues:** For bugs or feature requests
- **Discussions:** For questions about contributing
- **Email:** contributors@diasporaai.dev

---

*Thank you for helping diaspora travelers navigate the visa maze! 🌍✈️*
