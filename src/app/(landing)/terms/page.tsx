import { Metadata } from "next";
import { Separator } from "@/components/ui/separator";

export const metadata: Metadata = {
  title: "Terms of Service | medicinexp",
  description: "Read the full terms and conditions for using medicinexp.",
};

export default function TermsPage() {
  return (
    <div className="layout-container mx-auto px-4 py-12 mt-36 mb-12">
      <h1 className="text-3xl font-bold mb-4 text-primary">Terms of Service</h1>
      <p className="text-muted-foreground mb-8">Last updated: July 15, 2025</p>

      <Separator className="mb-6" />

      <section className="space-y-4">
        <h2 className="text-xl font-semibold text-primary">
          1. Acceptance of Terms
        </h2>
        <p>
          By accessing or using medicinexp, you agree to be bound by these Terms
          of Service. If you do not agree, please do not use our platform.
        </p>
      </section>

      <section className="space-y-4 mt-8">
        <h2 className="text-xl font-semibold text-primary">2. Our Role</h2>
        <p>
          medicinexp is a software provider only. We offer tools for pharmacy
          management, but we do not issue official tax-compliant invoices or VAT
          bills. It is the responsibility of each user (pharmacy) to ensure
          compliance with their regional legal and tax regulations.
        </p>
      </section>

      <section className="space-y-4 mt-8">
        <h2 className="text-xl font-semibold text-primary">
          3. Payment & Subscriptions
        </h2>
        <p>
          We offer monthly and annual subscriptions via Stripe, PayPal, and
          other local payment methods. All payments are handled through secure
          third-party providers. You are responsible for keeping your payment
          details up to date.
        </p>
      </section>

      <section className="space-y-4 mt-8">
        <h2 className="text-xl font-semibold text-primary">
          4. Preorder & Early Access
        </h2>
        <p>
          If you&apos;re joining via a preorder, you&apos;re gaining early
          access to our platform as a beta user. We appreciate your feedback.
          Features and functionality may change rapidly during this period.
        </p>
      </section>

      <section className="space-y-4 mt-8">
        <h2 className="text-xl font-semibold text-primary">5. Termination</h2>
        <p>
          We reserve the right to suspend or terminate your access to the
          service at any time, especially in case of misuse, abuse, or
          fraudulent activity.
        </p>
      </section>

      <section className="space-y-4 mt-8">
        <h2 className="text-xl font-semibold text-primary">
          6. Limitation of Liability
        </h2>
        <p>
          We are not liable for any loss or damage resulting from your use of
          medicinexp, including loss of data or downtime.
        </p>
      </section>

      <section className="space-y-4 mt-8">
        <h2 className="text-xl font-semibold text-primary">
          7. Changes to Terms
        </h2>
        <p>
          We may update these terms occasionally. You’ll be notified of major
          changes, and your continued use of the platform constitutes acceptance
          of the updated terms.
        </p>
      </section>

      <section className="space-y-4 mt-8">
        <h2 className="text-xl font-semibold text-primary">8. Contact</h2>
        <p>
          Have questions? Reach out to us at{" "}
          <a href="mailto:support@medicinexp.com" className="text-primary">
            support@medicinexp.com
          </a>
          .
        </p>
      </section>
    </div>
  );
}
