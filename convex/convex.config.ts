// convex/convex.config.ts
import { defineApp } from "convex/server";
import { v } from "convex/values";
import betterAuth from "./betterAuth/convex.config";
import posthog from "@posthog/convex/convex.config.js";

const app = defineApp({
  env: {
    // Required. PostHog project token (`phc_…`) — used to send events and evaluate flags remotely.
    POSTHOG_PROJECT_TOKEN: v.string(),
    // Optional. PostHog host. Defaults to `https://us.i.posthog.com`; use `https://eu.i.posthog.com` for EU Cloud or your self-hosted URL.
    POSTHOG_HOST: v.optional(v.string()),
    // Optional. A feature flags secure API key (`phs_…`, recommended) or personal API key (`phx_…`). Setting it enables local feature flag evaluation.
    POSTHOG_PERSONAL_API_KEY: v.optional(v.string()),
    // Optional. Cron interval (seconds) for refreshing flag definitions. Defaults to 60. Raise it on free-tier dev deployments to reduce function-call usage.
    POSTHOG_FLAGS_POLLING_INTERVAL_SECONDS: v.optional(v.string()),
  },
});

app.use(posthog, {
  env: {
    POSTHOG_PROJECT_TOKEN: app.env.POSTHOG_PROJECT_TOKEN,
    POSTHOG_HOST: app.env.POSTHOG_HOST,
    POSTHOG_PERSONAL_API_KEY: app.env.POSTHOG_PERSONAL_API_KEY,
    POSTHOG_FLAGS_POLLING_INTERVAL_SECONDS: app.env.POSTHOG_FLAGS_POLLING_INTERVAL_SECONDS,
  },
});

app.use(betterAuth);

export default app;