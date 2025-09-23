"use client";

import React, { use, useEffect, useState } from "react";
import { initializeApp, getApps } from "firebase/app";
import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  onAuthStateChanged,
  signOut,
} from "firebase/auth";
import { createClient, SupabaseClient } from "@supabase/supabase-js";

// Initialize Firebase (safe to call multiple times in dev)
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

if (!getApps().length) {
  initializeApp(firebaseConfig);
}

const auth = getAuth();
const provider = new GoogleAuthProvider();

// Supabase client (used for updating subscription rows client-side)
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "";
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "";
const supabase: SupabaseClient | null =
  supabaseUrl && supabaseAnonKey
    ? createClient(supabaseUrl, supabaseAnonKey)
    : null;

export default function Page() {
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState<any>(null);
  const [dbUserId, setDbUserId] = useState<string | null>(null);
  const [message, setMessage] = useState<string | null>(null);

  useEffect(() => {
    localStorage.setItem("db_user_id", dbUserId || "");
  }, [dbUserId]);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, async (u) => {
      if (!u) {
        setUser(null);
        setDbUserId(null);
        return;
      }

      setUser(u);

      // Always call the Supabase cloud function to ensure we have the DB user id.
      // The cloud function should create the user if missing and return the DB id.
      try {
        setLoading(true);
        const token = await u.getIdToken(true);

        const payload = {
          uid: u.uid,
          email: u.email,
          name: u.displayName,
        };

        const fnUrl = process.env.NEXT_PUBLIC_SUPABASE_CREATE_USER_FUNCTION_URL;
        console.log("FN URL", { fnUrl });
        if (!fnUrl)
          throw new Error(
            "Missing NEXT_PUBLIC_SUPABASE_CREATE_USER_FUNCTION_URL",
          );

        const res = await fetch(fnUrl, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            // If your Supabase function validates Firebase tokens, pass it here.
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(payload),
        });

        if (!res.ok) {
          const errTxt = await res.text();
          throw new Error(`Supabase function error: ${errTxt}`);
        }

        const data = await res.json();

        // Expecting { id: "..." }
        if (!data?.id)
          throw new Error("Invalid response from supabase function");

        setDbUserId(data.id);
        localStorage.setItem("db_user_id", data.id);
        setMessage("Linked to Supabase user id: " + data.id);

        // Attempt to patch existing subscriptions where user_id is null.
        // We'll try common email column names. This is best-effort: adjust to your schema.
        if (supabase) {
          const email = u.email;
          if (email) {
            // Try updating subscriptions where email column matches.
            // We attempt multiple column names — adapt these to your schema.
            const possibleEmailCols = [
              "email",
              "user_email",
              "customer_email",
              "subscriber_email",
            ];

            for (const col of possibleEmailCols) {
              try {
                const updateResp = await supabase
                  .from("subscription")
                  .update({ user_id: data.id })
                  .is(col, email) // This won't work — placeholder. We'll use filter via eq below.
                  .eq(col, email);

                if (updateResp.error) {
                  // ignore and continue trying other columns
                  // console.warn("Update attempt error for col", col, updateResp.error);
                } else {
                  // If rows were updated, inform user and break.
                  const count =
                    (updateResp.count ?? updateResp.data?.length) ||
                    (Array.isArray(updateResp.data)
                      ? updateResp.data.length
                      : 0);
                  if (count > 0) {
                    setMessage(
                      `Patched ${count} subscription(s) using column '${col}'.`,
                    );
                    break;
                  }
                }
              } catch (e) {
                // continue
              }
            }
          }
        }
      } catch (e: any) {
        console.error(e);
        setMessage(e.message || "Error linking account");
      } finally {
        setLoading(false);
      }
    });

    return () => unsub();
  }, []);

  async function handleSignIn() {
    try {
      setLoading(true);
      setMessage(null);
      await signInWithPopup(auth, provider);
      // onAuthStateChanged will handle the rest
    } catch (e: any) {
      console.error(e);
      setMessage(e.message || "Login failed");
    } finally {
      setLoading(false);
    }
  }

  async function handleSignOut() {
    await signOut(auth);
    setUser(null);
    setDbUserId(null);
    localStorage.removeItem("db_user_id");
  }

  return (
    <main className="min-h-screen flex items-center justify-center bg-gray-50 p-6">
      <div className="w-full max-w-lg bg-white rounded-2xl shadow p-6">
        <h1 className="text-2xl font-bold mb-4">Refill — Sign in</h1>

        {!user ? (
          <div className="space-y-3">
            <p>
              Sign in with Google to link your Supabase account and enable
              subscriptions.
            </p>
            <button
              onClick={handleSignIn}
              className="w-full py-2 rounded-lg bg-blue-600 text-white font-semibold"
              disabled={loading}
            >
              {loading ? "Signing in…" : "Sign in with Google"}
            </button>
          </div>
        ) : (
          <div className="space-y-3">
            <p className="font-medium">
              Signed in as: {user.displayName || user.email}
            </p>
            <p className="text-sm text-gray-600">Firebase uid: {user.uid}</p>
            <p className="text-sm text-gray-600">
              Supabase id: {dbUserId ?? "(linking...)"}
            </p>

            <div className="flex gap-2">
              <button
                onClick={handleSignOut}
                className="flex-1 py-2 rounded-lg border border-gray-300"
              >
                Sign out
              </button>

              <button
                onClick={async () => {
                  // manual re-sync trigger (useful during dev)
                  if (!user) return;
                  setLoading(true);
                  try {
                    const token = await user.getIdToken(true);
                    const fnUrl =
                      process.env.NEXT_PUBLIC_SUPABASE_CREATE_USER_FUNCTION_URL;
                    const res = await fetch(fnUrl!, {
                      method: "POST",
                      headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                      },
                      body: JSON.stringify({
                        uid: user.uid,
                        email: user.email,
                        name: user.displayName,
                      }),
                    });
                    const d = await res.json();
                    setDbUserId(d.id);
                    setMessage("Re-synced user id: " + d.id);
                  } catch (e: any) {
                    setMessage(e.message);
                  } finally {
                    setLoading(false);
                  }
                }}
                className="py-2 px-4 rounded-lg bg-green-600 text-white"
              >
                Re-sync user id
              </button>
            </div>
          </div>
        )}

        {message && (
          <div className="mt-4 p-3 bg-gray-100 rounded">{message}</div>
        )}

        <hr className="my-4" />

        <div className="text-xs text-gray-500">
          <p>Developer notes:</p>
          <ul>
            <li>
              - The Supabase cloud function endpoint must accept POST JSON and
              return id: "..." .
            </li>
            <li>
              - Adjust subscription update logic to match your actual
              subscription table schema.
            </li>
            <li>
              - For production, move sensitive calls to server-side and protect
              Supabase service role keys.
            </li>
          </ul>
        </div>
      </div>
    </main>
  );
}
