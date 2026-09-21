import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { step4Schema } from "../../validation/step4Schema";
import { useFormStore } from "../../store/useFormStore";

export default function Step4Loan() {
  const { saveData, nextStep, prevStep, formData } = useFormStore();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(step4Schema),
    mode: "onBlur",
    defaultValues: {
      runningLoans: formData.runningLoans ?? "",
      closedLoans: formData.closedLoans ?? "",
      bounces12: formData.bounces12 ?? "",
      bounces6: formData.bounces6 ?? "",
    },
  });

  const onSubmit = (data) => {
    // ⚠️ No logical checks as per document
    saveData(data);
    nextStep();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <h2 className="text-xl font-semibold mb-4">
        Loan Exposure & Banking Behaviour
      </h2>

      {/* Running Loans */}
      <InputField
        label="Running Loans Count"
        register={register("runningLoans", { valueAsNumber: true })}
        error={errors.runningLoans}
      />

      {/* Closed Loans */}
      <InputField
        label="Closed Loans Count"
        register={register("closedLoans", { valueAsNumber: true })}
        error={errors.closedLoans}
      />

      {/* Bounces 12 Months */}
      <InputField
        label="Cheque / EMI Bounces (Last 12 Months)"
        register={register("bounces12", { valueAsNumber: true })}
        error={errors.bounces12}
      />

      {/* Bounces 6 Months */}
      <InputField
        label="Cheque / EMI Bounces (Last 6 Months)"
        register={register("bounces6", { valueAsNumber: true })}
        error={errors.bounces6}
      />

      {/* Navigation */}
      <div className="flex justify-between mt-6">
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

/* 🔁 Reusable Input Component */
function InputField({ label, register, error }) {
  return (
    <div className="mb-4">
      <label className="block mb-1">{label}</label>
      <input
        type="number"
        min="0"
        step="1"
        className="w-full border p-2 rounded"
        {...register}
      />
      {error && (
        <p className="text-red-500 text-sm">
          {error.message}
        </p>
      )}
    </div>
  );
}