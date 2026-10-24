# Contributing to Diaspora Visa Data

Thank you for your interest in contributing! Every update helps thousands of diaspora travelers make informed decisions.

> **Last updated: 13 October 2026** — bounty rates revised and the payment schedule moved to a monthly cycle (see [Bounty Rewards](#bounty-rewards) and [AI Contributions & Review Policy](#ai-contributions--review-policy)). PRs opened before this date are honored at the rates published when they were opened.

---

## 📋 Table of Contents

- [Getting Started](#getting-started)
- [Types of Contributions](#types-of-contributions)
- [How to Submit](#how-to-submit)
- [Data Requirements](#data-requirements)
- [Source Verification](#source-verification)
- [Bounty Rewards](#bounty-rewards)
- [AI Contributions & Review Policy](#ai-contributions--review-policy)
- [Contributor FAQ](#contributor-faq)
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

### 1. Update Existing Route (`verified_update`) — £2

Update visa requirements for an existing route when policies change.

**Example:** Ghana → UK visa processing time changed from 3 weeks to 15 business days.

### 2. Add New Origin Country (`new_origin_country`) — £10

Add a completely new origin country with minimum 50 destination routes.

**Requirements:**
- Minimum 50 routes
- At least 10 must have official source verification
- Include popular destinations (UK, US, Canada, Germany, France)

### 3. Critical Policy Change (`critical_change`) — £5

Report and document a significant policy change that affects many travelers.

**Examples:**
- Kenya introducing eTA system
- Country removing visa-free access
- New transit visa requirements

### 4. Document Privileges (`document_privilege`) — £3

Add rules for how holding a visa from one country unlocks access to others.

**Example:** Valid UK visa allows visa-free entry to Albania, Kosovo, North Macedonia.

This is the "I have a UK visa, where else can I travel visa-free?" feature.

### 5. Bug Fix (`bug_fix`) — £2

Correct incorrect or outdated information in existing data.

### 6. Verification (`verification`) — £1

Verify that existing data is still accurate by checking against current official sources.

---

## � Contributing Document Privileges (Detailed Guide)

This is one of our most valuable contributions! Document privileges answer the question:

> "I'm Ghanaian but I have a UK visa — where else can I now travel visa-free?"

### What Are Document Privileges?

When you hold a valid visa or residence permit from certain countries (UK, US, Schengen), many other countries will let you enter visa-free or with simplified procedures.

**Current Document Privileges We Track:**
- 🇬🇧 **UK visa/BRP** → Unlocks 31+ countries
- 🇺🇸 **US visa** → Unlocks 13+ countries  
- 🇪🇺 **Schengen visa** → Unlocks 15+ countries (coming soon)
- 🇨🇦 **Canada visa** → Unlocks 8+ countries (coming soon)

### File Location

```
data/document-privileges/{COUNTRY}-visa.json
```

Example: `data/document-privileges/UK-visa.json`

### Schema for Document Privileges

```json
{
  "document": {
    "type": "visa",
    "country": "GB",
    "countryName": "United Kingdom",
    "categories": ["visitor", "work", "student", "dependent"],
    "description": "Valid UK visa allows visa-free or simplified access to additional countries"
  },
  "lastUpdated": "2026-03-10",
  "totalUnlocked": 31,
  "unlocks": [
    {
      "country": "AL",
      "countryName": "Albania",
      "region": "europe",
      "conditions": "Valid multi-entry UK, US, or Schengen visa",
      "maxStayDays": 90,
      "visaOnArrival": false,
      "evisaRequired": false,
      "source": {
        "url": "https://punetejashtme.gov.al/en/",
        "accessedDate": "2026-03-10",
        "confidence": "verified"
      },
      "notes": "Applies to nationals who normally require a visa for Albania"
    }
  ]
}
```

### Required Fields for Each Unlock Entry

| Field | Required | Description |
|-------|----------|-------------|
| `country` | ✅ | ISO 3166-1 alpha-2 code of destination |
| `countryName` | ✅ | Full name of destination |
| `region` | ✅ | One of: `europe`, `asia`, `caribbean`, `north_america`, `central_america`, `south_america`, `middle_east`, `africa`, `oceania` |
| `conditions` | ✅ | What conditions must be met (e.g., "multi-entry visa", "previously used") |
| `maxStayDays` | ✅ | Maximum stay allowed |
| `visaOnArrival` | ✅ | Boolean - is it VOA or visa-free? |
| `source.url` | ✅ | **Official government source URL** |
| `source.accessedDate` | ✅ | Date you verified the source |
| `source.confidence` | ✅ | `verified` (government source), `unverified` (secondary source) |

### Where to Find Document Privilege Information

| Country | Where to Look |
|---------|---------------|
| 🇦🇱 Albania | [punetejashtme.gov.al](https://punetejashtme.gov.al/en/) |
| 🇷🇸 Serbia | [mfa.gov.rs](http://www.mfa.gov.rs/en/) |
| 🇬🇪 Georgia | [geoconsul.gov.ge](https://geoconsul.gov.ge/) |
| 🇲🇽 Mexico | [inm.gob.mx](https://www.inm.gob.mx/) |
| 🇹🇷 Turkey | [evisa.gov.tr](https://www.evisa.gov.tr/en/) |
| 🇵🇦 Panama | [migracion.gob.pa](https://www.migracion.gob.pa/) |
| 🇲🇪 Montenegro | [mvp.gov.me](http://www.mvp.gov.me/en/ministry) |
| 🇧🇦 Bosnia | [mvp.gov.ba](http://www.mvp.gov.ba/) |
| 🇲🇰 N. Macedonia | [mfa.gov.mk](https://www.mfa.gov.mk/en/) |

### Common Anchor Visa Countries (What We Need Data For)

We're looking for privileges granted by these "anchor" visas:

1. **UK visa/BRP** - Many Balkans, Caribbean, Americas
2. **US visa** - Mexico, Latin America, some Asia
3. **Schengen visa** - Balkans, some Middle East
4. **Canada visa** - Some Latin America
5. **Australia visa** - Limited
6. **Japan visa** - Some Southeast Asia

### How to Find New Privileges

1. **Search immigration forums** - Find reports then verify with government source
2. **Check destination country immigration sites** - Look for "visa exemption" sections
3. **Look for "anchor visa" policies** - Search "[country] accepts UK visa holders"
4. **Use IATA Timatic** - If you have access

### PR Title Format for Document Privileges

```
[PRIVILEGE] {document}-{destination}: Brief description
```

Examples:
- `[PRIVILEGE] UK-visa→Albania: 90-day visa-free for UK visa holders`
- `[PRIVILEGE] US-visa→Serbia: Added 90/180 rule clarification`
- `[PRIVILEGE] Schengen→Turkey: e-Visa eligibility with Schengen`

### Example PR Description

```markdown
## Document Privilege Addition

**Document:** UK visa
**Destination:** Albania
**Access Type:** Visa-free
**Max Stay:** 90 days

## Official Source
- URL: https://punetejashtme.gov.al/en/
- Accessed: 2026-03-10
- Relevant section: "Visa exemption for holders of valid multi-entry UK, US, or Schengen visa"

## Conditions
- Visa must be multi-entry
- Visa must be valid at time of entry
- Applies to nationals who normally require Albanian visa
```

### Bounty: £3 per Valid Addition

Each new document privilege entry (with verified government source) earns £3.

If you add **5+ countries** in one PR for the same anchor document, you get a **+20% bonus** on the PR total.

---

## �📝 How to Submit

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

**Dates:** set `lastUpdated` only on the route or entry you changed. Leave the file's top-level `lastUpdated` alone: every PR to the same country file edits that line, so changing it makes PRs conflict with each other. The maintainer updates it when merging.

### Step 4: Add Source Information (⚠️ MANDATORY)

**Every change MUST include the official government source URL.** PRs without valid government sources will be rejected.

```json
{
  "source": {
    "url": "https://official-government-site.gov/visa-info",
    "governmentDomain": true,
    "accessedDate": "2026-03-04",
    "archived": "https://web.archive.org/web/...",
    "pageSection": "Section on visa requirements for African nationals",
    "verificationSteps": "Navigate to Visa Types > Tourist Visa > Eligible Countries"
  }
}
```

### Where to Find Official Sources

| Destination | Official Government URL |
|-------------|------------------------|
| 🇬🇧 UK | `gov.uk/check-uk-visa` |
| 🇺🇸 USA | `travel.state.gov/content/travel/en/us-visas.html` |
| 🇨🇦 Canada | `canada.ca/en/immigration-refugees-citizenship.html` |
| 🇩🇪 Germany | `auswaertiges-amt.de/en/visa-service` |
| 🇫🇷 France | `france-visas.gouv.fr` |
| 🇦🇺 Australia | `homeaffairs.gov.au/trav/visa-1` |
| 🇦🇪 UAE | `u.ae/en/information-and-services/visa-and-emirates-id` |
| 🇿🇦 South Africa | `dha.gov.za/index.php/immigration-services` |
```

### Step 5: Submit Pull Request

1. **Title Format:** `[TYPE] Route/Country: Brief description`
   - `[UPDATE] GH→GB: Changed processing time to 15 business days`
   - `[NEW] NG: Added Nigeria passport requirements (67 routes)`
   - `[PRIVILEGE] US-visa: Added Mexico visa-free access`

2. **PR Description Template:**
   (Fill out the template provided in the PR form)

---

## ✅ What Happens After You Submit

### 1. Automated Verification

When you submit a PR, our GitHub Actions will automatically:
- Extract all source URLs from your changes
- Verify each URL is from an official government domain
- Check that the URLs are accessible
- Post a verification report as a PR comment

### 2. PR Approval & Merge

If verification passes:
- Your PR receives the `verified` label
- A maintainer reviews and merges your PR
- You'll see a success comment with payment instructions

### 3. Automatic Data Sync

Once merged, the data is **automatically synced to production**:
```
PR Merged → GitHub Action → Supabase Database → Flight API
```
Your contribution is immediately live in the Diaspora AI visa API!

### 4. Getting Paid

After your PR is merged and verified:

1. **Send an email to:** `contributors@diasporaai.dev`
2. **Subject:** `Bounty Payment - PR #[YOUR_PR_NUMBER]`
3. **Include:**
   - Your GitHub username
   - PR number
   - Fork repository name
   - Payment preference: PayPal, Wise, or bank transfer
   - Payment details (email or bank info)

**Bounty payments are processed once a month, on the 11th.** Payments for PRs merged and claimed by the end of a month go out on the 11th of the following month, after cross-checking against the merged-PR list. Only PRs that were merged — not just opened — qualify.

## 🤖 AI Contributions & Review Policy

AI-assisted contributions are welcome, but they follow **their own rules, stricter than the rules for human contributors**:

1. **Disclosure is mandatory.** Every PR must state in its description whether it was AI-assisted. Undisclosed AI use discovered later means the PR is closed or reverted, unpaid, and the account is permanently banned.
2. **Minimum payout threshold: 5 merged contributions.** AI-assisted contributors are not paid for their first merged item. Payment eligibility begins once an account has **5 or more merged contributions**; the first payout then covers all merged items to date. Human contributors doing documented manual verification have no threshold.
3. **Monthly cap:** AI-assisted work is paid up to **10 items / £20 per contributor per month**. Anything above that is welcome but unpaid.
4. **Account age gate:** payouts only go to GitHub accounts that are **30+ days old with real activity history**. Younger accounts may contribute; their payouts are held until the account matures.
5. **Two open bounty PRs maximum per account** until one is merged. Additional PRs are closed unreviewed.
6. **High-value types (`new_origin_country`, `critical_change`) require maintainer pre-assignment** via an issue before opening the PR. Unassigned PRs in these categories are closed unpaid.
7. **One payout identity per contributor.** Multiple accounts paying to the same PayPal/Wise/bank destination are treated as one contributor and share one cap and one threshold.

Rules that apply to everyone, human or AI:

- **Every submission is reviewed by a human maintainer.** The maintainer verifies your cited source before merging; unverifiable or fabricated sources get the PR closed, unpaid, and repeat offenders banned.
- **Payment eligibility is at the maintainer's sole discretion.** Low-effort, duplicated, or bulk-generated submissions that add no verified value will be closed without payment.
- **Duplicate claims: the first PR to be merged wins the bounty.** Claiming a bounty in an issue does not reserve it.
- One bounty, one payment, regardless of how many accounts submit it.

---

## ❓ Contributor FAQ

**Are AI-assisted contributions accepted?** Yes, if every PR discloses it in the description. A maintainer reviews every PR and checks the cited source before merging. The account owner is responsible for the submission. Fabricated or unverifiable sources get the PR closed unpaid. See the [AI Contributions & Review Policy](#ai-contributions--review-policy).

**What does "5 merged contributions" mean?** Five merged PRs, not five entries inside one PR. Your first AI-assisted payout then covers all your merged items to date, within the monthly cap (10 items / £20).

**How much does a contribution pay?** See [Bounty Rewards](#bounty-rewards). Document privileges pay per valid entry (+20% on 5 or more in one PR). One bounty is paid once. PRs opened before 13 October are honored at the rates published when they were opened.

**Can I reserve a bounty or a destination?** No. The first PR to be merged wins, and opening an issue does not reserve anything. `critical_change` and `new_origin_country` also need a maintainer to assign them to you in an issue before you open a PR.

**How do I claim my payment?** After your PR is merged, email **contributors@diasporaai.dev** with the subject `Bounty Payment - PR #<number>`, and include your GitHub username, the PR number, your fork, the contribution type, your payment method and your payment details. Send payment details by email only, never in a comment or issue. No registration is needed, and please do not send identity or tax documents.

**When and how am I paid?** Monthly, on the 11th, for PRs merged and claimed by the end of the previous month. Methods are PayPal, Wise or bank transfer. Whether a method works for your country or bank, and any fees, depend on the payment provider and are confirmed when a payment is made. We have not set a minimum payout.

**How many PRs can I have open?** Two bounty PRs at a time, until one is merged. Extra PRs are closed unreviewed.

**What should I work on?** Check `bounties/open.json` and the open PRs first, to avoid duplicates. Keep PRs small (a few entries, or about 10 routes), cite the official government page with the exact quote and navigation path for every change, and don't edit the file-level `lastUpdated` (see [How to Submit](#how-to-submit)).

**What gets a PR closed?** Missing or fabricated sources, undisclosed AI use, duplicates of an already merged change, documentation-only "fix: resolve #N" PRs that change no data, and more than two open bounty PRs.

---

## 📝 PR Description Template

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
| `source.url` | ✅ | **Official GOVERNMENT source URL** (embassy, immigration ministry, etc.) |
| `source.accessedDate` | ✅ | Date you accessed the source |
| `source.governmentDomain` | ✅ | Must be `true` - confirms URL is from official government site |

### ⚠️ Source URL Must Be Government Domain

We only accept URLs from official government domains:
- `.gov`, `.gov.uk`, `.gov.au`, `.gc.ca` (government portals)
- `.gouv.fr`, `.gob.mx`, `.gov.za` (country-specific government domains)
- Embassy websites (`embassy.gov.xx`)
- Official immigration authority sites

**NOT ACCEPTED:** Travel blogs, forums, Wikipedia, news articles, visa agency websites

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

### How Verification Works

When you submit a PR, our automated system will:

1. **Extract source URLs** from your JSON changes
2. **Verify government domains** - checks if URL is from official .gov, .gov.uk, embassy, or immigration authority
3. **Test URL accessibility** - ensures the source is reachable
4. **Post verification result** - adds a comment to your PR with pass/fail status

### Accepted Government Domains

We maintain a list of verified government domains in `sources/verified-domains.json`.

**Automatically Accepted:**
- `.gov` (US)
- `.gov.uk` (UK)
- `.gc.ca` (Canada)
- `.europa.eu` (EU)
- `.gouv.fr` (France)
- `.gob.mx` (Mexico)
- `.gov.au` (Australia)
- `.gov.za` (South Africa)
- Embassy and consulate websites
- Immigration authority sites (migration.*, immigration.*, homeaffairs.*)

**Manual Review Required:**
- Regional immigration sites
- Any domain not in verified list

---

## 💰 Bounty Rewards

### Pricing

| Type | Reward |
|------|--------|
| `verified_update` | £2 |
| `new_origin_country` | £10 |
| `critical_change` | £5 |
| `document_privilege` | £3 |
| `bug_fix` | £2 |
| `verification` | £1 |

### How to Get Paid (Step-by-Step)

#### Step 1: Submit Your PR
Submit your fork with the changes following our guidelines above.

#### Step 2: Wait for Automated Verification
Our GitHub Actions bot will automatically:
- Verify your government source URLs are valid
- Check that URLs are accessible
- Post a verification result comment on your PR

#### Step 3: Check Verification Status
You'll see one of two results:

**✅ Verification Passed:**
```
Your contribution has been verified! 
To receive your bounty payment, email contributors@diasporaai.dev
```

**❌ Verification Failed:**
```
Some sources could not be verified. Please update your PR.
```

#### Step 4: Email for Payment (After Verification Passes)

Once your PR shows **✅ Verification Passed**, send an email to:

📧 **contributors@diasporaai.dev**

**Email Subject:**
```
Bounty Payment - PR #[YOUR_PR_NUMBER]
```

**Email Body Must Include:**
```
GitHub Username: [your-username]
PR Number: #[number]
Fork Repository: [your-username]/Diaspora_AI_Visa_data
Bounty Type: [verified_update / new_origin_country / etc.]
Expected Amount: £[amount]

Payment Method: [PayPal / Wise / Bank Transfer]
Payment Details: [your payment email or bank details]
```

#### Step 5: Payment Processing

1. We cross-check your email against our verified contributors list
2. We verify your GitHub username, PR number, and fork match our records
3. Payment is sent in the next monthly batch, on the **11th** (see [Bounty Rewards](#bounty-rewards))

### Payment Methods

- **PayPal:** Send your PayPal email address
- **Wise (TransferWise):** Send your Wise email address
- **Bank Transfer:** Send IBAN/SWIFT details (for larger amounts)

### Important Notes

⚠️ **We will NOT process payment if:**
- PR verification failed
- Email details don't match our verified list
- GitHub username doesn't match PR contributor
- Fork repository doesn't match

✅ **Payments are processed manually** to ensure accuracy and prevent fraud.

### Timeline

All bounties are paid in one monthly batch on the **11th**. PRs merged and claimed by the end of a month are paid on the 11th of the following month. AI-assisted contributions are also subject to the thresholds and caps in the [AI Contributions & Review Policy](#ai-contributions--review-policy).

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

## 🔄 What Happens After Merge

When your PR is merged, our automation:

1. **Syncs to Production Database** — Your verified data is automatically pushed to our Supabase database
2. **Updates Live API** — The Diaspora AI Visa API immediately reflects your changes
3. **Adds Sync Comment** — A comment is posted on your PR confirming the database sync
4. **Helps Travelers** — Real users benefit from your contribution within minutes!

### Database Sync Flow

```
PR Merged → GitHub Action Triggers → Data Sent to Flight API → 
    → Flight API Validates → Supabase Updated → Live API Updated
```

Your contribution is now helping diaspora travelers worldwide! 🌍

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
