// import { useForm } from "react-hook-form";
// import { zodResolver } from "@hookform/resolvers/zod";
// import { step1Schema } from "../../validation/step1Schema";
// import { useFormStore } from "../../store/useFormStore";

// export default function Step1Profile() {
//   const { saveData, nextStep, formData } = useFormStore();

//   const {
//     register,
//     handleSubmit,
//     formState: { errors },
//   } = useForm({
//     resolver: zodResolver(step1Schema),
//     mode: "onBlur",
//     defaultValues: {
//       fullName: formData.fullName,
//       age: formData.age,
//       mobile: formData.mobile,
//       email: formData.email,
//       applicantType: formData.applicantType,
//     },
//   });

//   const onSubmit = (data) => {
//     saveData(data); // zustand store me save
//     nextStep();     // next step pe move
//   };

//   return (
//     <form onSubmit={handleSubmit(onSubmit)}>
//       <h2 className="text-xl font-semibold mb-4">
//         Profile
//       </h2>

//       {/* Full Name */}
//       <div className="mb-4">
//         <label className="block mb-1 font-medium">
//           Applicant Name
//         </label>
//         <input
//           type="text"
//           {...register("fullName")}
//           className="w-full border p-2 rounded"
//           placeholder="Enter full name"
//         />
//         {errors.fullName && (
//           <p className="text-red-500 text-sm">
//             {errors.fullName.message}
//           </p>
//         )}
//       </div>

//       {/* Age */}
//       <div className="mb-4">
//         <label className="block mb-1 font-medium">
//           Age
//         </label>
//         <input
//           type="number"
//           min="18"
//           max="75"
//           {...register("age", { valueAsNumber: true })}
//           className="w-full border p-2 rounded"
//           placeholder="18 - 75"
//         />
//         {errors.age && (
//           <p className="text-red-500 text-sm">
//             {errors.age.message}
//           </p>
//         )}
//       </div>

//       {/* Mobile */}
//       <div className="mb-4">
//         <label className="block mb-1 font-medium">
//           Mobile Number
//         </label>
//         <input
//           type="text"
//           maxLength={10}
//           inputMode="numeric"
//           {...register("mobile")}
//           className="w-full border p-2 rounded"
//           placeholder="10 digit mobile number"
//         />
//         {errors.mobile && (
//           <p className="text-red-500 text-sm">
//             {errors.mobile.message}
//           </p>
//         )}
//       </div>

//       {/* Email */}
//       <div className="mb-4">
//         <label className="block mb-1 font-medium">
//           Email ID
//         </label>
//         <input
//           type="email"
//           {...register("email")}
//           className="w-full border p-2 rounded"
//           placeholder="example@email.com"
//         />
//         {errors.email && (
//           <p className="text-red-500 text-sm">
//             {errors.email.message}
//           </p>
//         )}
//       </div>

//       {/* Applicant Type */}
//       <div className="mb-6">
//         <label className="block mb-1 font-medium">
//           Type of Applicant
//         </label>
//         <select
//           {...register("applicantType")}
//           className="w-full border p-2 rounded"
//         >
//           <option value="">Select Applicant Type</option>
//           <option value="Salaried">Salaried</option>
//           <option value="SEP">Self-Employed Professional (SEP)</option>
//           <option value="SENP">Self-Employed Non-Professional (SENP)</option>
//           <option value="Others">Others</option>
//         </select>
//         {errors.applicantType && (
//           <p className="text-red-500 text-sm">
//             {errors.applicantType.message}
//           </p>
//         )}
//       </div>

//       {/* Navigation */}
//       <div className="flex justify-end">
//         <button
//           type="submit"
//           className="px-6 py-2 bg-blue-600 text-white rounded"
//         >
//           Next
//         </button>
//       </div>
//     </form>
//   );
// }

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { step1Schema } from "../../validation/step1Schema";
import { useFormStore } from "../../store/useFormStore";

