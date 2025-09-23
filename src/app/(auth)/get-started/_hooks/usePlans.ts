import { useCallback } from "react";
import Api from "@/lib/api";
import { useSignUpStore } from "@/store/sing-up.store";

export function usePlans() {
  const { setPlans, setStatus } = useSignUpStore();

  const fetchPlans = useCallback(() => {
    setStatus({ plansLoading: true, plansError: null });
    Api.get("/plans")
      .then((resp) => {
        setPlans(resp.data[0] || []);

        setStatus({ plansLoading: false, plansSuccess: true });
      })
      .catch((err) => {
        setStatus({
          plansLoading: false,
          plansError: (err as Error).message,
        });
      });
  }, [setPlans, setStatus]);

  // Return data and status from the store
  const plans = useSignUpStore((state) => state.plans);
  const { plansLoading, plansError, plansSuccess } = useSignUpStore(
    (state) => state.status,
  );

  return {
    plans,
    loading: plansLoading,
    error: plansError,
    success: plansSuccess,
    fetchPlans,
  };
}
