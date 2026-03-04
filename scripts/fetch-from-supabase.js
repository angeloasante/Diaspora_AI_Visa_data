const { createClient } = require('@supabase/supabase-js');
const fs = require('fs');
const path = require('path');

// Supabase credentials from flight-api .env
const SUPABASE_URL = 'https://foliqngtnemffttixawn.supabase.co';
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZvbGlxbmd0bmVtZmZ0dGl4YXduIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc2MjU3MDQ2OSwiZXhwIjoyMDc4MTQ2NDY5fQ.GK_BPeRx5LAey1PeoNDEQBEXNPLLzIEKJEb_sZVXZFw';

const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

// Country code to name mapping
const COUNTRY_NAMES = {
  // Africa
  GH: "Ghana", NG: "Nigeria", KE: "Kenya", ZA: "South Africa",
  EG: "Egypt", MA: "Morocco", TZ: "Tanzania", UG: "Uganda",
  RW: "Rwanda", ET: "Ethiopia", SN: "Senegal", CI: "Côte d'Ivoire",
  CM: "Cameroon", ZW: "Zimbabwe", BW: "Botswana", MU: "Mauritius",
  DZ: "Algeria", AO: "Angola", BJ: "Benin", BF: "Burkina Faso",
  BI: "Burundi", CV: "Cape Verde", CF: "Central African Republic",
  TD: "Chad", KM: "Comoros", CD: "DR Congo", CG: "Congo",
  DJ: "Djibouti", GQ: "Equatorial Guinea", ER: "Eritrea",
  SZ: "Eswatini", GA: "Gabon", GM: "Gambia", GN: "Guinea",
  GW: "Guinea-Bissau", LS: "Lesotho", LR: "Liberia", LY: "Libya",
  MG: "Madagascar", MW: "Malawi", ML: "Mali", MR: "Mauritania",
  MZ: "Mozambique", NA: "Namibia", NE: "Niger", SC: "Seychelles",
  SL: "Sierra Leone", SO: "Somalia", SS: "South Sudan", SD: "Sudan",
  TG: "Togo", TN: "Tunisia", ZM: "Zambia",
  // Europe
  GB: "United Kingdom", DE: "Germany", FR: "France", NL: "Netherlands",
  IT: "Italy", ES: "Spain", PT: "Portugal", BE: "Belgium",
  CH: "Switzerland", AT: "Austria", SE: "Sweden", NO: "Norway",
  DK: "Denmark", FI: "Finland", IE: "Ireland", PL: "Poland",
  CZ: "Czech Republic", GR: "Greece", TR: "Turkey", RU: "Russia",
  UA: "Ukraine", RO: "Romania", HU: "Hungary", SK: "Slovakia",
  BG: "Bulgaria", HR: "Croatia", RS: "Serbia", SI: "Slovenia",
  LT: "Lithuania", LV: "Latvia", EE: "Estonia", BY: "Belarus",
  MD: "Moldova", AL: "Albania", MK: "North Macedonia", ME: "Montenegro",
  BA: "Bosnia and Herzegovina", XK: "Kosovo", IS: "Iceland",
  MT: "Malta", CY: "Cyprus", LU: "Luxembourg", AD: "Andorra",
  MC: "Monaco", SM: "San Marino", VA: "Vatican City", LI: "Liechtenstein",
  // Americas
  US: "United States", CA: "Canada", MX: "Mexico", BR: "Brazil",
  AR: "Argentina", CL: "Chile", CO: "Colombia", PE: "Peru",
  VE: "Venezuela", EC: "Ecuador", BO: "Bolivia", PY: "Paraguay",
  UY: "Uruguay", GY: "Guyana", SR: "Suriname", PA: "Panama",
  CR: "Costa Rica", NI: "Nicaragua", HN: "Honduras", SV: "El Salvador",
  GT: "Guatemala", BZ: "Belize", CU: "Cuba", DO: "Dominican Republic",
  HT: "Haiti", JM: "Jamaica", TT: "Trinidad and Tobago",
  BS: "Bahamas", BB: "Barbados", AG: "Antigua and Barbuda",
  DM: "Dominica", GD: "Grenada", KN: "Saint Kitts and Nevis",
  LC: "Saint Lucia", VC: "Saint Vincent and the Grenadines",
  // Asia
  CN: "China", JP: "Japan", KR: "South Korea", IN: "India",
  SG: "Singapore", MY: "Malaysia", TH: "Thailand", ID: "Indonesia",
  PH: "Philippines", VN: "Vietnam", HK: "Hong Kong", TW: "Taiwan",
  PK: "Pakistan", BD: "Bangladesh", LK: "Sri Lanka", NP: "Nepal",
  MM: "Myanmar", KH: "Cambodia", LA: "Laos", MN: "Mongolia",
  KZ: "Kazakhstan", UZ: "Uzbekistan", TM: "Turkmenistan",
  TJ: "Tajikistan", KG: "Kyrgyzstan", AF: "Afghanistan",
  IR: "Iran", IQ: "Iraq", SY: "Syria", LB: "Lebanon",
  // Middle East
  AE: "United Arab Emirates", SA: "Saudi Arabia", QA: "Qatar",
  KW: "Kuwait", BH: "Bahrain", OM: "Oman", JO: "Jordan", IL: "Israel",
  PS: "Palestine", YE: "Yemen",
  // Oceania
  AU: "Australia", NZ: "New Zealand", FJ: "Fiji", PG: "Papua New Guinea",
  SB: "Solomon Islands", VU: "Vanuatu", WS: "Samoa", TO: "Tonga",
  TV: "Tuvalu", KI: "Kiribati", MH: "Marshall Islands",
  FM: "Micronesia", PW: "Palau", NR: "Nauru",
  // Special territories
  MO: "Macau", MV: "Maldives", BT: "Bhutan", BN: "Brunei",
  TL: "Timor-Leste", GE: "Georgia", AM: "Armenia", AZ: "Azerbaijan"
};

