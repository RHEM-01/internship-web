import { z } from "zod";

export const suggestionSchema = z.object({
  companyName: z.string().min(1, "Company name is required"),
  websiteUrl: z.string().url("Must be a valid URL").or(z.literal("")).optional(),
  industryId: z.string().min(1, "Industry is required"),
  location: z.object({
    country: z.string().min(1, "Country is required"),
    state: z.string().min(1, "State is required"),
    localGovernment: z.string().min(1, "City is required"),
  }),
  userPhone: z.string().optional().or(z.literal("")),
  companyPhone: z.string().optional().or(z.literal("")),
});

export type SuggestionFormValues = z.infer<typeof suggestionSchema>;
