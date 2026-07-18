import { query } from "./_generated/server";
import { createClient } from "@convex-dev/better-auth";
import { components } from "./_generated/api";
import type { DataModel } from "./_generated/dataModel";

export const authComponent = createClient<DataModel>(
  components.betterAuth
);

export const getCurrentUser = query({
  args: {},
  handler: async (ctx) => {
    const user = await authComponent.safeGetAuthUser(ctx);
    return user ?? null;
  },
});