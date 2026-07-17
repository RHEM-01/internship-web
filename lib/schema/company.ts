import { z } from "zod";
import { positionSchema } from "./position";

export const companySchema = z.object({
  logoUrl: z.string().optional(),
  name: z.string().min(1, "Company name is required"),
  industryId: z.string().min(1, "Industry is required"),
  websiteUrl: z.string().url("Must be a valid URL").or(z.literal("")).optional(),
  location: z.object({
    country: z.string().min(1, "Country is required"),
    state: z.string().min(1, "State is required"),
    localGovernment: z.string().min(1, "Local government is required"),
    address: z.string().min(1, "Address is required"),
  }),
  isVerified: z.boolean(),
  description: z.string().max(500, "Max 500 characters").min(1, "Description is required"),
  duration: z.string().min(1, "Duration is required"),
  batchPeriod: z.string().min(1, "Batch period is required"),
  compensation: z.string().min(1, "Compensation is required"),
  certifyChecked: z.boolean().refine((val) => val === true, {
    message: "You must certify before submitting",
  }),
  positions: z.array(positionSchema),
});

export type CompanyFormValues = z.infer<typeof companySchema>;
