import { mutation, query } from "./_generated/server";
import { v } from "convex/values";
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
    websiteUrl: v.string(),
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
    const suggestionId = await ctx.db.insert("suggestions", {
      companyName: args.companyName,
      websiteUrl: args.websiteUrl,
      industryId: args.industryId,
      location: args.location,
      userPhone: args.userPhone,
      companyPhone: args.companyPhone,
    });

    await posthog.capture(ctx, {
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
