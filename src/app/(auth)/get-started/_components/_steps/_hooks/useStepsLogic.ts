import { useSignUpStore } from "@/store/sing-up.store";

interface UseStepsLogicProps {
  currentPage: number;
  onPageChange: (page: number) => void;
}

export const useStepsLogic = ({
  currentPage,
  onPageChange,
}: UseStepsLogicProps) => {
  const {
    formData: { plan_id },
    isEmailVerified,
    page,
  } = useSignUpStore();

  const handleBack = () => {
    const prev = currentPage - 1;
    if (plan_id == 1 && currentPage == 6) {
      onPageChange(prev - 1);
    } else {
      onPageChange(prev);
    }
  };

  const isNextDisabled = page === 6 && !isEmailVerified;

  return {
    handleBack,
    isNextDisabled,
  };
};
