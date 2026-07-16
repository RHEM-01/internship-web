import { z } from "zod";

export const positionSchema = z.object({
  title: z.string().min(1, "Title is required"),
  departmentId: z.string().min(1, "Department is required"),
  employmentType: z.string().min(1, "Employment type is required"),
  durationValue: z.number().min(1, "Duration is required"),
  durationUnit: z.string().min(1, "Duration unit is required"),
  locationType: z.array(z.string()).min(1, "Location type is required"),
  currency: z.string().min(1, "Currency is required"),
  stipend: z.number().min(0, "Stipend must be valid"),
  daysPerWeek: z.string().min(1, "Days per week is required"),
  startTime: z.string().min(1, "Start time is required"),
  endTime: z.string().min(1, "End time is required"),
  requirements: z.array(z.string()),
});

export type PositionFormValues = z.infer<typeof positionSchema>;
