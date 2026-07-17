# PostHog post-wizard report

PostHog is initialized once in the Next.js client instrumentation entry point with environment-based configuration, a local reverse-proxy path, and exception capture. The duplicate browser initialization was removed from the Convex client wrapper. Existing client events for listing opens, application intent, and suggestion submission were retained. A server-side `company_suggestion_created` event now records successful persisted suggestions with non-PII metadata. The production build and scoped lint both completed successfully.

| Event name | Description | File |
| --- | --- | --- |
| `company_listing_opened` | Tracks when a visitor opens a company listing from the internship directory. | `components/web/home/CompanyCard.tsx` |
| `internship_application_started` | Tracks when a visitor starts an internship application from a company listing. | `components/web/company/ApplyButton.tsx` |
| `company_suggestion_submitted` | Tracks successful company-suggestion submissions with non-PII completion metadata. | `app/(public)/suggest/page.tsx` |
| `company_suggestion_submission_failed` | Tracks failed company-suggestion submissions. | `app/(public)/suggest/page.tsx` |
| `company_suggestion_created` | Records a successfully persisted company suggestion from the server-side mutation. | `convex/suggestion.ts` |

## Next steps

A dashboard has been created for the new instrumentation:

- [Analytics basics (wizard)](https://us.posthog.com/project/515819/dashboard/1865139)

The new custom event has not yet arrived in the project event schema, so no event-based insights were created. Trigger the instrumented flows, then add trends and conversion insights from the captured events.

## Verify before merging

- [ ] Run a full production build (the wizard only verified the files it touched) and fix any lint or type errors introduced by the generated code.
- [ ] Run the test suite — call sites that were rewritten or instrumented may need updated mocks or fixtures.
- [ ] Add the exact PostHog env var names added to `.env.local` to `.env.example` and any monorepo/bootstrap scripts so collaborators know what to set.
- [ ] Wire source-map upload (`posthog-cli sourcemap` or your bundler's upload step) into CI so production stack traces de-minify.

### Agent skill

The installed agent skill is available under `.claude/skills/integration-nextjs-app-router` for further PostHog-aware development.
