import { Routes } from "@/constants/routes";
import { useSignUpStore } from "@/store/sing-up.store";
import { usePathname, useRouter } from "next/navigation";
import { useEffect } from "react";

const MAX_STEPS = 6;
export const PAGE_SLUG_MAP = {
  welcome: 0,
  "basic-details": 1,
  "organization-details": 2,
  "organization-address": 3,
  "choose-plan": 4,
  "choose-departments": 5,
  "email-verification": 6,
};

export const PAGE_SLUG_MAP_REVERSED = Object.keys(PAGE_SLUG_MAP).map(
  (slug) => slug,
);

export const useSignUpSteps = () => {
  const router = useRouter();
  const pathname = usePathname();

  const {
    page,
    setPage,
    maxSteps,
    nextPage: storeNextPage,
    goToPage: storeGoToPage,
  } = useSignUpStore();

  const currentSlug = Object.keys(PAGE_SLUG_MAP)[page];

  useEffect(() => {
    const path = `/${Routes.sign_up}/${currentSlug}`;
    if (pathname != path) {
      // router.push(path);
    }
  }, [currentSlug, page, router]);

  const nextPage = () => {
    console.log("next page");
    if (page <= MAX_STEPS) {
      storeNextPage();
    }
  };

  const goToPageSlug = (slug: keyof typeof PAGE_SLUG_MAP) => {
    if (page !== PAGE_SLUG_MAP[slug]) {
      storeGoToPage(PAGE_SLUG_MAP[slug] || 0);
    }
  };

  const prevPage = () => {
    console.log(page);
    if (page >= 0) {
      storeGoToPage(page - 1);
    }
  };

  const goToPage = (pageNumber: number) => {
    if (pageNumber >= 0 && pageNumber <= MAX_STEPS) {
      storeGoToPage(pageNumber);
    }
  };

  return {
    page,
    setPage,
    maxSteps,
    nextPage,
    prevPage,
    goToPageSlug,
    goToPage,
    isFirstPage: page === 0,
    isLastPage: page === MAX_STEPS,
  };
};
