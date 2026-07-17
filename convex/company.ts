import { mutation, query } from "./_generated/server";
import { v } from "convex/values";
import { posthog } from "./posthog";

export const getAll = query({
  args: {},
  handler: async (ctx) => {
    const companies = await ctx.db.query("companies").collect();
    return companies.map((company) => ({
      ...company,
      openRolesCount: company.openRolesCount || 0,
    }));
  },
});

export const search = query({
  args: {
    state: v.optional(v.string()),
    localGovernment: v.optional(v.string()),
    industryId: v.optional(v.string()),
    departmentId: v.optional(v.string()),
    searchTerm: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    let companies = await ctx.db.query("companies").collect();

    if (args.industryId) {
      const indId = ctx.db.normalizeId("industries", args.industryId);
      if (indId) {
        companies = companies.filter(c => c.industryId === indId);
      } else {
        companies = [];
      }
    }

    if (args.state) {
      companies = companies.filter(c => c.location.state === args.state);
    }

    if (args.localGovernment) {
      companies = companies.filter(c => c.location.localGovernment === args.localGovernment);
    }

    if (args.departmentId) {
      const deptId = ctx.db.normalizeId("departments", args.departmentId);
      if (deptId) {
        const positions = await ctx.db
          .query("positions")
          .withIndex("by_departmentId", (q) => q.eq("departmentId", deptId))
          .collect();
        
        const companyIdsWithDept = new Set(positions.map(p => p.companyId));
        companies = companies.filter(c => companyIdsWithDept.has(c._id));
      } else {
        companies = [];
      }
    }

    if (args.searchTerm) {
      const lowerTerm = args.searchTerm.toLowerCase();
      companies = companies.filter(c => 
        c.name.toLowerCase().includes(lowerTerm) || 
        c.description.toLowerCase().includes(lowerTerm)
      );
    }

    return companies.map((company) => ({
      ...company,
      openRolesCount: company.openRolesCount || 0,
    }));
  },
});

export const getById = query({
  args: { id: v.string() },
  handler: async (ctx, args) => {
    const normalizedId = ctx.db.normalizeId("companies", args.id);
    if (!normalizedId) return null;

    const company = await ctx.db.get(normalizedId);
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
    websiteUrl: v.optional(v.string()),
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
    const normalize = (s: string) => s.trim().toLowerCase().replace(/\s+/g, ' ');
    const canonicalKey = `${normalize(args.name)}|${normalize(args.location.country)}|${normalize(args.location.state)}|${normalize(args.location.localGovernment)}`;

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
      openRolesCount: args.positions.length,
      canonicalKey,
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
