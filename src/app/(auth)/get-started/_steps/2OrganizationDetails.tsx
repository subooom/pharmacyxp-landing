import React, { useState } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import StepPageLayout from "@/layouts/StepPageLayout";
import Image from "next/image";
import { useSignUpStore } from "@/store/sing-up.store";

const OrganizationDetails = () => {
  const {
    updateFormData,
    formData: {
      organization_name,
      organization_contact,
      organization_logo,
      organization_pan_number,
      organization_description,
    },
    errors,
  } = useSignUpStore();
  const [orgLogoImage, setOrgLogoImage] = useState<string | undefined>();

  return (
    <StepPageLayout
      title="Organization Details"
      subtitle="Let us know about your organization so we can customize your experience using our platform."
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <div className="space-y-2">
          <Label htmlFor="organization_name">Name Of Your Organization *</Label>
          <Input
            id="organization_name"
            value={organization_name}
            onChange={({ target }) =>
              updateFormData({ organization_name: target.value })
            }
            className={errors?.organization_name ? "border-destructive" : ""}
          />
          {errors?.organization_name && (
            <p
              className="text-sm text-destructive"
              id="organization_name-error-message"
            >
              {errors.organization_name}
            </p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="organization_contact">Contact Number *</Label>
          <Input
            id="organization_contact"
            value={organization_contact}
            onChange={({ target }) =>
              updateFormData({ organization_contact: target.value })
            }
            type="tel"
            className={errors?.organization_contact ? "border-destructive" : ""}
          />
          {errors?.organization_contact && (
            <p
              className="text-sm text-destructive"
              id="organization_contact-error-message"
            >
              {errors.organization_contact}
            </p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="organization_logo">Organization Logo *</Label>
          <Input
            id="organization_logo"
            type="file"
            accept="image/*"
            className={errors?.organization_logo ? "border-destructive" : ""}
            onChange={({ target }) => {
              const file = target.files?.[0];
              if (!file) return;

              // For thumbnail preview
              const reader = new FileReader();
              reader.onloadend = (e) => {
                if (e.target?.result) {
                  const src = e.target.result as string;
                  setOrgLogoImage(src);
                }
              };
              reader.readAsDataURL(file);

              // For validation payload
              const toUploadedFile = async (file: File) => {
                const buffer = await file.arrayBuffer();
                return {
                  buffer: Buffer.from(buffer),
                  mimetype: file.type,
                  size: file.size,
                  originalname: file.name,
                };
              };

              toUploadedFile(file).then((uploadedFile) => {
                updateFormData({
                  organization_logo: uploadedFile,
                });
              });
            }}
          />
          {orgLogoImage && (
            <div className="flex items-start gap-4 mt-3">
              <Image
                src={orgLogoImage}
                alt="Org Logo"
                width={60}
                height={60}
                className="rounded border"
              />
              <button
                className="text-destructive bg-white border px-3 py-1 rounded hover:bg-red-50"
                onClick={() => {
                  updateFormData({ organization_logo: undefined });
                  (
                    document.getElementById(
                      "organization_logo",
                    ) as HTMLInputElement
                  )?.setAttribute("value", "");
                  setOrgLogoImage(undefined);
                }}
              >
                Remove
              </button>
            </div>
          )}
          {errors?.organization_logo && (
            <p
              className="text-sm text-destructive"
              id="organization_logo-error-message"
            >
              {errors.organization_logo}
            </p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="organization_pan_number">PAN Number</Label>
          <Input
            id="organization_pan_number"
            value={organization_pan_number}
            onChange={({ target }) =>
              updateFormData({ organization_pan_number: target.value })
            }
            type="number"
            className={
              errors?.organization_pan_number ? "border-destructive" : ""
            }
          />
          {errors?.organization_pan_number && (
            <p
              className="text-sm text-destructive"
              id="organization_pan_number-error-message"
            >
              {errors.organization_pan_number}
            </p>
          )}
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="organization_description">Other Details</Label>
        <Textarea
          id="organization_description"
          value={organization_description}
          onChange={({ target }) =>
            updateFormData({ organization_description: target.value })
          }
        />
      </div>
    </StepPageLayout>
  );
};

export default OrganizationDetails;
