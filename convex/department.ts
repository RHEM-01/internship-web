import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

export const getAll = query({
  handler: async (ctx) => {
    return await ctx.db.query("departments").collect();
  },
});

export const create = mutation({
  args: {
    name: v.string(),
    value: v.string(),
  },
  handler: async (ctx, args) => {
    return await ctx.db.insert("departments", {
      name: args.name,
      value: args.value,
    });
  },
});
