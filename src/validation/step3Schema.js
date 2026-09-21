import { z } from "zod";

export const step3Schema = z.object({
  cibilScore: z
    .string()
    .min(1, "Please select CIBIL score"),

  runningLoans: z
    .number()
    .min(0, "Value cannot be negative"),

  closedLoans: z
    .number()
    .min(0, "Value cannot be negative"),

  bounces6Months: z
    .number()
    .min(0, "Value cannot be negative"),

  bounces3Months: z
    .number()
    .min(0, "Value cannot be negative"),

  avgBankBalance: z.enum([
    "Below ₹50,000",
    "₹1–2 lakh",
    "₹50,000–₹1 lakh",
    "₹2–5 lakh",
    "More than ₹5 lakh"
  ], {
    required_error: "Please select average bank balance",
  }),

  bankingConduct: z.enum([
    "Excellent / regular", "Good", "Satisfactory", "Occasional irregularity", "Frequent irregularity", "Highly irregular"
  ], { required_error: "Please select banking conduct" }),

  emiDiscipline: z.enum([
    "No bounce + timely servicing", "Minor isolated delay", "Occasional delays", "Repeated delays", "Serious irregularity"
  ], { required_error: "Please select EMI discipline" }),

});
