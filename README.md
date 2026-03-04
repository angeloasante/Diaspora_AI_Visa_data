# 🛂 Diaspora Visa Data

**The world's first open-source, community-maintained visa requirements database for diaspora travelers.**

[![Data Freshness](https://img.shields.io/badge/data-updated%20March%202026-brightgreen)]()
[![Contributors](https://img.shields.io/badge/contributors-welcome-blue)]()
[![License](https://img.shields.io/badge/license-CC%20BY%204.0-green)](LICENSE)

---

## 🌍 What Makes This Different

Every visa API answers the same question: *"Can passport X enter country Y?"*

**We answer a different question:**

> "I'm Ghanaian with a UK dependent visa — how many countries can I enter without another visa?"

This is the **only visa database that understands document combinations**, not just passports.

---

## 📊 Current Coverage

**126 Origin Countries** | **24,948 Visa Routes** | **198 Destinations Per Country**

| Region | Countries | Example Origins |
|--------|-----------|----------------|
| 🌍 Africa | 54 | Ghana, Nigeria, Kenya, South Africa, Egypt, Morocco |
| 🌏 Asia | 35 | India, Pakistan, Bangladesh, Philippines, Vietnam |
| 🌎 Americas | 20 | Brazil, Mexico, Colombia, Jamaica, Trinidad |
| 🌍 Europe | 10 | Turkey, Albania, Ukraine, Serbia |
| 🌏 Oceania | 7 | Fiji, Papua New Guinea, Vanuatu |

### Summary

| Visa Policy | Routes |
|-------------|--------|
| 🟢 Visa Free | ~5,040 |
| 🟡 eVisa | ~4,914 |
| 🟠 Visa on Arrival | ~2,898 |
| 🔴 Visa Required | ~12,096 |

---

## 🗂️ Repository Structure

```
diaspora-visa-data/
├── data/
│   ├── passport-requirements/     # Base passport → country rules
│   │   ├── GH.json               # Ghana passport
│   │   ├── NG.json               # Nigeria passport
│   │   └── ...
│   │
│   ├── document-privileges/       # Document → unlocked countries
│   │   ├── UK-visa.json          # UK visa privileges
│   │   ├── US-visa.json          # US visa privileges
│   │   ├── SCHENGEN-visa.json    # Schengen privileges
│   │   └── ...
│   │
│   ├── countries/                 # Country reference data
│   │   └── index.json            # All countries
│   │
│   └── changelog/                 # Audit trail
│       └── 2026-03-04.json
│
├── sources/
│   ├── verified-domains.json      # Trusted government domains
│   └── pending-verification/      # Awaiting verification
│
├── bounties/
│   └── open.json                  # Available bounties
│
└── automation/
    └── scripts/                   # Validation scripts
```

---

## 🤝 Contributing

We welcome contributions! Every visa rule change, every new route, every correction helps thousands of diaspora travelers.

### Quick Start

1. **Fork this repository**
2. **Find data to update** — Check `bounties/open.json` for needed updates
3. **Make your changes** — Edit the relevant JSON file
4. **⚠️ REQUIRED: Include official government source URL** — Every change MUST link to the official government immigration/visa website
5. **Submit PR** — Our automation verifies your sources automatically
6. **Wait for verification** — Bot will comment ✅ or ❌ on your PR
7. **Email for payment** — Once verified, email `info@diasporaai.dev` with your payment details

### How Bounty Payments Work

```
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│  Submit PR      │───►│  Auto-Verify    │───►│  ✅ Verified    │
│  with sources   │    │  Government     │    │  Comment on PR  │
└─────────────────┘    │  URLs           │    └────────┬────────┘
                       └─────────────────┘             │
                                                       ▼
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│  Manual Payment │◄───│  Cross-check    │◄───│  Email          │
│  via PayPal/    │    │  PR details     │    │  info@diaspora  │
│  Wise/Bank      │    │                 │    │  ai.dev         │
└─────────────────┘    └─────────────────┘    └─────────────────┘
```

### Source URL Requirements

Every contribution **MUST** include:
- Direct URL to the **official government** visa/immigration page
- The **exact page** where the information can be verified
- Date you accessed the source

Example acceptable sources:
- `https://www.gov.uk/check-uk-visa/y/ghana/tourism`
- `https://travel.state.gov/content/travel/en/us-visas.html`
- `https://www.migration.gv.at/en/types-of-immigration/`

See [CONTRIBUTING.md](CONTRIBUTING.md) for detailed guidelines.

### Bounty Rewards

| Contribution Type | Reward |
|-------------------|--------|
| Verified update to one route | £15 |
| New origin country (50+ routes) | £80 |
| Critical policy change | £30 |
| Document privilege rules | £20 |
| Bug fix / correction | £10 |
| Verify existing data | £5 |

*See [CONTRIBUTING.md](CONTRIBUTING.md) for payment details.*

---

## 📋 Data Schema

All data follows a strict schema. See [SCHEMA.md](SCHEMA.md) for full documentation.

### Example: Passport Requirement

```json
{
  "route": "GH → GB",
  "from": "GH",
  "to": "GB",
  "visa": {
    "required": true,
    "policy": "visa_required",
    "type": "Standard Visitor Visa",
    "maxStayDays": 180,
    "evisaAvailable": false,
    "visaOnArrival": false
  },
  "documents": {
    "passportValidityMonths": 6,
    "blankPages": 2,
    "proofOfFunds": true,
    "returnTicket": true
  },
  "source": {
    "url": "https://www.gov.uk/check-uk-visa",
    "verified": "2026-03-01",
    "confidence": "verified"
  }
}
```

### Example: Document Privilege

```json
{
  "document": {
    "type": "visa",
    "country": "GB",
    "categories": ["visitor", "work", "student", "dependent"]
  },
  "unlocks": [
    {
      "country": "AL",
      "name": "Albania",
      "conditions": "Valid UK visa",
      "maxStayDays": 90,
      "source": "https://punetejashtme.gov.al/"
    }
  ]
}
```

---

## ✅ Verification Process

1. **Source Required** — Every contribution must include an official source URL
2. **Automated Check** — GitHub Actions verify the source domain is legitimate
3. **Human Review** — Maintainers review edge cases
4. **Auto-Deploy** — Verified data deploys to production API

---

## 🏆 Top Contributors

<!-- LEADERBOARD:START -->
| Rank | Contributor | Contributions | Countries |
|------|-------------|---------------|-----------|
| 🥇 | *Be the first!* | - | - |
<!-- LEADERBOARD:END -->

---

## 🔒 Data License

This data is licensed under [Creative Commons Attribution 4.0 International (CC BY 4.0)](LICENSE).

You are free to:
- **Share** — copy and redistribute the material
- **Adapt** — remix, transform, and build upon the material

Under the following terms:
- **Attribution** — You must give appropriate credit

---

## 📞 Contact

- **API Access**: [diasporaai.dev](https://diasporaai.dev)
- **Email**: api@diasporaai.dev
- **Issues**: [GitHub Issues](../../issues)

---

## 🚀 Powered By

This data powers the [Diaspora AI Visa API](https://diasporaai.dev) — the only API that understands multi-document travel privileges for African diaspora travelers.

---

*Last updated: March 2026*