import { API_BASE_URL } from "../../services/api";

export default function Step1Profile() {
  const { saveData, nextStep, formData } = useFormStore();

  const {
    register,
    handleSubmit,
    setError,
    clearErrors,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(step1Schema),
    mode: "onBlur",
    defaultValues: {
      fullName: formData.fullName || "",
      age: formData.age || "",
      mobile: formData.mobile || "",
      email: formData.email || "",
      applicantType: formData.applicantType || "",
    },
  });

  const onSubmit = async (data) => {
    try {
      clearErrors("email");

      const emailResponse = await fetch(
        `${API_BASE_URL}/api/leads/verify-email?email=${encodeURIComponent(
          data.email,
        )}`,
        {
          method: "GET",
        },
      );

      const emailData = await emailResponse.json();

      console.log(emailData);

      if (!emailResponse.ok) {
        setError("email", {
          type: "manual",
          message: "Unable to verify email right now",
        });
        return;
      }

      if (!emailData.format_valid || !emailData.smtp_check) {
        setError("email", {
          type: "manual",
          message: "Email does not exist",
        });
        return;
      }

      saveData(data);
      nextStep();
    } catch (error) {
      console.log(error);
      setError("email", {
        type: "manual",
        message: `Error: ${error.message || "Failed"}`,
      });
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <h2 className="text-xl font-semibold mb-4">Profile</h2>

      <div className="mb-4">
        <label className="block mb-1 font-medium">Applicant Name</label>
        <input
          type="text"
          {...register("fullName")}
          className="w-full border p-2 rounded"
          placeholder="Enter full name"
        />
        {errors.fullName && (
          <p className="text-red-500 text-sm">{errors.fullName.message}</p>
        )}
      </div>

      <div className="mb-4">
        <label className="block mb-1 font-medium">Age</label>
        <input
          type="number"
          min="18"
          max="75"
          {...register("age", { valueAsNumber: true })}
          className="w-full border p-2 rounded"
          placeholder="18 - 75"
        />
        {errors.age && (
          <p className="text-red-500 text-sm">{errors.age.message}</p>
        )}
      </div>

      <div className="mb-4">
        <label className="block mb-1 font-medium">Mobile Number</label>
        <input
          type="text"
          maxLength={10}
          inputMode="numeric"
          {...register("mobile")}
          className="w-full border p-2 rounded"
          placeholder="10 digit mobile number"
        />
        {errors.mobile && (
          <p className="text-red-500 text-sm">{errors.mobile.message}</p>
        )}
      </div>

      <div className="mb-4">
        <label className="block mb-1 font-medium">Email ID</label>
        <input
          type="email"
          {...register("email")}
          className="w-full border p-2 rounded"
          placeholder="example@email.com"
        />
        {errors.email && (
          <p className="text-red-500 text-sm">{errors.email.message}</p>
        )}
      </div>

      <div className="mb-6">
        <label className="block mb-1 font-medium">Type of Applicant</label>
        <select
          {...register("applicantType")}
          className="w-full border p-2 rounded"
        >
          <option value="">Select Applicant Type</option>
          <option value="Salaried">Salaried</option>
          <option value="SEP">Self-Employed Professional (SEP)</option>
          <option value="SENP">Self-Employed Non-Professional (SENP)</option>
          <option value="Others">Others</option>
        </select>
        {errors.applicantType && (
          <p className="text-red-500 text-sm">{errors.applicantType.message}</p>
        )}
      </div>

      <div className="flex justify-end">
        <button
          type="submit"
          disabled={isSubmitting}
          className={`px-6 py-2 text-white rounded ${
            isSubmitting
              ? "bg-blue-400 cursor-not-allowed"
              : "bg-blue-600 hover:bg-blue-700"
          }`}
        >
          {isSubmitting ? "Checking..." : "Next"}
        </button>
      </div>
    </form>
  );
}