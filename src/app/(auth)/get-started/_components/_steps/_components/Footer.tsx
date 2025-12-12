import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Routes } from "@/constants/routes";
import { ArrowLeft, CheckCircle } from "lucide-react";
import { FooterProps } from "../_types";
import { usePage, useTimelineEvents } from "@/store/sing-up.store";
import { getActualUrl } from "../../../_utils/utils";

export const Footer: React.FC<FooterProps> = ({
  currentPage,
  handleBack,
  handleNext,
  renderButtonText,
  isNextDisabled,
}) => {
  const page = usePage();
  const dotDotDotRef = React.useRef<HTMLSpanElement>(null);
  const { domainEvent, seedingDatabaseEvent } = useTimelineEvents();

  React.useEffect(() => {
    let interval: NodeJS.Timeout;

    if (page === 7) {
      let dotCount = 0;
      interval = setInterval(() => {
        dotCount = (dotCount + 1) % 4;
        if (dotDotDotRef.current) {
          dotDotDotRef.current.textContent = ".".repeat(dotCount);
        }
      }, 500);
    }

    return () => {
      if (interval) {
        clearInterval(interval);
      }
    };
  });

  return (
    <div className="border-t fixed bottom-0 inset-x-0 z-50 bg-background px-20 py-3 flex items-center justify-between">
      {page !== 7 ? (
        <>
          <Link
            href={Routes.home}
            className="flex items-center text-primary-950 hover:underline"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Go Back
          </Link>

          <div className="flex items-center gap-4">
            {currentPage > 0 && (
              <Button
                onClick={handleBack}
                variant="outline"
                className="w-[200px]"
              >
                Back
              </Button>
            )}

            <Button
              disabled={isNextDisabled}
              onClick={(e) => {
                try {
                  handleNext(e);
                } catch (err) {
                  console.error(err);
                }
              }}
              className="uppercase tracking-wide px-10 py-6 text-lg w-[200px]"
            >
              {renderButtonText()}
            </Button>
          </div>
        </>
      ) : seedingDatabaseEvent?.pending ? (
        <h1>
          Creating your account<span ref={dotDotDotRef}></span>
        </h1>
      ) : (
        <>
          <h1>
            <CheckCircle className="w-10 h-10 text-green-500" />
            Your account has been created successfully!{" "}
          </h1>
          <h1>
            <Button
              disabled={isNextDisabled}
              onClick={() => {
                try {
                  window.open(
                    getActualUrl(
                      domainEvent?.data.url || "https://medicinexp.com",
                    ),
                  );
                } catch (err) {
                  console.error(err);
                }
              }}
              className="uppercase tracking-wide px-10 py-6 text-lg w-fit"
            >
              Go to your Admin Panel
            </Button>
          </h1>
        </>
      )}
    </div>
  );
};