async function main() {
  console.log("🔗 Connecting to Supabase...");
  
  // First, let's see what tables exist (table name is VisaRequirements)
  const { data: tables, error: tablesError } = await supabase
    .from('VisaRequirements')
    .select('from_country')
    .limit(1);
  
  if (tablesError) {
    console.error("Error connecting:", tablesError);
    return;
  }
  
  console.log("✅ Connected! Fetching all unique origin countries...");
  
  // Get all unique origin countries
  const { data: origins, error: originsError } = await supabase
    .from('VisaRequirements')
    .select('from_country')
    .order('from_country');
  
  if (originsError) {
    console.error("Error fetching origins:", originsError);
    return;
  }
  
  // Get unique country codes
  const uniqueOrigins = [...new Set(origins.map(r => r.from_country))];
  console.log(`📊 Found ${uniqueOrigins.length} unique origin countries`);
  console.log("Countries:", uniqueOrigins.join(', '));
  
  // Now fetch ALL visa requirements with pagination
  console.log("\n📥 Fetching all visa requirements from database...");
  
  let allRequirements = [];
  let page = 0;
  const pageSize = 1000;
  
  while (true) {
    const { data: batch, error: reqError } = await supabase
      .from('VisaRequirements')
      .select('*')
      .order('from_country')
      .order('to_country')
      .range(page * pageSize, (page + 1) * pageSize - 1);
    
    if (reqError) {
      console.error("Error fetching requirements:", reqError);
      return;
    }
    
    if (!batch || batch.length === 0) break;
    
    allRequirements = allRequirements.concat(batch);
    console.log(`  Fetched ${allRequirements.length} records...`);
    
    if (batch.length < pageSize) break;
    page++;
  }
  
  console.log(`✅ Fetched ${allRequirements.length} visa requirement records`);
  
  // Group by origin country
  const byOrigin = {};
  for (const req of allRequirements) {
    if (!byOrigin[req.from_country]) {
      byOrigin[req.from_country] = [];
    }
    byOrigin[req.from_country].push(req);
  }
  
  // Create output directory (at repo root, not inside scripts)
  const outputDir = path.join(__dirname, '..', 'data', 'passport-requirements');
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }
  
  // Generate JSON file for each country
  console.log("\n📝 Generating JSON files...");
  
  let totalFiles = 0;
  for (const [countryCode, requirements] of Object.entries(byOrigin)) {
    const countryName = COUNTRY_NAMES[countryCode] || countryCode;
    
    // Count by policy type
    const summary = {
      visa_free: 0,
      evisa: 0,
      visa_on_arrival: 0,
      visa_required: 0,
      total: requirements.length
    };
    
    const routes = requirements.map(req => {
      // Count by policy
      const policy = req.visa_info?.visa_policy || 'visa_required';
      if (policy === 'visa_free') summary.visa_free++;
      else if (policy === 'evisa') summary.evisa++;
      else if (policy === 'visa_on_arrival') summary.visa_on_arrival++;
      else summary.visa_required++;
      
      return {
        to: {
          code: req.to_country,
          name: COUNTRY_NAMES[req.to_country] || req.to_country
        },
        region: req.region || 'unknown',
        popularFor: req.popular_for || [],
        visa: {
          required: req.visa_info?.visa_required ?? true,
          policy: req.visa_info?.visa_policy || 'visa_required',
          type: req.visa_info?.visa_type_hint || null,
          freeDays: req.visa_info?.visa_free_days || null,
          maxStay: req.visa_info?.allowed_stay_days || null,
          evisa: req.visa_info?.evisa_available || false,
          onArrival: req.visa_info?.visa_on_arrival || false,
          multipleEntry: req.visa_info?.multiple_entry_possible || false,
          notes: req.visa_info?.notes || null
        },
        documents: {
          passport: {
            minimumValidityMonths: req.document_requirements?.passport_min_validity_months || 6,
            blankPagesRequired: req.document_requirements?.blank_pages_required || 2
          },
          requirements: {
            onwardTicket: req.document_requirements?.onward_ticket_required || false,
            proofOfFunds: req.document_requirements?.proof_of_funds_required || false,
            accommodation: req.document_requirements?.hotel_or_address_required || false,
            travelInsurance: {
              recommended: req.document_requirements?.travel_insurance_recommended || false,
              mandatory: req.document_requirements?.travel_insurance_mandatory || false
            },
            yellowFeverCertificate: req.document_requirements?.yellow_fever_required_if_travelling_from_endemic_zone || false
          },
          notes: req.document_requirements?.extra_requirements_notes || null
        },
        transit: {
          visaRequired: req.transit_info?.requires_transit_visa || null,
          notes: req.transit_info?.notes || null
        },
        meta: {
          riskLevel: req.meta_info?.risk_level || 'medium',
          confidence: req.meta_info?.confidence || 'unverified',
          lastChecked: req.meta_info?.last_checked || null,
          source: req.meta_info?.checked_source || null
        },
        lastUpdated: req.updated_at || req.created_at
      };
    });
    
    const countryData = {
      passport: {
        code: countryCode,
        name: countryName
      },
      dataVersion: "1.0.0",
      lastUpdated: new Date().toISOString().split('T')[0],
      totalRoutes: routes.length,
      summary: summary,
      routes: routes
    };
    
    const filePath = path.join(outputDir, `${countryCode}.json`);
    fs.writeFileSync(filePath, JSON.stringify(countryData, null, 2));
    totalFiles++;
    
    console.log(`  ✅ ${countryCode}.json - ${countryName} (${routes.length} routes)`);
  }
  
  console.log(`\n🎉 Done! Generated ${totalFiles} country files`);
  console.log(`📁 Files saved to: ${outputDir}`);
}

main().catch(console.error);
