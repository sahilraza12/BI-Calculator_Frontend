import { z } from "zod";

// Strict numeric preprocessor: rejects "" → does NOT coerce to 0
const strictPositiveNumber = (fieldName) =>
  z.preprocess(
    (val) => {
      if (val === "" || val === null || val === undefined) return undefined;
      const n = Number(val);
      return isNaN(n) ? undefined : n;
    },
    z
      .number({
        required_error: `${fieldName} is required`,
        invalid_type_error: `${fieldName} must be a number`,
      })
      .int(`${fieldName} must be a whole number`)
      .min(1, `${fieldName} must be at least 1 year`)
  );

export const step2BSchema = z.object({
  // Canonical BI field: businessYears (replaces businessExperience string dropdown)
  businessYears: strictPositiveNumber("Years of Business Experience"),

  gstRegistered: z.enum(["Yes", "No"], {
    required_error: "Please select GST Registration status",
  }),

  // Numeric vintage — only required when gstRegistered = "Yes"
  // Conditional required handled in component; schema allows optional here
  gstVintage: z.preprocess(
    (val) => {
      if (val === "" || val === null || val === undefined) return undefined;
      const n = Number(val);
      return isNaN(n) ? undefined : n;
    },
    z.number({ invalid_type_error: "GST Vintage must be a number" }).min(0, "GST Vintage cannot be negative").optional()
  ),

  turnoverTrend: z.enum(
    [
      "Strongly Increasing",
      "Increasing",
      "Stable",
      "Declining",
      "Severely Declining",
    ],
    {
      required_error: "Please select turnover trend",
    }
  ),

  profitTrend: z.enum(
    [
      "Strongly Increasing",
      "Increasing",
      "Stable",
      "Declining",
      "Loss / Deteriorating",
    ],
    {
      required_error: "Please select profit trend",
    }
  ),

  capitalTrend: z.enum(
    [
      "Strongly Increasing",
      "Increasing",
      "Stable",
      "Declining",
      "Significantly Declining",
    ],
    {
      required_error: "Please select capital trend",
    }
  ),
});