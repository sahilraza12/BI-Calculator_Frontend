import { useFormStore } from "../store/useFormStore";

const steps = ["Profile", "Employment OR Business", "Credit & Banking", "Financial Strength", "Submit"];

export default function ProgressBar() {
  const { step } = useFormStore();

  return (
    <div className="flex justify-between mb-6">
      {steps.map((label, index) => {
        const stepNum = index + 1;
        return (
          <div key={label} className="flex-1 text-center">
            <div
              className={`h-2 rounded ${
                step >= stepNum ? "bg-blue-600" : "bg-gray-300"
              }`}
            ></div>
            <p className="text-xs mt-1">{label}</p>
          </div>
        );
      })}
    </div>
  );
}
