import { useFormStore } from "../store/useFormStore";

import ProgressBar from "../components/ProgressBar";
import Step1Profile from "./steps/Step1Profile";
import Step2AEmployment from "./steps/Step2AEmployment";
import Step2BBusiness from "./steps/Step2BBusiness";
import Step3CreditBanking from "./steps/Step3CreditBanking";
import Step4Strength from "./steps/Step4Strength";
import Result from "./steps/Result";
import axios from "axios";
import { useEffect } from "react";
import { API_BASE_URL } from "../services/api";
export default function FormContainer() {
  const { step, formData } = useFormStore();



  return (
    <>
    <ProgressBar />

      {/* STEP 1: PROFILE */}
      {step === 1 && <Step1Profile />}

      {/* STEP 2: CONDITIONAL (SALARIED / BUSINESS) */}
      {step === 2 &&
        (formData.applicantType === "Salaried" ? (
          <Step2AEmployment />
        ) : (
          <Step2BBusiness />
        ))}

      {/* STEP 3: CREDIT & BANKING */}
      {step === 3 && <Step3CreditBanking />}

      {/* STEP 4: FINANCIAL STRENGTH */}
      {step === 4 && <Step4Strength />}

      {/* STEP 5: RESULT */}
      {step === 5 && <Result />}
    </>
  );
}
