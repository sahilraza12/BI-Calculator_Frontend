import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { step2ASchema } from "../../validation/step2ASchema";
import { useFormStore } from "../../store/useFormStore";

export default function Step2AEmployment() {
  const { saveData, nextStep, prevStep, formData } = useFormStore();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(step2ASchema),
    mode: "onBlur",
    defaultValues: {
      businessYears: formData.businessYears ?? undefined,
      currentOrgExperience: formData.currentOrgExperience ?? undefined,
      employerType: formData.employerType,
      designation: formData.designation,
    },
  });

  const onSubmit = (data) => {
    saveData(data);
    nextStep(); // Step 3: Credit & Banking
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <h2 className="text-xl font-semibold mb-4">
        Employment Details (Salaried)
      </h2>

      {/* Total Work Experience */}
      <div className="mb-4">
        <label className="block mb-1 font-medium">
          Total Work Experience (Years)
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

      {/* Experience in Current Organisation */}
      <div className="mb-4">
        <label className="block mb-1 font-medium">
          Experience in Current Organisation (Years)
        </label>
        <input
          type="number"
          step="1"
          min="1"
          {...register("currentOrgExperience", { valueAsNumber: true })}
          className="w-full border p-2 rounded"
          placeholder="e.g. 2"
        />
        {errors.currentOrgExperience && (
          <p className="text-red-500 text-sm">
            {errors.currentOrgExperience.message}
          </p>
        )}
      </div>

      {/* Nature of Employer */}
      <div className="mb-4">
        <label className="block mb-1 font-medium">Nature of Employer</label>
        <select
          {...register("employerType")}
          className="w-full border p-2 rounded"
        >
          <option value="">Select Employer Type</option>
          <option value="Government">Government</option>
          <option value="PSU">PSU</option>
          <option value="Private Limited">Private Limited</option>
          <option value="Partnership / Proprietorship">Partnership / Proprietorship</option>
          <option value="MNC">MNC</option>
        </select>
        {errors.employerType && (
          <p className="text-red-500 text-sm">{errors.employerType.message}</p>
        )}
      </div>

      {/* Designation */}
      <div className="mb-6">
        <label className="block mb-1 font-medium">Designation / Role</label>
        <input
          type="text"
          {...register("designation")}
          className="w-full border p-2 rounded"
          placeholder="e.g. Software Engineer"
        />
        {errors.designation && (
          <p className="text-red-500 text-sm">{errors.designation.message}</p>
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
