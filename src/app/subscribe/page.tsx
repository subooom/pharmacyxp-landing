"use client";
import React, { useState, useEffect } from "react";
import { createClient } from "@supabase/supabase-js";

// Initialize Supabase client
const supabaseUrl = "https://hcubsazgubodryrkwoue.supabase.co";
const supabaseAnonKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImhjdWJzYXpndWJvZHJ5cmt3b3VlIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDIyNzkzMzYsImV4cCI6MjA1Nzg1NTMzNn0.CgQa5fcmtzRvIc4yqgnkHoUR3YtUcdnJ43IVt7_1ESQ";
const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Types
interface Product {
  id: string;
  name: string;
  category: string;
  price: number;
  image?: string;
}

interface Subscription {
  id?: string;
  product_id: string;
  frequency: "weekly" | "bi-weekly" | "monthly";
  next_delivery: string;
  created_at?: string;
}

interface SubscriptionWithProduct extends Subscription {
  product: Product;
}

const SubscriptionApp = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [subscriptions, setSubscriptions] = useState<SubscriptionWithProduct[]>(
    [],
  );
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Load products and subscriptions from Supabase
  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);
      setError(null);

      // Fetch products
      const { data: productsData, error: productsError } = await supabase
        .from("products")
        .select("*")
        .order("name");

      if (productsError) throw productsError;
      setProducts(productsData || []);

      // Fetch subscriptions with product data
      const { data: subscriptionsData, error: subscriptionsError } =
        await supabase.from("subscriptions").select(`
          *,
          product:products (*)
        `);

      if (subscriptionsError) throw subscriptionsError;
      setSubscriptions((subscriptionsData as SubscriptionWithProduct[]) || []);
    } catch (error: any) {
      console.error("Error fetching data:", error);
      setError(error.message || "An error occurred while fetching data");
    } finally {
      setLoading(false);
    }
  };

  const saveSubscription = async (subscription: Subscription) => {
    try {
      setError(null);

      // Check if subscription already exists
      const { data: existingSubs } = await supabase
        .from("subscriptions")
        .select("*")
        .eq("product_id", subscription.product_id)
        .maybeSingle();

      let result;

      if (existingSubs) {
        // Update existing subscription
        result = await supabase
          .from("subscriptions")
          .update({
            frequency: subscription.frequency,
            next_delivery: subscription.next_delivery,
          })
          .eq("product_id", subscription.product_id).select(`
            *,
            product:products (*)
          `);
      } else {
        // Insert new subscription
        result = await supabase.from("subscriptions").insert([subscription])
          .select(`
            *,
            product:products (*)
          `);
      }

      if (result.error) throw result.error;

      // Update local state
      if (result.data && result.data.length > 0) {
        const updatedSubscription = result.data[0] as SubscriptionWithProduct;

        if (existingSubs) {
          // Update existing subscription in state
          setSubscriptions((prev) =>
            prev.map((sub) =>
              sub.product_id === subscription.product_id
                ? updatedSubscription
                : sub,
            ),
          );
        } else {
          // Add new subscription to state
          setSubscriptions((prev) => [...prev, updatedSubscription]);
        }
      }
    } catch (error: any) {
      console.error("Error saving subscription:", error);
      setError(
        error.message || "An error occurred while saving the subscription",
      );
    }
  };

  const calculateNextDelivery = (frequency: string): string => {
    const today = new Date();
    const result = new Date();

    switch (frequency) {
      case "weekly":
        result.setDate(today.getDate() + 7);
        break;
      case "bi-weekly":
        result.setDate(today.getDate() + 14);
        break;
      case "monthly":
        result.setMonth(today.getMonth() + 1);
        break;
      default:
        result.setDate(today.getDate() + 7);
    }

    return result.toISOString().split("T")[0];
  };

  const handleFrequencyChange = (
    productId: string,
    frequency: "weekly" | "bi-weekly" | "monthly",
  ) => {
    if (!frequency) {
      // If no frequency selected, remove subscription
      removeSubscription(productId);
      return;
    }

    const nextDelivery = calculateNextDelivery(frequency);

    const subscription: Subscription = {
      product_id: productId,
      frequency,
      next_delivery: nextDelivery,
    };

    saveSubscription(subscription);
  };

  const removeSubscription = async (productId: string) => {
    try {
      setError(null);

      const { error } = await supabase
        .from("subscriptions")
        .delete()
        .eq("product_id", productId);

      if (error) throw error;

      // Update local state
      setSubscriptions((prev) =>
        prev.filter((sub) => sub.product_id !== productId),
      );
    } catch (error: any) {
      console.error("Error removing subscription:", error);
      setError(
        error.message || "An error occurred while removing the subscription",
      );
    }
  };

  const handleDeliverNow = (productId: string) => {
    const subscription = subscriptions.find(
      (sub) => sub.product_id === productId,
    );
    const frequency = subscription?.frequency || "weekly";

    // Set next delivery to today
    const today = new Date().toISOString().split("T")[0];

    const updatedSubscription: Subscription = {
      product_id: productId,
      frequency,
      next_delivery: today,
    };

    saveSubscription(updatedSubscription);
  };

  const formatDate = (dateString: string): string => {
    const options: Intl.DateTimeFormatOptions = {
      year: "numeric",
      month: "short",
      day: "numeric",
    };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  const getFrequencyText = (frequency: string) => {
    switch (frequency) {
      case "weekly":
        return "Every week";
      case "bi-weekly":
        return "Every 2 weeks";
      case "monthly":
        return "Every month";
      default:
        return frequency;
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-lg">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-2">
          Household Essentials Subscription
        </h1>
        <p className="text-center text-gray-600 mb-8">
          Get your household essentials delivered regularly in Kathmandu
        </p>

        {error && (
          <div className="bg-red-100 border destructive destructive px-4 py-3 rounded mb-6">
            {error}
          </div>
        )}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">
            Your Subscriptions
          </h2>

          {subscriptions.length === 0 ? (
            <p className="text-gray-600">
              You don't have any active subscriptions yet.
            </p>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Product
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Frequency
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Next Delivery
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {subscriptions.map((subscription) => (
                    <tr key={subscription.product_id}>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">
                          {subscription.product.name}
                        </div>
                        <div className="text-sm text-gray-500">
                          {subscription.product.category}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {getFrequencyText(subscription.frequency)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {formatDate(subscription.next_delivery)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <button
                          onClick={() =>
                            removeSubscription(subscription.product_id)
                          }
                          className="destructive hover:destructive"
                        >
                          Remove
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
        <h2 className="text-black text-xl font-bold mb-4">Our Listings</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          {products.map((product) => {
            const subscription = subscriptions.find(
              (sub) => sub.product_id === product.id,
            );

            return (
              <div
                key={product.id}
                className="bg-white rounded-lg shadow-md p-6"
              >
                <h2 className="text-xl font-semibold text-gray-800 mb-2">
                  {product.name}
                </h2>
                <p className="text-gray-600 mb-4">{product.category}</p>
                <p className="text-gray-800 font-medium mb-4">
                  Rs. {product.price}
                </p>

                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Delivery Frequency
                  </label>
                  <select
                    className="w-full p-2 border border-gray-300 rounded-md"
                    value={subscription?.frequency || ""}
                    onChange={(e) =>
                      handleFrequencyChange(
                        product.id,
                        e.target.value as "weekly" | "bi-weekly" | "monthly",
                      )
                    }
                  >
                    <option value="">Not subscribed</option>
                    <option value="weekly">Weekly</option>
                    <option value="bi-weekly">Bi-weekly</option>
                    <option value="monthly">Monthly</option>
                  </select>
                </div>

                {subscription && (
                  <div className="mb-4">
                    <p className="text-sm text-gray-600">
                      Next delivery:{" "}
                      <span className="font-medium">
                        {formatDate(subscription.next_delivery)}
                      </span>
                    </p>
                  </div>
                )}

                <button
                  className={`w-full py-2 px-4 rounded-md transition-colors ${
                    subscription
                      ? "bg-blue-600 text-white hover:bg-blue-700"
                      : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                  }`}
                  onClick={() => handleDeliverNow(product.id)}
                >
                  {subscription ? "Deliver Now" : "One-Time Delivery"}
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default SubscriptionApp;
