const API_URL = "https://diasporaaibackend-production.up.railway.app";
const API_KEY = "dsp_visa_p8vDd8pZt5LhZKLScH5YL9yAWtEm2Kvn";
const fs = require('fs');
const path = require('path');

// All 198 country codes from common ISO 3166-1 alpha-2
const ALL_COUNTRIES = [
  // Africa
  "DZ","AO","BJ","BW","BF","BI","CV","CM","CF","TD","KM","CD","CG","CI","DJ","EG","GQ","ER","SZ","ET","GA","GM","GH","GN","GW","KE","LS","LR","LY","MG","MW","ML","MR","MU","MA","MZ","NA","NE","NG","RW","ST","SN","SC","SL","SO","ZA","SS","SD","TZ","TG","TN","UG","ZM","ZW",
  // Europe
  "AL","AD","AT","BY","BE","BA","BG","HR","CY","CZ","DK","EE","FI","FR","DE","GR","HU","IS","IE","IT","XK","LV","LI","LT","LU","MT","MD","MC","ME","NL","MK","NO","PL","PT","RO","RU","SM","RS","SK","SI","ES","SE","CH","UA","GB","VA",
  // Americas
  "AG","AR","BS","BB","BZ","BO","BR","CA","CL","CO","CR","CU","DM","DO","EC","SV","GD","GT","GY","HT","HN","JM","MX","NI","PA","PY","PE","KN","LC","VC","SR","TT","US","UY","VE",
  // Asia
  "AF","AM","AZ","BH","BD","BT","BN","KH","CN","GE","HK","IN","ID","IR","IQ","IL","JP","JO","KZ","KW","KG","LA","LB","MO","MY","MV","MN","MM","NP","KP","OM","PK","PS","PH","QA","SA","SG","KR","LK","SY","TW","TJ","TH","TL","TR","TM","AE","UZ","VN","YE",
  // Oceania
  "AU","FJ","KI","MH","FM","NR","NZ","PW","PG","WS","SB","TO","TV","VU"
];

const COUNTRY_NAMES = {
  "GH": "Ghana", "NG": "Nigeria", "KE": "Kenya", "ZA": "South Africa", "EG": "Egypt",
  "MA": "Morocco", "TZ": "Tanzania", "UG": "Uganda", "RW": "Rwanda", "ET": "Ethiopia",
  "SN": "Senegal", "CI": "Côte d'Ivoire", "CM": "Cameroon", "ZW": "Zimbabwe", "BW": "Botswana",
  "MU": "Mauritius", "GB": "United Kingdom", "DE": "Germany", "FR": "France", "NL": "Netherlands",
  "IT": "Italy", "ES": "Spain", "PT": "Portugal", "BE": "Belgium", "CH": "Switzerland",
  "AT": "Austria", "SE": "Sweden", "NO": "Norway", "DK": "Denmark", "FI": "Finland",
  "IE": "Ireland", "PL": "Poland", "CZ": "Czech Republic", "GR": "Greece", "TR": "Turkey",
  "US": "United States", "CA": "Canada", "MX": "Mexico", "BR": "Brazil", "AR": "Argentina",
  "CL": "Chile", "CO": "Colombia", "PE": "Peru", "JM": "Jamaica", "TT": "Trinidad and Tobago",
  "CN": "China", "JP": "Japan", "KR": "South Korea", "IN": "India", "SG": "Singapore",
  "MY": "Malaysia", "TH": "Thailand", "ID": "Indonesia", "PH": "Philippines", "VN": "Vietnam",
  "HK": "Hong Kong", "TW": "Taiwan", "AE": "United Arab Emirates", "SA": "Saudi Arabia",
  "QA": "Qatar", "KW": "Kuwait", "BH": "Bahrain", "OM": "Oman", "JO": "Jordan", "IL": "Israel",
  "AU": "Australia", "NZ": "New Zealand", "FJ": "Fiji", "PK": "Pakistan", "BD": "Bangladesh",
  "LK": "Sri Lanka", "NP": "Nepal", "RU": "Russia", "UA": "Ukraine", "PL": "Poland"
};

