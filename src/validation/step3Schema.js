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

  avgBankBalance: z
    .string()
    .min(1, "Please select average bank balance")
    .refine(
      (value) =>
        [
          "Below ₹50,000",
          "₹1–2 lakh",
          "₹50,000–₹1 lakh",
          "₹2–5 lakh",
          "More than ₹5 lakh",
        ].includes(value),
      "Please select a valid average bank balance"
    ),

});
