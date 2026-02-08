"use client";
import { useState, useEffect } from "react";
import Api from "@/lib/api";

export interface DiscountOffer {
  name: string;
  tagline: string;
  amount: string; // Percentage amount e.g. "50"
  description: string;
  description_line_2: string;
  start_date: string;
  end_date: string;
}

// Simple in-memory cache to prevent multiple requests
let cachedOffer: DiscountOffer | null = null;
let fetchPromise: Promise<DiscountOffer | null> | null = null;
let isFetched = false;

export const useDiscountOffer = () => {
  const [data, setData] = useState<DiscountOffer | null>(cachedOffer);
  const [loading, setLoading] = useState<boolean>(!isFetched);

  useEffect(() => {
    if (isFetched) {
      setLoading(false);
      setData(cachedOffer);
      return;
    }

    if (!fetchPromise) {
      fetchPromise = Api.get("/discount-offers")
        .then((res) => {
          const offer = res.data;
          // Check if offer has required fields to be valid
          if (offer && offer.amount && offer.end_date) {
            cachedOffer = offer;
            return offer;
          }
          return null;
        })
        .catch((err) => {
          console.error("Failed to fetch discount offer", err);
          return null;
        });
    }

    fetchPromise
      .then((offer) => {
        setData(offer);
        isFetched = true;
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  return { data, loading };
};
