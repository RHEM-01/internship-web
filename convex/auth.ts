import { query } from "./_generated/server";
import { authComponent } from "./betterAuth/auth";

export const getCurrentUser = query({
  args: {},
  handler: async (ctx) => {
    const user = await authComponent.safeGetAuthUser(ctx);
    return user ?? null;
  },
});