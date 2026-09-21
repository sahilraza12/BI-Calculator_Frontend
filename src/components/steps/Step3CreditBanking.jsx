import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { step3Schema } from "../../validation/step3Schema";
import { useFormStore } from "../../store/useFormStore";

export default function Step3CreditBanking() {
  const { saveData, nextStep, prevStep, formData } = useFormStore();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(step3Schema),
    mode: "onBlur",
    defaultValues: {
      cibilScore: formData.cibilScore ?? "",
      runningLoans: formData.runningLoans ?? "",
      closedLoans: formData.closedLoans ?? "",
      bounces6Months: formData.bounces6Months ?? "",
      bounces3Months: formData.bounces3Months ?? "",
      avgBankBalance: formData.avgBankBalance ?? "",
      bankingConduct: formData.bankingConduct ?? "",
      emiDiscipline: formData.emiDiscipline ?? "",
    },
  });

  const onSubmit = (data) => {
    saveData(data);
    nextStep();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <h2 className="text-xl font-semibold mb-4">
        Credit & Banking Behaviour
      </h2>

      {/* CIBIL Score */}
      <div className="mb-4">
        <label className="block mb-1 font-medium">
          CIBIL Score
        </label>
        <select
          {...register("cibilScore")}
          className="w-full border p-2 rounded"
        >
          <option value="">Select</option>
          <option value="-1">-1</option>
          {Array.from({ length: 61 }, (_, i) => 300 + i * 10).map(
            (score) => (
              <option key={score} value={score}>
                {score}
              </option>
            )
          )}
        </select>
        {errors.cibilScore && (
          <p className="text-red-500 text-sm">
            {errors.cibilScore.message}
          </p>
        )}
      </div>

      {/* Running Loans */}
      <div className="mb-4">
        <label className="block mb-1 font-medium">
          Number of Running Loans
        </label>
        <input
          type="number"
          min="0"
          {...register("runningLoans", { valueAsNumber: true })}
          className="w-full border p-2 rounded"
        />
        {errors.runningLoans && (
          <p className="text-red-500 text-sm">
            {errors.runningLoans.message}
          </p>
        )}
      </div>

      {/* Closed Loans */}
      <div className="mb-4">
        <label className="block mb-1 font-medium">
          Number of Closed Loans (Successfully Repaid)
        </label>
        <input
          type="number"
          min="0"
          {...register("closedLoans", { valueAsNumber: true })}
          className="w-full border p-2 rounded"
        />
        {errors.closedLoans && (
          <p className="text-red-500 text-sm">
            {errors.closedLoans.message}
          </p>
        )}
      </div>

      {/* Bounces – 6 Months */}
      <div className="mb-4">
        <label className="block mb-1 font-medium">
          Cheque / EMI Bounces (Last 6 Months)
        </label>
        <input
          type="number"
          min="0"
          {...register("bounces6Months", { valueAsNumber: true })}
          className="w-full border p-2 rounded"
        />
        {errors.bounces6Months && (
          <p className="text-red-500 text-sm">
            {errors.bounces6Months.message}
          </p>
        )}
      </div>

      {/* Bounces – 3 Months */}
      <div className="mb-4">
        <label className="block mb-1 font-medium">
          Cheque / EMI Bounces (Last 3 Months)
        </label>
        <input
          type="number"
          min="0"
          {...register("bounces3Months", { valueAsNumber: true })}
          className="w-full border p-2 rounded"
        />
        {errors.bounces3Months && (
          <p className="text-red-500 text-sm">
            {errors.bounces3Months.message}
          </p>
        )}
      </div>

      {/* Average Bank Balance */}
      <div className="mb-4">
        <label className="block mb-1 font-medium">
          Estimated Average Bank Balance (Last 6 Months)
        </label>
        <select
          {...register("avgBankBalance")}
          className="w-full border p-2 rounded"
        >
          <option value="">Select Average Bank Balance</option>
          <option value="Below ₹50,000">Below ₹50,000</option>
          <option value="₹50,000–₹1 lakh">₹50,000–₹1 lakh</option>
          <option value="₹1–2 lakh">₹1–2 lakh</option>
          <option value="₹2–5 lakh">₹2–5 lakh</option>
          <option value="More than ₹5 lakh">More than ₹5 lakh</option>
        </select>
        {errors.avgBankBalance && (
          <p className="text-red-500 text-sm">
            {errors.avgBankBalance.message}
          </p>
        )}
      </div>

      {/* Navigation */}
      <div className="mb-4">
        <label className="block mb-1 font-medium">Banking Conduct</label>
        <select {...register("bankingConduct")} className="w-full border p-2 rounded">
          <option value="">Select Banking Conduct</option>
          <option value="Excellent / regular">Excellent / regular</option>
          <option value="Good">Good</option>
          <option value="Satisfactory">Satisfactory</option>
          <option value="Occasional irregularity">Occasional irregularity</option>
          <option value="Frequent irregularity">Frequent irregularity</option>
          <option value="Highly irregular">Highly irregular</option>
        </select>
        {errors.bankingConduct && <p className="text-red-500 text-sm">{errors.bankingConduct.message}</p>}
      </div>

      <div className="mb-6">
        <label className="block mb-1 font-medium">EMI / Banking Discipline</label>
        <select {...register("emiDiscipline")} className="w-full border p-2 rounded">
          <option value="">Select EMI Discipline</option>
          <option value="No bounce + timely servicing">No bounce + timely servicing</option>
          <option value="Minor isolated delay">Minor isolated delay</option>
          <option value="Occasional delays">Occasional delays</option>
          <option value="Repeated delays">Repeated delays</option>
          <option value="Serious irregularity">Serious irregularity</option>
        </select>
        {errors.emiDiscipline && <p className="text-red-500 text-sm">{errors.emiDiscipline.message}</p>}
      </div>

      {/* Navigation */}
      <div className="flex justify-between">
        <button
          type="button"
          onClick={prevStep}
          className="px-4 py-2 bg-gray-300 rounded"
        >
          Back
        </button>

        <button
          type="submit"
          className="px-4 py-2 bg-blue-600 text-white rounded"
        >
          Next
        </button>
      </div>
    </form>
  );
}
