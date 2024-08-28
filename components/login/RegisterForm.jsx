"use client";
import StepFour from "@/components/register/StepFour";
import StepOne from "@/components/register/StepOne";
import StepThree from "@/components/register/StepThree";
import StepTwo from "@/components/register/StepTwo";
import { useSearchParams } from "next/navigation";
import { Fragment, useEffect, useState } from "react";
import { useSelector } from "react-redux";

const RegisterForm = () => {
  const [activeStep, setActiveStep] = useState(1);
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const searchParams = useSearchParams();
  const { isAuthenticated } = useSelector((state) => state.auth);

  useEffect(() => {
    const step = searchParams.get("step");
    if (step && isAuthenticated) {
      setActiveStep(parseInt(4));
    } else {
      setActiveStep(1);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const renderStep = (step) => {
    return (
      <Fragment key={step}>
        <h4
          className={`${
            activeStep <= 4 && activeStep >= step ? "bg-primary text-white" : "bg-white text-black"
          } w-11 h-11 rounded-full flex justify-center items-center text-xl font-bold`}
        >
          {step}
        </h4>
        {step < 4 && (
          <div
            className={`${
              activeStep <= 4 && activeStep > step ? "bg-primary" : "bg-white"
            } h-1 w-16`}
          />
        )}
      </Fragment>
    );
  };

  return (
    <div className="container px-4 mx-auto mt-2 mb-3">
      <div className="flex justify-center items-center z-100 mb-12">
        {[1, 2, 3, 4].map((step) => renderStep(step))}
      </div>

      {activeStep === 1 && (
        <StepOne setActiveStep={setActiveStep} email={email} setEmail={setEmail} />
      )}
      {activeStep === 2 && (
        <StepTwo setActiveStep={setActiveStep} email={email} otp={otp} setOtp={setOtp} />
      )}
      {activeStep === 3 && <StepThree setActiveStep={setActiveStep} email={email} otp={otp} />}
      {activeStep === 4 && <StepFour setActiveStep={setActiveStep} />}
    </div>
  );
};

export default RegisterForm;
