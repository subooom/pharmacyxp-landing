import { Metadata } from "next";
import { Separator } from "@/components/ui/separator";

export const metadata: Metadata = {
  title: "Privacy Policy | medicinexp",
  description: "Learn how medicinexp handles your data and privacy.",
};

export default function PrivacyPage() {
  return (
    <div className="layout-container mx-auto px-4 py-12 mt-36 mb-12">
      <h1 className="text-3xl font-bold mb-4 text-primary">Privacy Policy</h1>
      <p className="text-muted-foreground mb-8">Last updated: July 15, 2025</p>

      <Separator className="mb-6" />

      <section className="space-y-4">
        <h2 className="text-xl font-semibold text-primary">1. Introduction</h2>
        <p>
          At medicinexp, we respect your privacy and are committed to protecting
          any personal data you provide. This Privacy Policy outlines how we
          collect, use, and safeguard your information.
        </p>
      </section>

      <section className="space-y-4 mt-8">
        <h2 className="text-xl font-semibold text-primary">
          2. Information We Collect
        </h2>
        <p>
          We may collect personal information such as your name, email address,
          and billing details when you sign up, make a purchase, or contact us.
          We may also collect technical data like browser type and IP address
          for security and analytics.
        </p>
      </section>

      <section className="space-y-4 mt-8">
        <h2 className="text-xl font-semibold text-primary">
          3. How We Use Your Information
        </h2>
        <p>
          Your data helps us:
          <ul className="list-disc ml-6 mt-2">
            <li>Provide and improve our services</li>
            <li>Process payments and manage subscriptions</li>
            <li>Send important updates and newsletters (if opted in)</li>
            <li>Analyze usage trends to improve user experience</li>
          </ul>
        </p>
      </section>

      <section className="space-y-4 mt-8">
        <h2 className="text-xl font-semibold text-primary">
          4. Sharing Your Information
        </h2>
        <p>
          We do not sell your data. We only share it with trusted service
          providers (e.g., payment processors like Stripe and PayPal) who assist
          us in delivering the service. These providers are bound by data
          protection agreements.
        </p>
      </section>

      <section className="space-y-4 mt-8">
        <h2 className="text-xl font-semibold text-primary">
          5. Data Storage & Security
        </h2>
        <p>
          Your data is stored securely using industry-standard encryption and
          security practices. However, no method of transmission over the
          Internet or method of electronic storage is 100% secure, so we cannot
          guarantee absolute security.
        </p>
      </section>

      <section className="space-y-4 mt-8">
        <h2 className="text-xl font-semibold text-primary">6. Your Rights</h2>
        <p>
          Depending on your region, you may have the right to access, correct,
          or delete your personal data. For such requests, please contact us
          directly at{" "}
          <a
            href="mailto:support@medicinexp.com"
            className="text-primary underline"
          >
            support@medicinexp.com
          </a>
          .
        </p>
      </section>

      <section className="space-y-4 mt-8">
        <h2 className="text-xl font-semibold text-primary">
          7. Cookies & Tracking
        </h2>
        <p>
          We use cookies to enhance user experience, store preferences, and
          track usage. You can adjust your browser settings to block cookies,
          but some features may not work correctly.
        </p>
      </section>

      <section className="space-y-4 mt-8">
        <h2 className="text-xl font-semibold text-primary">
          8. Third-Party Links
        </h2>
        <p>
          Our site may contain links to third-party sites. We are not
          responsible for the privacy practices of these external websites. We
          encourage you to read their privacy policies.
        </p>
      </section>

      <section className="space-y-4 mt-8">
        <h2 className="text-xl font-semibold text-primary">
          9. Changes to This Policy
        </h2>
        <p>
          We may update this policy as needed. Significant changes will be
          communicated via email or platform notification. Continued use of the
          platform implies acceptance of the revised policy.
        </p>
      </section>

      <section className="space-y-4 mt-8">
        <h2 className="text-xl font-semibold text-primary">10. Contact Us</h2>
        <p>
          If you have any questions or concerns about this Privacy Policy,
          please contact us at{" "}
          <a
            href="mailto:support@medicinexp.com"
            className="text-primary underline"
          >
            support@medicinexp.com
          </a>
          .
        </p>
      </section>
    </div>
  );
}