async function fetchWithRetry(url, maxRetries = 3) {
  for (let i = 0; i < maxRetries; i++) {
    try {
      const res = await fetch(url, {
        headers: { "Authorization": `Bearer ${API_KEY}` }
      });
      if (res.ok) return await res.json();
      if (res.status === 429) {
        console.log(`  Rate limited, waiting ${2 * (i + 1)}s...`);
        await new Promise(r => setTimeout(r, 2000 * (i + 1)));
        continue;
      }
      if (res.status === 404) return null;
    } catch (e) {
      if (i === maxRetries - 1) throw e;
      await new Promise(r => setTimeout(r, 1000));
    }
  }
  return null;
}

async function fetchCountryData(originCode) {
  console.log(`\nFetching ${originCode}...`);
  
  const routesRes = await fetchWithRetry(`${API_URL}/visa/routes?from=${originCode}`);
  if (!routesRes || !routesRes.success) {
    console.log(`  No data for ${originCode}`);
    return null;
  }
  
  const allDests = [
    ...(routesRes.data.destinations.visa_free || []),
    ...(routesRes.data.destinations.evisa || []),
    ...(routesRes.data.destinations.voa || []),
    ...(routesRes.data.destinations.visa_required || [])
  ];
  
  console.log(`  Found ${allDests.length} destinations`);
  
  const routes = [];
  let count = 0;
  
  for (const dest of allDests) {
    const details = await fetchWithRetry(`${API_URL}/visa/check?from=${originCode}&to=${dest.code}`);
    if (details && details.success) {
      const d = details.data;
      routes.push({
        to: { code: d.route.to.code, name: d.route.to.name },
        region: d.route.region,
        popularFor: d.route.popularFor || [],
        visa: {
          required: d.visa.required,
          policy: d.visa.policy,
          type: d.visa.visaType,
          freeDays: d.visa.visaFreeDays,
          maxStay: d.visa.maxStayDays,
          evisa: d.visa.evisaAvailable,
          onArrival: d.visa.visaOnArrival,
          multipleEntry: d.visa.multipleEntryPossible,
          notes: d.visa.notes
        },
        documents: {
          passport: d.documents.passport,
          requirements: d.documents.requirements,
          notes: d.documents.additionalNotes
        },
        transit: d.transit,
        meta: {
          riskLevel: d.verification.riskLevel,
          confidence: d.verification.confidence,
          lastChecked: d.verification.lastChecked,
          source: d.verification.source
        },
        lastUpdated: d.timestamps.dataUpdated
      });
      count++;
      if (count % 50 === 0) process.stdout.write(`  ${count}/${allDests.length}...`);
    }
    await new Promise(r => setTimeout(r, 50)); // Small delay
  }
  
  console.log(`  Done: ${routes.length} routes`);
  
  return {
    passport: { 
      code: originCode, 
      name: COUNTRY_NAMES[originCode] || routesRes.data.origin?.name || originCode 
    },
    dataVersion: "1.0.0",
    lastUpdated: new Date().toISOString().split('T')[0],
    totalRoutes: routes.length,
    summary: routesRes.data.summary,
    routes: routes
  };
}

async function main() {
  const outputDir = path.join(__dirname, 'data/passport-requirements');
  
  // Ensure directory exists
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }
  
  console.log(`Starting fetch for ${ALL_COUNTRIES.length} countries...\n`);
  
  let successCount = 0;
  let failCount = 0;
  
  for (const code of ALL_COUNTRIES) {
    try {
      const data = await fetchCountryData(code);
      if (data && data.routes.length > 0) {
        const filePath = path.join(outputDir, `${code}.json`);
        fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
        successCount++;
        console.log(`  ✓ Saved ${code}.json (${data.routes.length} routes)`);
      } else {
        failCount++;
      }
    } catch (err) {
      console.error(`  ✗ Error fetching ${code}:`, err.message);
      failCount++;
    }
  }
  
  console.log(`\n========================================`);
  console.log(`Done! Generated ${successCount} country files`);
  console.log(`Failed: ${failCount}`);
  console.log(`========================================`);
}

main().catch(console.error);
