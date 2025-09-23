"use client"; // This directive is necessary for App Router components

import { useEffect } from "react";
import { PAGE_SLUG_MAP_REVERSED } from "./useSignUpSteps";

const useSyncHashWithPage = (page: number) => {
  useEffect(() => {
    window.location.hash = PAGE_SLUG_MAP_REVERSED[page];
  }, [page]);
};

export default useSyncHashWithPage;
