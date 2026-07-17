import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  industries: defineTable({
    name: v.string(),
    value: v.string(),
  }),
  
  departments: defineTable({
    name: v.string(),
    value: v.string(),
  }),

  companies: defineTable({
    logoUrl: v.optional(v.string()),
    name: v.string(),
    industryId: v.id("industries"),
    websiteUrl: v.string(),
    location: v.object({
      country: v.string(),
      state: v.string(),
      localGovernment: v.string(),
      address: v.string(),
    }),
    isVerified: v.boolean(),
    description: v.string(),
    duration: v.string(),
    batchPeriod: v.string(),
    compensation: v.string(),
    certifyChecked: v.boolean(),
  }),
  
  positions: defineTable({
    companyId: v.id("companies"),
    title: v.string(),
    departmentId: v.id("departments"),
    employmentType: v.string(),
    durationValue: v.number(),
    durationUnit: v.string(),
    locationType: v.array(v.string()),
    currency: v.string(),
    stipend: v.number(),
    daysPerWeek: v.string(),
    startTime: v.string(),
    endTime: v.string(),
    requirements: v.array(v.string()),
  }).index("by_companyId", ["companyId"]),

  suggestions: defineTable({
    companyName: v.string(),
    websiteUrl: v.string(),
    industryId: v.string(),
    location: v.object({
      country: v.string(),
      state: v.string(),
      localGovernment: v.string(),
    }),
    userPhone: v.optional(v.string()),
    companyPhone: v.optional(v.string()),
  }),
});
