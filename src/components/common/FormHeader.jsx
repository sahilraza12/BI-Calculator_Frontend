import { BarChart3 } from "lucide-react";

export default function FormHeader() {
  return (
    <div className="text-center mb-6">
      <div className="flex items-center justify-center gap-3">
        <div className="bg-blue-100 p-3 rounded-full">
          <BarChart3 className="text-blue-600 w-6 h-6" />
        </div>

        <h1 className="text-2xl font-bold text-gray-800">
          BI Rating Calculator
        </h1>
      </div>

      <p className="text-sm text-gray-500 mt-2">
        Business Intelligence Based Credit Assessment
      </p>

      <div className="mt-4 h-px bg-gray-200"></div>
    </div>
  );
}
