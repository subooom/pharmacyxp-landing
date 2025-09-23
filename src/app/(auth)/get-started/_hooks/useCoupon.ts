import Api from "@/lib/api";
import { CouponCode } from "../_steps/6EmailConfirmation";
import { useSignUpStore } from "@/store/sing-up.store";

export function useCoupon() {
  const { couponData, setCouponData, setStatus, status } = useSignUpStore();

  const { couponLoading, couponError, couponSuccess } = status;

  const verifyCoupon = (code: string) => {
    setStatus({ couponLoading: true, couponError: "" });

    console.log("verifying coupon");
    if (code.length !== 7) {
      setStatus({
        couponError: "Coupon Code must be 7 characters long.",
        couponLoading: false,
      });
      setCouponData(undefined);
      return;
    }

    Api.get(`/verify-coupon-code/${code}`)
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
