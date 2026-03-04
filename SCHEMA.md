# Diaspora Visa Data Schema

This document defines the JSON schema for all data files in this repository.

---

## Table of Contents

- [Passport Requirements Schema](#passport-requirements-schema)
- [Document Privileges Schema](#document-privileges-schema)
- [Source Verification Schema](#source-verification-schema)
- [Country Index Schema](#country-index-schema)
- [Bounty Schema](#bounty-schema)

---

## Passport Requirements Schema

**Location:** `data/passport-requirements/{COUNTRY_CODE}.json`

**Filename:** ISO 3166-1 alpha-2 country code (e.g., `GH.json` for Ghana)

### Full Schema

```json
{
  "$schema": "https://json-schema.org/draft/2020-12/schema",
  "type": "object",
  "required": ["origin", "lastUpdated", "routes"],
  "properties": {
    "origin": {
      "type": "object",
      "required": ["code", "name"],
      "properties": {
        "code": { "type": "string", "pattern": "^[A-Z]{2}$" },
        "name": { "type": "string" }
      }
    },
    "lastUpdated": { "type": "string", "format": "date" },
    "totalRoutes": { "type": "integer" },
    "routes": {
      "type": "array",
      "items": { "$ref": "#/$defs/route" }
    }
  },
  "$defs": {
    "route": {
      "type": "object",
      "required": ["to", "visa", "source"],
      "properties": {
        "to": {
          "type": "object",
          "required": ["code", "name"],
          "properties": {
            "code": { "type": "string", "pattern": "^[A-Z]{2}$" },
            "name": { "type": "string" },
            "region": { "type": "string" }
          }
        },
        "visa": { "$ref": "#/$defs/visaInfo" },
        "documents": { "$ref": "#/$defs/documentRequirements" },
        "transit": { "$ref": "#/$defs/transitInfo" },
        "source": { "$ref": "#/$defs/sourceInfo" },
        "notes": { "type": "string" }
      }
    },
    "visaInfo": {
      "type": "object",
      "required": ["required", "policy"],
      "properties": {
        "required": { "type": "boolean" },
        "policy": {
          "type": "string",
          "enum": ["visa_required", "visa_free", "evisa", "voa", "eta", "transit_visa", "unknown"]
        },
        "type": { "type": "string" },
        "maxStayDays": { "type": "integer" },
        "visaFreeDays": { "type": "integer" },
        "processingDays": { "type": "string" },
        "cost": {
          "type": "object",
          "properties": {
            "amount": { "type": "number" },
            "currency": { "type": "string" }
          }
        },
        "multipleEntry": { "type": "boolean" },
        "evisaAvailable": { "type": "boolean" },
        "visaOnArrival": { "type": "boolean" },
        "applicationUrl": { "type": "string", "format": "uri" }
      }
    },
    "documentRequirements": {
      "type": "object",
      "properties": {
        "passportValidityMonths": { "type": "integer" },
        "blankPages": { "type": "integer" },
        "proofOfFunds": { "type": "boolean" },
        "returnTicket": { "type": "boolean" },
        "hotelBooking": { "type": "boolean" },
        "travelInsurance": {
          "type": "object",
          "properties": {
            "required": { "type": "boolean" },
            "recommended": { "type": "boolean" },
            "minimumCoverage": { "type": "number" }
          }
        },
        "yellowFever": { "type": "boolean" },
        "invitationLetter": { "type": "boolean" },
        "additionalNotes": { "type": "string" }
      }
    },
    "transitInfo": {
      "type": "object",
      "properties": {
        "visaRequired": { "type": "boolean" },
        "airsideTransitAllowed": { "type": "boolean" },
        "maxHours": { "type": "integer" },
        "notes": { "type": "string" }
      }
    },
    "sourceInfo": {
      "type": "object",
      "description": "⚠️ MANDATORY: Must be from official government domain",
      "required": ["url", "accessedDate", "governmentDomain"],
      "properties": {
        "url": { 
          "type": "string", 
          "format": "uri",
          "description": "MUST be official government URL (*.gov, *.gov.uk, embassy sites, etc.)"
        },
        "governmentDomain": {
          "type": "boolean",
          "description": "Must be true - confirms URL is from official government site"
        },
        "accessedDate": { "type": "string", "format": "date" },
        "verificationPath": {
          "type": "string",
          "description": "Navigation steps to find info on government site"
        },
        "exactQuote": {
          "type": "string", 
          "description": "Direct quote from government source confirming the information"
        },
        "archived": { "type": "string", "format": "uri" },
        "confidence": {
          "type": "string",
          "enum": ["verified", "unverified", "outdated"]
        },
        "notes": { "type": "string" }
      }
    }
  }
}
```

### Example Entry

```json
{
  "origin": {
    "code": "GH",
    "name": "Ghana"
  },
  "lastUpdated": "2026-03-04",
  "totalRoutes": 195,
  "routes": [
    {
      "to": {
        "code": "GB",
        "name": "United Kingdom",
        "region": "europe"
      },
      "visa": {
        "required": true,
        "policy": "visa_required",
        "type": "Standard Visitor Visa",
        "maxStayDays": 180,
        "processingDays": "15 working days",
        "cost": { "amount": 100, "currency": "GBP" },
        "multipleEntry": true,
        "evisaAvailable": false,
        "visaOnArrival": false,
        "applicationUrl": "https://www.gov.uk/standard-visitor"
      },
      "documents": {
        "passportValidityMonths": 6,
        "blankPages": 2,
        "proofOfFunds": true,
        "returnTicket": true,
        "hotelBooking": true,
        "travelInsurance": { "required": false, "recommended": true },
        "yellowFever": true
      },
      "transit": {
        "visaRequired": false,
        "airsideTransitAllowed": true,
        "notes": "Airside transit without visa for up to 24 hours"
      },
      "source": {
        "url": "https://www.gov.uk/check-uk-visa/y/ghana/tourism",
        "governmentDomain": true,
        "accessedDate": "2026-03-01",
        "verificationPath": "gov.uk > Check if you need a visa > Ghana > Tourism",
        "exactQuote": "You'll need a visa to come to the UK as a Standard Visitor",
        "confidence": "verified"
      },
      "notes": "Apply via TLS Contact or VFS Global"
    }
  ]
}
```

---

## Document Privileges Schema

**Location:** `data/document-privileges/{COUNTRY}-{type}.json`

**Filename examples:**
- `UK-visa.json` — UK visa privileges
- `US-visa.json` — US visa privileges  
- `US-green-card.json` — US permanent resident privileges
- `SCHENGEN-visa.json` — Schengen visa privileges

### Full Schema

```json
{
  "$schema": "https://json-schema.org/draft/2020-12/schema",
  "type": "object",
  "required": ["document", "lastUpdated", "unlocks"],
  "properties": {
    "document": {
      "type": "object",
      "required": ["type", "country"],
      "properties": {
        "type": {
          "type": "string",
          "enum": ["visa", "residence_permit", "green_card", "work_permit", "student_visa", "dependent_visa"]
        },
        "country": { "type": "string" },
        "countryName": { "type": "string" },
        "categories": {
          "type": "array",
          "items": { "type": "string" }
        },
        "description": { "type": "string" }
      }
    },
    "lastUpdated": { "type": "string", "format": "date" },
    "totalUnlocked": { "type": "integer" },
    "unlocks": {
      "type": "array", 
      "items": { "$ref": "#/$defs/unlockedCountry" }
    }
  },
  "$defs": {
    "unlockedCountry": {
      "type": "object",
      "required": ["country", "countryName", "conditions", "source"],
      "properties": {
        "country": { "type": "string", "pattern": "^[A-Z]{2}$" },
        "countryName": { "type": "string" },
        "region": { "type": "string" },
        "conditions": { "type": "string" },
        "maxStayDays": { "type": "integer" },
        "visaOnArrival": { "type": "boolean" },
        "evisaRequired": { "type": "boolean" },
        "additionalRequirements": { "type": "string" },
        "source": {
          "type": "object",
          "required": ["url", "accessedDate"],
          "properties": {
            "url": { "type": "string", "format": "uri" },
            "accessedDate": { "type": "string", "format": "date" },
            "confidence": { "type": "string" }
          }
        },
        "notes": { "type": "string" }
      }
    }
  }
}
```

### Example Entry

```json
{
  "document": {
    "type": "visa",
    "country": "GB",
    "countryName": "United Kingdom",
    "categories": ["visitor", "work", "student", "dependent", "spouse"],
    "description": "Any valid UK visa allows visa-free or visa-on-arrival access to additional countries"
  },
  "lastUpdated": "2026-03-04",
  "totalUnlocked": 25,
  "unlocks": [
    {
      "country": "AL",
      "countryName": "Albania",
      "region": "europe",
      "conditions": "Valid UK visa (any category)",
      "maxStayDays": 90,
      "visaOnArrival": false,
      "source": {
        "url": "https://punetejashtme.gov.al/en/",
        "accessedDate": "2026-03-01",
        "confidence": "verified"
      },
      "notes": "Multi-entry Schengen, US, or UK visa required"
    }
  ]
}
```

---

## Source Verification Schema

**Location:** `sources/verified-domains.json`

### Schema

```json
{
  "type": "object",
  "properties": {
    "lastUpdated": { "type": "string", "format": "date" },
    "domains": {
      "type": "array",
      "items": {
        "type": "object",
        "properties": {
          "pattern": { "type": "string" },
          "country": { "type": "string" },
          "type": { "type": "string" },
          "autoApprove": { "type": "boolean" },
          "notes": { "type": "string" }
        }
      }
    }
  }
}
```

---

## Country Index Schema

**Location:** `data/countries/index.json`

### Schema

```json
{
  "type": "object",
  "properties": {
    "lastUpdated": { "type": "string", "format": "date" },
    "totalCountries": { "type": "integer" },
    "countries": {
      "type": "array",
      "items": {
        "type": "object",
        "required": ["code", "name"],
        "properties": {
          "code": { "type": "string", "pattern": "^[A-Z]{2}$" },
          "name": { "type": "string" },
          "region": { "type": "string" },
          "subregion": { "type": "string" },
          "schengen": { "type": "boolean" },
          "eu": { "type": "boolean" },
          "ecowas": { "type": "boolean" }
        }
      }
    }
  }
}
```

---

## Bounty Schema

**Location:** `bounties/open.json`

### Schema

```json
{
  "type": "object",
  "properties": {
    "lastUpdated": { "type": "string", "format": "date" },
    "bounties": {
      "type": "array",
      "items": {
        "type": "object",
        "properties": {
          "id": { "type": "string" },
          "type": {
            "type": "string",
            "enum": ["verified_update", "new_origin_country", "critical_change", "document_privilege", "bug_fix", "verification"]
          },
          "status": {
            "type": "string",
            "enum": ["open", "claimed", "in_review", "completed"]
          },
          "reward": { "type": "string" },
          "target": {
            "type": "object",
            "properties": {
              "file": { "type": "string" },
              "route": { "type": "string" },
              "description": { "type": "string" }
            }
          },
          "reason": { "type": "string" },
          "claimedBy": { "type": "string" },
          "createdAt": { "type": "string", "format": "date-time" },
          "expiresAt": { "type": "string", "format": "date-time" }
        }
      }
    }
  }
}
```

---

## Validation

All JSON files are validated against their schemas via GitHub Actions on every PR.

To validate locally:

```bash
npm install -g ajv-cli
ajv validate -s schema/passport-requirements.schema.json -d data/passport-requirements/GH.json
```

---

## Versioning

The schema version is tracked in `schema/version.json`:

```json
{
  "version": "1.0.0",
  "lastUpdated": "2026-03-04"
}
```

Breaking changes will increment the major version.

---

*Schema version: 1.0.0*
