import React from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import StepPageLayout from "@/layouts/StepPageLayout";
import { useSignUpStore } from "@/store/sing-up.store";

const BasicDetails = () => {
  const {
    updateFormData,
    formData: { admin_name, admin_email, admin_contact },
    errors,
  } = useSignUpStore();
  return (
    <StepPageLayout
      title="Basic Details"
      subtitle="The email you provide will be part of your login credential to your own admin panel!"
    >
      <div className="space-y-2">
        <Label htmlFor="admin_name">Your Name *</Label>
        <Input
          id="admin_name"
          placeholder="Name"
          value={admin_name}
          onChange={({ target }) =>
            updateFormData({ admin_name: target.value })
          }
          required
        />
        {errors?.admin_name && (
          <p className="text-sm text-destructive" id="admin_name-error-message">
            {errors.admin_name}
          </p>
        )}
      </div>
      <div className="space-y-2">
        <Label htmlFor="admin_email">Your Email *</Label>
        <Input
          id="admin_email"
          placeholder="Email"
          value={admin_email}
          onChange={({ target }) =>
            updateFormData({ admin_email: target.value })
          }
          required
          type="email"
        />
        {errors?.admin_email && (
          <p
            className="text-sm text-destructive"
            id="admin_email-error-message"
          >
            {errors.admin_email}
          </p>
        )}
      </div>
      <div className="space-y-2">
        <Label htmlFor="admin_contact">Contact Number *</Label>
        <Input
          id="admin_contact"
          placeholder="Contact Number"
          value={admin_contact}
          onChange={({ target }) =>
            updateFormData({ admin_contact: target.value })
          }
          type="tel"
        />
        {errors?.admin_contact && (
          <p
            className="text-sm text-destructive"
            id="admin_contact-error-message"
          >
            {errors.admin_contact}
          </p>
        )}
      </div>
    </StepPageLayout>
  );
};

export default BasicDetails;
