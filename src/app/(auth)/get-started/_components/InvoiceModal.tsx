"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";
import Logo from "@/components/composits/Logo";
import { DialogTrigger } from "@radix-ui/react-dialog";
import { Plan } from "../_utils/types";
import { CouponCode } from "../_steps/EmailConfirmation";

type InvoiceModalProps = {
  today: Date;
  plan?: Plan;
  couponCodeData?: CouponCode;
  open: boolean;
  setOpen: (open: boolean) => void;
  getCurrentServices: () => string | undefined;
};

export function InvoiceModal({
  today,
  plan,
  couponCodeData,
  getCurrentServices,
  open,
  setOpen,
}: InvoiceModalProps) {
  const discount = couponCodeData?.discount_in_percentage
    ? (couponCodeData.discount_in_percentage / 100) *
      (plan?.price_for_first_year || 0)
    : 0;

  const totalToPay = (plan?.price_for_first_year || 0) - discount;

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-lg bg-[#221F51] text-white">
        <DialogHeader>
          <DialogTitle className="flex justify-between items-center">
            <div className="flex items-center space-x-2">
              <Logo />
              <span>Invoice</span>
            </div>
            <span>
              {today.getFullYear()}/{today.getMonth() + 1}/{today.getDate()}
            </span>
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          <h5 className="text-lg font-semibold">
            1. {plan?.name}{" "}
            <small className="text-xs text-gray-300">
              ({getCurrentServices()})
            </small>
          </h5>

          <div className="flex justify-between">
            <p>Amount:</p>
            <p>{plan?.price_for_first_year} NRP</p>
          </div>

          {discount > 0 && (
            <div className="flex justify-between">
              <p>{`CC Discount (${couponCodeData?.discount_in_percentage}%)`}</p>
              <p>-{discount} NRP</p>
            </div>
          )}

          <Separator className="bg-white/20" />

          <div className="flex justify-between font-bold">
            <p>To Pay:</p>
            <p>{totalToPay} NRP</p>
          </div>

          {couponCodeData?.medical_representative && (
            <div className="flex justify-between">
              <p>Referred By:</p>
              <p>{couponCodeData.medical_representative.name}</p>
            </div>
          )}

          <div className="flex justify-between">
            <p>Pay Before:</p>
            <p>
              {today.getFullYear()}/{today.getMonth() + 3}/{today.getDate()}
            </p>
          </div>

          <div>
            <p>Pay To:</p>
            <p className="mt-1">
              Standard Chattered <br />
              medicinexp pvt. ltd. <br />
              45773272999201110
            </p>
          </div>

          <Separator className="bg-white/20" />

          <div className="flex items-center space-x-2 opacity-50">
            <Logo />
            <span>team</span>
          </div>
          <span className="text-sm opacity-50">
            977 9820201112, 01 989002202
          </span>
        </div>
      </DialogContent>
    </Dialog>
  );
}
