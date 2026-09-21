import { Controller } from "react-hook-form";

export default function RadioGroup({ label, name, control, error }) {
  return (
    <div className="mb-4">
      <p className="mb-1 font-medium">{label}</p>

      <Controller
        name={name}
        control={control}
        rules={{ required: true }}
        render={({ field }) => (
          <div className="flex gap-6">
            <label className="flex items-center gap-2">
              <input
                type="radio"
                checked={field.value === true}
                onChange={() => field.onChange(true)}
              />
              Yes
            </label>

            <label className="flex items-center gap-2">
              <input
                type="radio"
                checked={field.value === false}
                onChange={() => field.onChange(false)}
              />
              No
            </label>
          </div>
        )}
      />

      {error && (
        <p className="text-red-500 text-sm mt-1">
          {error.message}
        </p>
      )}
    </div>
  );
}
