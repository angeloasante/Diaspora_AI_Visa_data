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

This is the "I have a UK visa, where else can I travel visa-free?" feature.

### 5. Bug Fix (`bug_fix`) — £10

Correct incorrect or outdated information in existing data.

### 6. Verification (`verification`) — £5

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

### Bounty: £20 per Valid Addition

Each new document privilege entry (with verified government source) earns £20.

If you add **5+ countries** in one PR for the same anchor document, you get a bonus:
- 5-10 countries: £100 + £10 bonus = **£110**
- 11-20 countries: £200 + £30 bonus = **£230**
- 20+ countries: £400 + £50 bonus = **£450**

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

1. **Send an email to:** `info@diasporaai.dev`
2. **Subject:** `Bounty Payment - PR #[YOUR_PR_NUMBER]`
3. **Include:**
   - Your GitHub username
   - PR number
   - Fork repository name
   - Payment preference: PayPal, Wise, or bank transfer
   - Payment details (email or bank info)

We'll cross-check your details against our verified list and process payment within 1 week.

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
| `verified_update` | £15 |
| `new_origin_country` | £80 |
| `critical_change` | £30 |
| `document_privilege` | £20 |
| `bug_fix` | £10 |
| `verification` | £5 |

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
To receive your bounty payment, email info@diasporaai.dev
```

**❌ Verification Failed:**
```
Some sources could not be verified. Please update your PR.
```

#### Step 4: Email for Payment (After Verification Passes)

Once your PR shows **✅ Verification Passed**, send an email to:

📧 **info@diasporaai.dev**

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
3. Payment is sent within **3-5 business days**

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

| Contributor Type | Payment Timeline |
|-----------------|------------------|
| First-time contributors | 5-7 business days |
| Returning contributors | 3-5 business days |
| Trusted contributors (5+ PRs) | 1-3 business days |

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
