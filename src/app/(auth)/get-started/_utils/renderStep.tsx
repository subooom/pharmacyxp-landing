// /signup/renderStep.tsx
import React from "react";
import WelcomeScreen from "../_steps/0WelcomeScreen";
import BasicDetails from "../_steps/1BasicDetails";
import OrganizationDetails from "../_steps/2OrganizationDetails";
import OrganizationAddress from "../_steps/3OrganizationAddress";
import ChooseYourPlan from "../_steps/4ChooseYourPlan";
import ChooseYourDepartments from "../_steps/5ChooseMedicalDepartments";
import EmailConfirmation from "../_steps/6EmailConfirmation";
import ThankYou from "../_steps/7ThankYouScreen";

const renderStep = (page: number) => {
  switch (page) {
    case 0:
      return <WelcomeScreen />;
    case 1:
      return <BasicDetails />;
    case 2:
      return <OrganizationDetails />;
    case 3:
      return <OrganizationAddress />;
    case 4:
      return <ChooseYourPlan />;
    case 5:
      return <ChooseYourDepartments />;
    case 6:
      return <EmailConfirmation />;
    case 7:
      return <ThankYou />;
    default:
      return null;
  }
};
export default renderStep;
