import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { step2BSchema } from "../../validation/step2BSchema";
import { useFormStore } from "../../store/useFormStore";

export default function Step2BBusiness() {
  const { saveData, nextStep, prevStep, formData } = useFormStore();

  const {
    register,
    handleSubmit,
    watch,
    setError,
    formState: { errors },


  } = useForm({
    resolver: zodResolver(step2BSchema),
    mode: "onBlur",
    defaultValues: {
      businessYears: formData.businessYears ?? undefined,
      gstRegistered: formData.gstRegistered ?? "",
      gstVintage: formData.gstVintage ?? undefined,
      turnoverTrend: formData.turnoverTrend ?? "",
      profitTrend: formData.profitTrend ?? "",
      capitalTrend: formData.capitalTrend ?? "",
    },
  });

  const gstRegistered = watch("gstRegistered");

  const onSubmit = (data) => {
    // Validate gstVintage required if GST = Yes
    if (data.gstRegistered === "Yes" && (data.gstVintage === undefined || data.gstVintage === null)) {
      setError("gstVintage", { message: "Please enter GST Vintage in years" });
      return;
    }

    const submissionData = {
      ...data,
      gstRegistered: data.gstRegistered === "Yes",
    };

    console.log("STEP 2B SUBMIT DATA:", submissionData);
    saveData(submissionData);
    nextStep();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <h2 className="text-xl font-semibold mb-4">Business Details</h2>

      {/* Years of Business Experience */}
      <div className="mb-4">
        <label className="block mb-1 font-medium">
          Years of Business Experience
        </label>
        <input
          type="number"
          step="1"
          min="1"
          {...register("businessYears", { valueAsNumber: true })}
          className="w-full border p-2 rounded"
          placeholder="e.g. 5.5"
        />
        {errors.businessYears && (
          <p className="text-red-500 text-sm">{errors.businessYears.message}</p>
        )}
      </div>

      {/* GST Registered */}
      <div className="mb-4">
        <label className="block mb-1 font-medium">GST Registered?</label>
        <div className="flex gap-4">
          <label className="flex items-center gap-2">
            <input
              type="radio"
              value="Yes"
              {...register("gstRegistered")}
              className="w-4 h-4"
            />
            Yes
          </label>
          <label className="flex items-center gap-2">
            <input
              type="radio"
              value="No"
              {...register("gstRegistered")}
              className="w-4 h-4"
            />
            No
          </label>
        </div>
        {errors.gstRegistered && (
          <p className="text-red-500 text-sm mt-1">
            {errors.gstRegistered.message}
          </p>
        )}
      </div>

      {/* GST Vintage — numeric input, only if GST = Yes */}
      {gstRegistered === "Yes" && (
        <div className="mb-4">
          <label className="block mb-1 font-medium">
            GST Vintage (Years)
          </label>
          <input
            type="number"
            step="1"
            min="0"
            {...register("gstVintage", { valueAsNumber: true })}
            className="w-full border p-2 rounded"
            placeholder="e.g. 3.5"
          />
          {errors.gstVintage && (
            <p className="text-red-500 text-sm">{errors.gstVintage.message}</p>
          )}
        </div>
      )}

      {/* Turnover Trend */}
      <div className="mb-4">
        <label className="block mb-1 font-medium">
          Turnover Trend (Last 2–3 Years)
        </label>
        <select
          {...register("turnoverTrend")}
          className="w-full border p-2 rounded"
        >
          <option value="">Select</option>
          <option value="Positive">Positive</option>
          <option value="Flat">Flat</option>
          <option value="Negative">Negative</option>
        </select>
        {errors.turnoverTrend && (
          <p className="text-red-500 text-sm">{errors.turnoverTrend.message}</p>
        )}
      </div>

      {/* Profit Trend */}
      <div className="mb-4">
        <label className="block mb-1 font-medium">
          Profit Trend (Last 2–3 Years)
        </label>
        <select
          {...register("profitTrend")}
          className="w-full border p-2 rounded"
        >
          <option value="">Select</option>
          <option value="Positive">Positive</option>
          <option value="Flat">Flat</option>
          <option value="Negative">Negative</option>
        </select>
        {errors.profitTrend && (
          <p className="text-red-500 text-sm">{errors.profitTrend.message}</p>
        )}
      </div>

      {/* Capital / Net Worth Trend */}
      <div className="mb-6">
        <label className="block mb-1 font-medium">
          Capital / Net Worth Trend
        </label>
        <select
          {...register("capitalTrend")}
          className="w-full border p-2 rounded"
        >
          <option value="">Select</option>
          <option value="Positive">Positive</option>
          <option value="Flat">Flat</option>
          <option value="Negative">Negative</option>
        </select>
        {errors.capitalTrend && (
          <p className="text-red-500 text-sm">{errors.capitalTrend.message}</p>
        )}
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