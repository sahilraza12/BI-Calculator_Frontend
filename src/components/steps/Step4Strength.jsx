import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { step4Schema } from "../../validation/step4Schema";
import { useFormStore } from "../../store/useFormStore";

export default function Step4Strength() {
  const { saveData, nextStep, prevStep, formData } = useFormStore();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(step4Schema),
    mode: "onBlur",
    defaultValues: {
      totalAssets: formData.totalAssets,
      totalOutstandingLoans: formData.totalOutstandingLoans,
      declaration: false,
    },
  });

  const totalAssets = watch("totalAssets");
  const totalOutstandingLoans = watch("totalOutstandingLoans");

  // ✅ AUTO CALCULATION
  const ratio =
    totalAssets && totalOutstandingLoans
      ? (totalAssets / totalOutstandingLoans).toFixed(2)
      : null;

  const onSubmit = (data) => {
    saveData(data);
    nextStep(); // Step 5: Result
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <h2 className="text-xl font-semibold mb-4">
        Financial Strength
      </h2>

      {/* Total Assets */}
      <div className="mb-4">
        <label className="block mb-1 font-medium">
          Total Assets (₹)
        </label>
        <input
          type="number"
          min="0"
          {...register("totalAssets", { valueAsNumber: true })}
          className="w-full border p-2 rounded"
          placeholder="e.g. 5000000"
        />
        <p className="text-xs text-gray-500 mt-1">
          Total value of all assets like property, business assets,
          investments, etc.
        </p>
        {errors.totalAssets && (
          <p className="text-red-500 text-sm">
            {errors.totalAssets.message}
          </p>
        )}
      </div>

      {/* Total Outstanding Loans */}
      <div className="mb-4">
        <label className="block mb-1 font-medium">
          Total Outstanding Loans (₹)
        </label>
        <input
          type="number"
          min="0"
          {...register("totalOutstandingLoans", {
            valueAsNumber: true,
          })}
          className="w-full border p-2 rounded"
          placeholder="e.g. 2000000"
        />
        <p className="text-xs text-gray-500 mt-1">
          Total outstanding of all loans as on date
        </p>
        {errors.totalOutstandingLoans && (
          <p className="text-red-500 text-sm">
            {errors.totalOutstandingLoans.message}
          </p>
        )}
      </div>

      {/* Auto Calculated Ratio */}
      <div className="mb-6 bg-gray-50 border rounded p-3">
        <p className="font-medium">
          Asset Coverage Ratio
        </p>
        <p className="text-sm text-gray-600 mt-1">
          Formula: Total Assets ÷ Total Outstanding Loans
        </p>

        <p className="mt-2 text-lg font-semibold text-blue-700">
          {ratio ? ratio : "--"}
        </p>

        <p className="text-xs text-gray-500 mt-2">
          A higher ratio indicates stronger financial position and
          better bank eligibility.
        </p>
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
          className="px-4 py-2 bg-blue-600 text-white rounded shadow hover:bg-blue-700 transition"
        >
          Proceed to Submission
        </button>
      </div>
    </form>
  );
}
