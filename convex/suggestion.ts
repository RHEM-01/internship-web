import { mutation, query } from "./_generated/server";
import { v, ConvexError } from "convex/values";
import { posthog } from "./posthog";

export const getAll = query({
  args: {},
  handler: async (ctx) => {
    return await ctx.db.query("suggestions").collect();
  },
});

export const create = mutation({
  args: {
    companyName: v.string(),
    websiteUrl: v.optional(v.string()),
    industryId: v.string(),
    location: v.object({
      country: v.string(),
      state: v.string(),
      localGovernment: v.string(),
    }),
    userPhone: v.optional(v.string()),
    companyPhone: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    // Check if company already suggested or verified in the same location
    const suggestionsWithSameName = await ctx.db
      .query("suggestions")
      .filter((q) => q.eq(q.field("companyName"), args.companyName))
      .collect();

    const existingSuggestion = suggestionsWithSameName.find(
      (s) =>
        s.location.state === args.location.state &&
        s.location.localGovernment === args.location.localGovernment
    );

    const companiesWithSameName = await ctx.db
      .query("companies")
      .filter((q) => q.eq(q.field("name"), args.companyName))
      .collect();

    const existingCompany = companiesWithSameName.find(
      (c) =>
        c.location.state === args.location.state &&
        c.location.localGovernment === args.location.localGovernment
    );

    if (existingSuggestion || existingCompany) {
      throw new ConvexError("ALREADY_SUGGESTED");
    }

    const suggestionId = await ctx.db.insert("suggestions", {
      companyName: args.companyName,
      websiteUrl: args.websiteUrl,
      industryId: args.industryId,
      location: args.location,
      userPhone: args.userPhone,
      companyPhone: args.companyPhone,
    });

    await posthog.capture(ctx, {
      distinctId: args.userPhone || "anonymous",
      event: "company_suggestion_created",
      properties: {
        has_website_url: Boolean(args.websiteUrl),
        has_user_phone: Boolean(args.userPhone?.trim()),
        has_company_phone: Boolean(args.companyPhone?.trim()),
        country: args.location.country,
      },
    });

    return suggestionId;
  },
});
