import Api from "@/lib/api";
import { CouponCode } from "../_steps/6EmailConfirmation";
import { useSignUpStore } from "@/store/sing-up.store";

export function useCoupon() {
  const { couponData, setCouponData, setStatus, status } = useSignUpStore();

  const { couponLoading, couponError, couponSuccess } = status;

  const verifyCoupon = (code: string) => {
    setStatus({ couponLoading: true, couponError: "" });

    // MR codes are 4–12 characters: letters, numbers and dashes (e.g. SAR-52)
    if (!/^[A-Za-z0-9-]{4,12}$/.test(code)) {
      setStatus({
        couponError: "Codes are 4 to 12 letters, numbers or dashes.",
        couponLoading: false,
      });
      setCouponData(undefined);
      return;
    }

    Api.get(`/verify-coupon-code/${encodeURIComponent(code.toUpperCase())}`)
      .then((resp) => {
        if (Object.keys(resp.data || {}).length === 0) {
          setStatus({
            couponError: "Not a Valid Coupon Code.",
            couponSuccess: false,
            couponLoading: false,
          });
        } else {
          setStatus({
            couponError: "",
            couponSuccess: true,
            couponLoading: false,
          });
          setCouponData(resp.data as CouponCode);
        }
      })
      .catch((err) => {
        setStatus({
          couponError: err.message,
          couponSuccess: false,
          couponLoading: false,
        });
      });
  };

  return {
    couponData,
    loading: couponLoading,
    success: couponSuccess,
    error: couponError,
    verifyCoupon,
  };
}
