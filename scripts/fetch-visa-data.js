#!/usr/bin/env node
/**
 * Fetch all visa requirements from the Diaspora AI backend
 * and generate JSON files for the open-source visa data repo
 */

const API_BASE = "https://diasporaaibackend-production.up.railway.app";
const API_KEY = "dsp_visa_p8vDd8pZt5LhZKLScH5YL9yAWtEm2Kvn";

async function fetchWithRetry(url, retries = 3) {
  for (let i = 0; i < retries; i++) {
    try {
      const response = await fetch(url, {
        headers: { "X-API-Key": API_KEY }
      });
      if (!response.ok) throw new Error(`HTTP ${response.status}`);
      return await response.json();
    } catch (error) {
      if (i === retries - 1) throw error;
      await new Promise(r => setTimeout(r, 1000 * (i + 1)));
    }
  }
}

async function fetchAllVisaData(originCountry) {
  console.log(`\n📥 Fetching visa routes from ${originCountry}...`);
  
  // Get all routes summary
  const routesData = await fetchWithRetry(
    `${API_BASE}/visa/routes?from=${originCountry}`
  );
  
  if (!routesData.success) {
    throw new Error(`Failed to fetch routes: ${routesData.error}`);
  }
  
  const { summary, destinations } = routesData.data;
  console.log(`📊 Found ${summary.total} destinations`);
  console.log(`   - Visa Free: ${summary.visa_free}`);
  console.log(`   - E-Visa: ${summary.evisa}`);
  console.log(`   - VOA: ${summary.visa_on_arrival}`);
  console.log(`   - Visa Required: ${summary.visa_required}`);
  
  // Collect all destination codes
  const allDestinations = [
    ...destinations.visa_free,
    ...destinations.evisa,
    ...destinations.voa,
    ...destinations.visa_required
  ];
  
  console.log(`\n📡 Fetching detailed info for ${allDestinations.length} destinations...`);
  
  const visaRequirements = [];
  let processed = 0;
  
  // Fetch detailed info for each destination (with rate limiting)
  for (const dest of allDestinations) {
    try {
      const detailData = await fetchWithRetry(
        `${API_BASE}/visa/check?from=${originCountry}&to=${dest.code}`
      );
      
      if (detailData.success) {
        visaRequirements.push({
          destination: {
            code: dest.code,
            name: detailData.data.route.to.name
          },
          region: detailData.data.route.region,
          popularFor: detailData.data.route.popularFor,
          visa: detailData.data.visa,
          documents: detailData.data.documents,
          transit: detailData.data.transit,
          verification: {
            ...detailData.data.verification,
            lastChecked: new Date().toISOString().split('T')[0],
            dataSource: "diaspora-ai-backend"
          }
        });
      }
      
      processed++;
      if (processed % 20 === 0) {
        console.log(`   ✓ Processed ${processed}/${allDestinations.length}`);
      }
      
      // Rate limiting: 50ms delay between requests
      await new Promise(r => setTimeout(r, 50));
      
    } catch (error) {
      console.error(`   ⚠️ Failed to fetch ${dest.code}: ${error.message}`);
    }
  }
  
  console.log(`✅ Completed: ${visaRequirements.length}/${allDestinations.length} destinations`);
  
  return {
    origin: {
      code: originCountry,
      name: routesData.data.origin.name
    },
    summary: {
      total: visaRequirements.length,
      visaFree: summary.visa_free,
      evisa: summary.evisa,
      visaOnArrival: summary.visa_on_arrival,
      visaRequired: summary.visa_required
    },
    lastUpdated: new Date().toISOString(),
    dataVersion: "1.0.0",
    requirements: visaRequirements
  };
}

async function main() {
  const originCountry = process.argv[2] || "GH";
  
  console.log("🌍 Diaspora AI Visa Data Fetcher");
  console.log("================================");
  
  try {
    const data = await fetchAllVisaData(originCountry);
    
    // Output JSON
    const outputPath = `./data/passport-requirements/${originCountry}.json`;
    const fs = await import('fs');
    const path = await import('path');
    
    // Ensure directory exists
    const dir = path.dirname(outputPath);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    
    fs.writeFileSync(outputPath, JSON.stringify(data, null, 2));
    console.log(`\n💾 Saved to ${outputPath}`);
    console.log(`   File size: ${(fs.statSync(outputPath).size / 1024).toFixed(2)} KB`);
    
  } catch (error) {
    console.error("❌ Error:", error.message);
    process.exit(1);
  }
}

main();
