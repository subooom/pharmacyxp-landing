# Overview: where things live, how to run

## Folders
- `src/app/(landing)/`: marketing pages (home, pricing, features, contact, legal).
- `src/app/(auth)/get-started/`: pharmacy sign-up wizard.
  - `page.tsx` handles `?coupon=<code>` (pre-fills the rep code) and `?invite=<token>` (fills the
    whole form from a rep's visit).
  - `_steps/0..7`: welcome (with "Has a MedicineXP rep visited you?" card: rep code + PAN),
    basic details, organization, address, plan, departments, email/password, thank you.
  - `_hooks/useSignUpValidation.tsx` (Joi rules per step), `useSignupInvite.ts` (prefill),
    `useCoupon.ts` (verify code, 4–12 chars), `usePlans.ts`.
  - `_components/_steps/_components/` Header/Body/Footer of the wizard (footer is sticky).
  - `_utils/region.ts` maps free-text provinces to the region select (Nepal aliases).
- `src/store/sing-up.store.ts` (sic): Zustand store for the whole form, `invite`, `goToPage`.
- `src/app/clinic-3d/` + `src/components/composits/Clinic3D/`: three.js rack/pharmacy 3D module
  (not integrated into the platform yet; reads racks/rack slots).
- `src/lib/api.ts` axios; base URL `NEXT_PUBLIC_API_URL` or staging `https://medicinexp-staging.com/api/`.

## Sign-up → server
`POST /create-an-account` with the form (+ `lead_token` from an invite, `coupon_code`).
Invites: `GET /signup-invites/{token}`, `POST /signup-invites/find` {code, pan}.

## Run
`npm run dev` (port 3000). `npx tsc --noEmit -p .` has old unrelated errors (subscribe pages, 3D);
check only files you touched.

## Gotchas
- The store's `isFirstPage`/`isLastPage` getters never update: compute from `page` in `page.tsx`.
- Joi validation: messages for `string.pattern.base` must be set explicitly, or users see Joi's default.
