import { z } from "zod";

export const step4Schema = z.object({
  totalAssets: z
    .number({
      required_error: "Total assets is required",
      invalid_type_error: "Enter a valid number",
    })
    .min(1, "Value must be greater than zero"),

  totalOutstandingLoans: z
    .number({
      required_error: "Total outstanding loans is required",
      invalid_type_error: "Enter a valid number",
    })
    .min(0, "Value cannot be negative"),
});
