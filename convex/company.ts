import { mutation, query } from "./_generated/server";
import { v } from "convex/values";
import { Id } from "./_generated/dataModel";
import { posthog } from "./posthog";

export const getAll = query({
  args: {},
  handler: async (ctx) => {
    const companies = await ctx.db.query("companies").collect();
    return Promise.all(
      companies.map(async (company) => {
        const positions = await ctx.db
          .query("positions")
          .withIndex("by_companyId", (q) => q.eq("companyId", company._id))
          .collect();
        return {
          ...company,
          openRolesCount: positions.length,
        };
      })
    );
  },
});

export const getById = query({
  args: { id: v.id("companies") },
  handler: async (ctx, args) => {
    const company = await ctx.db.get(args.id);
    if (!company) return null;
    
    const positions = await ctx.db
      .query("positions")
      .withIndex("by_companyId", (q) => q.eq("companyId", company._id))
      .collect();
      
    return {
      ...company,
      positions,
    };
  },
});

export const createCompanyWithPositions = mutation({
  args: {
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
    positions: v.array(
      v.object({
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
      })
    ),
  },
  handler: async (ctx, args) => {
    // 1. Insert the new company
    const companyId = await ctx.db.insert("companies", {
      logoUrl: args.logoUrl,
      name: args.name,
      industryId: args.industryId,
      websiteUrl: args.websiteUrl,
      location: args.location,
      isVerified: args.isVerified,
      description: args.description,
      duration: args.duration,
      batchPeriod: args.batchPeriod,
      compensation: args.compensation,
      certifyChecked: args.certifyChecked,
    });

    // 2. Insert all the open positions for this company
    for (const position of args.positions) {
      await ctx.db.insert("positions", {
        companyId,
        title: position.title,
        departmentId: position.departmentId,
        employmentType: position.employmentType,
        durationValue: position.durationValue,
        durationUnit: position.durationUnit,
        locationType: position.locationType,
        currency: position.currency,
        stipend: position.stipend,
        daysPerWeek: position.daysPerWeek,
        startTime: position.startTime,
        endTime: position.endTime,
        requirements: position.requirements,
      });
    }

    await posthog.capture(ctx, {
      distinctId: "system_admin", // Using a static distinctId for admin/backend initiated company creation
      event: "company_created_with_positions",
      properties: {
        companyId,
        positionsCount: args.positions.length,
        industryId: args.industryId,
        isVerified: args.isVerified,
      },
    });

    return companyId;
  },
});
