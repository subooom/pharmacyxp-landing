// _hooks/useServices.ts
import { useCallback } from "react";
import Api from "@/lib/api";
import { AxiosError, AxiosResponse } from "axios";
import { Service } from "../_utils/types";
import { useSignUpStore } from "@/store/sing-up.store";

export function useServices() {
  // 1. Get the state and actions from the store
  const services = useSignUpStore((state) => state.services);
  const { servicesLoading, servicesError, servicesSuccess } = useSignUpStore(
    (state) => state.status,
  );
  const setServices = useSignUpStore((state) => state.setServices);
  const setStatus = useSignUpStore((state) => state.setStatus);

  // 2. Rewrite fetchServices to update the store
  const fetchServices = useCallback(() => {
    setStatus({
      servicesLoading: true,
      servicesError: null,
      servicesSuccess: false,
    });

    Api.get("/services")
      .then((resp: AxiosResponse) => {
        setServices(resp.data[0] as Service[]);
        setStatus({ servicesLoading: false, servicesSuccess: true });
      })
      .catch((err: AxiosError) => {
        setStatus({
          servicesLoading: false,
          servicesError: err.message,
          servicesSuccess: false,
        });
      });
  }, [setServices, setStatus]); // Dependencies are now store actions

  // 3. Return the state from the store and the fetch function
  return {
    services,
    loading: servicesLoading,
    error: servicesError,
    success: servicesSuccess,
    fetchServices,
  };
}
