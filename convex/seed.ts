import { mutation } from "./_generated/server";

const INDUSTRIES = [
  { name: "Information Technology", value: "information_technology" },
  { name: "Software Development", value: "software_development" },
  { name: "Telecommunications", value: "telecommunications" },
  { name: "Civil Engineering", value: "civil_engineering" },
  { name: "Mechanical Engineering", value: "mechanical_engineering" },
  { name: "Electrical Engineering", value: "electrical_engineering" },
  { name: "Banking & Finance", value: "banking_finance" },
  { name: "Healthcare & Medicine", value: "healthcare_medicine" },
  { name: "Agriculture", value: "agriculture" },
  { name: "Education", value: "education" },
  { name: "Media & Broadcasting", value: "media_broadcasting" },
  { name: "Oil & Gas", value: "oil_gas" },
  { name: "Manufacturing", value: "manufacturing" },
  { name: "Government & Public Sector", value: "government_public_sector" },
  { name: "Architecture & Design", value: "architecture_design" },
  { name: "Non-Governmental Organizations (NGO)", value: "ngo" },
];

export const seedIndustries = mutation({
  handler: async (ctx) => {
    // Check if industries already exist
    const existing = await ctx.db.query("industries").collect();
    if (existing.length > 0) {
      return "Industries already seeded!";
    }

    // Insert all industries
    for (const industry of INDUSTRIES) {
      await ctx.db.insert("industries", industry);
    }
    
    return `Seeded ${INDUSTRIES.length} industries successfully!`;
  },
});
