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

export const step2ASchema = z.object({
  // Canonical BI field: businessYears (replaces totalExperience string dropdown)
  businessYears: strictPositiveNumber("Total Work Experience"),

  // Collected as number; NOT a BI scoring input per the authoritative specification
  currentOrgExperience: strictPositiveNumber("Experience in Current Organisation"),

  employerType: z.enum(
    ["Government", "PSU", "Private Limited", "Partnership / Proprietorship", "MNC"],
    {
      required_error: "Please select employer type",
    }
  ),

  designation: z.string().min(2, "Designation is required"),
});
