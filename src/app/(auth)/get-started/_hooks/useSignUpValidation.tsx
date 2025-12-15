import Joi, { CustomHelpers } from "joi";
import { SignUpState } from "./useSignUpState";
import { Plan } from "../_utils/types";
import { imageSize } from "image-size";

export const useSignUpValidation = (
  page: number,
  state: SignUpState,
  plans: Plan[],
) => {
  const getValidationRules = () => {
    switch (page) {
      case 1:
        return Joi.object({
          admin_name: Joi.string()
            .pattern(/^[A-Za-z ]+$/)
            .min(3)
            .max(30)
            .required()
            .messages({
              "string.base": `Your name should only contain letters.`,
              "string.empty": `Your name cannot be empty.`,
              "string.min": `Your name should have a minimum length of {#limit}`,
              "string.max": `Your name should have a maximum length of {#limit}`,
            }),
          admin_email: Joi.string()
            .email({ minDomainSegments: 2, tlds: { allow: ["com", "net"] } })
            .required()
            .messages({
              "string.email": `Not a valid email.`,
              "string.empty": `Your email cannot be empty.`,
            }),
          admin_contact: Joi.string()
            .pattern(/^[\d\s\-+()]+$/) // Allows digits, spaces, dashes, plus, parentheses
            .min(6) // Minimum reasonable length
            .max(20) // Maximum reasonable length
            .required()
            .messages({
              "string.min": `Phone number should be at least {#limit} characters.`,
              "string.max": `Phone number should not exceed {#limit} characters.`,
              "string.empty": `Phone number is required.`,
              "string.pattern.base": `Phone number can only contain numbers, spaces, and basic punctuation (+, -, (, )).`,
            }),
        });
      case 2:
        return Joi.object({
          organization_name: Joi.string()
            .pattern(/^[A-Za-z .]+$/)
            .min(3)
            .max(70)
            .required()
            .messages({
              "string.required": "Organization name is required",
              "string.base": `Your organization name should only contain letters.`,
              "string.empty": `Your organization name cannot be empty.`,
              "string.min": `Your organization name should have a minimum length of {#limit}`,
              "string.max": `Your organization name should have a maximum length of {#limit}`,
            }),

          organization_contact: Joi.string()
            .pattern(/^[\d\s\-+()]+$/) // Allows digits, spaces, dashes, plus, parentheses
            .min(6) // Minimum reasonable length
            .max(20) // Maximum reasonable length
            .required()
            .messages({
              "string.min": `Phone number should be at least {#limit} characters.`,
              "string.max": `Phone number should not exceed {#limit} characters.`,
              "string.empty": `Phone number is required.`,
              "string.pattern.base": `Phone number can only contain numbers, spaces, and basic punctuation (+, -, (, )).`,
            }),

          organization_pan_number: Joi.string().required().messages({
            "string.empty": `Your pan number cannot be empty.`,
            "string.base": `Your pan number should only contain numbers.`,
          }),
          organization_description: Joi.string().allow("").optional(),
          organization_logo: Joi.object()
            .custom(
              imageValidator({
                mimeTypes: ["image/png", "image/jpeg", "image/webp"],
                maxSize: 2 * 1024 * 1024, // 2 MB
                minWidth: 200,
                minHeight: 200,
                maxWidth: 2000,
                maxHeight: 2000,
              }),
              "image validation",
            )
            .messages({
              "object.invalid": "{{#error.message}}",
              "any.custom": "Organization Logo Error: {{#message}}",
              "any.required": "Organization Logo cannot be empty",
            })
            .required(),
        });

      case 3:
        return Joi.object({
          line_1_number_building: Joi.string().allow("").optional().messages({
            "string.base": `Line 1 Building Number isn't valid.`,
          }),

          line_2_number_street: Joi.string().allow("").optional().messages({
            "string.base": `Line 2 Street number isn't valid.`,
          }),

          line_3_area_locality: Joi.string().required().messages({
            "string.empty": `Line 3 area locality cannot be empty.`,
          }),

          zip_postcode: Joi.number().allow("").optional().messages({
            "number.base": `ZIP/Postcode must be a number.`,
          }),
          ward_number: Joi.string().required().messages({
            "string.empty": `Ward Number cannot be empty.`,
          }),
          vdc_municipality: Joi.string().required().messages({
            "string.empty": `VDC/Municipality cannot be empty.`,
          }),

          city: Joi.string().required().messages({
            "string.empty": `City cannot be empty.`,
          }),
          state_province_county: Joi.string().required().messages({
            "string.empty": `State/Province/County cannot be empty.`,
          }),
          country: Joi.string().required().messages({
            "string.empty": `Country cannot be empty.`,
          }),
          data: Joi.any(),
        });
      case 4:
        const msg = "Plan is required.";
        if (plans.length) {
          return Joi.object({
            plan_id: Joi.number()
              .min(0)
              .max(plans[plans.length - 1].id || 0)
              .required()
              .messages({
                "number.base": msg,
                "number.min": msg,
                "number.max": msg,
                "number.empty": msg,
              }),
          });
        }
        return Joi.object({});
      case 5:
        return Joi.object({
          service_ids: Joi.array().items(Joi.number()).min(1).required(),
        });
      case 6:
        return Joi.object({
          admin_email: Joi.string()
            .email({
              minDomainSegments: 2,
              tlds: { allow: ["com", "net"] },
            })
            .required()
            .messages({
              "string.email": `Not a valid email.`,
              "string.empty": `Your email cannot be empty.`,
            }),
          password: Joi.string()
            .pattern(new RegExp("^[a-zA-Z0-9]{3,30}$"))
            .min(3)
            .max(30)
            .messages({
              "string.empty": `Password cannot be empty.`,
              "string.pattern.base":
                "Password must only contain small letters, capital letters or numbers.",
              "string.min": "Password must be atleast 3 characters.",
              "string.max": "Password must be less than 30 characters.",
            }),
          confirm_password: Joi.any()
            .valid(Joi.ref("password"))
            .required()
            .messages({
              "any.only": `Passwords don't match`,
              "string.empty": `Your email cannot be empty.`,
            }),
          coupon_code: Joi.string().allow("").optional(),
        });
      default:
        return Joi.object({});
    }
  };

  const validateCurrentStep = () => {
    const schema = getValidationRules();
    const currentValues = getCurrentFormValues();
    return schema.validate(currentValues, { abortEarly: false });
  };

  const getCurrentFormValues = () => {
    switch (page) {
      case 1:
        return {
          admin_name: state.admin_name,
          admin_email: state.admin_email,
          admin_contact: state.admin_contact,
        };
      case 2:
        return {
          organization_name: state.organization_name,
          organization_contact: state.organization_contact,
          organization_pan_number: state.organization_pan_number,
          organization_description: state.organization_description,
          organization_logo: state.organization_logo,
        };
      case 3:
        return {
          ...state.organization_address,
        };
      case 4:
        return {
          plan_id: state.plan_id,
        };
      case 5:
        return {
          service_ids: state.service_ids,
        };
      case 6:
        return {
          admin_email: state.admin_email,
          password: state.password,
          confirm_password: state.confirm_password,
          coupon_code: state.coupon_code,
        };
      default:
        return {};
    }
  };

  return {
    validateCurrentStep,
    getCurrentFormValues,
  };
};

export interface ImageValidatorConfig {
  mimeTypes?: string[];
  maxSize?: number; // in bytes
  minWidth?: number;
  minHeight?: number;
  maxWidth?: number;
  maxHeight?: number;
}

// Define a file type (like multer provides)
export interface UploadedFile {
  buffer: Buffer;
  mimetype: string;
  size: number;
  originalname?: string;
}

export function imageValidator(config: ImageValidatorConfig = {}) {
  return async (value: any, helpers: CustomHelpers) => {
    let errorMessage: string | null = null;

    if (!value || typeof value !== "object") {
      errorMessage = "Please select a valid image file";
    } else {
      let buffer: Buffer;
      let mimetype: string;
      let size: number;

      // Handle native File object
      if (value instanceof File) {
        try {
          const arrayBuffer = await value.arrayBuffer();
          buffer = Buffer.from(arrayBuffer);
          mimetype = value.type;
          size = value.size;
        } catch (error) {
          errorMessage = "Failed to process the image file";
        }
      }
      // Handle your custom UploadedFile object (backward compatibility)
      else if (value.buffer && value.mimetype) {
        buffer = value.buffer;
        mimetype = value.mimetype;
        size = value.size;
      } else {
        errorMessage = "Invalid file format. Please select a valid image file";
      }

      if (!errorMessage) {
        // Mime type check
        if (config.mimeTypes && !config.mimeTypes.includes(mimetype)) {
          const allowedTypes = config.mimeTypes
            .map((type) => type.split("/")[1].toUpperCase())
            .join(", ");
          errorMessage = `File type not supported. Please use ${allowedTypes} formats`;
        }

        // File size check
        if (config.maxSize && size > config.maxSize) {
          const maxSizeMB = config.maxSize / (1024 * 1024);
          errorMessage = `File size too large. Maximum allowed size is ${maxSizeMB}MB`;
        }

        // Dimension check
        if (
          !errorMessage &&
          (config.minWidth ||
            config.minHeight ||
            config.maxWidth ||
            config.maxHeight)
        ) {
          try {
            const { width, height } = imageSize(buffer);

            if (!width || !height) {
              errorMessage = "Invalid image file. Please try another image";
            } else {
              if (config.minWidth && width < config.minWidth) {
                errorMessage = `Image width too small. Minimum width is ${config.minWidth}px`;
              } else if (config.minHeight && height < config.minHeight) {
                errorMessage = `Image height too small. Minimum height is ${config.minHeight}px`;
              } else if (config.maxWidth && width > config.maxWidth) {
                errorMessage = `Image width too large. Maximum width is ${config.maxWidth}px`;
              } else if (config.maxHeight && height > config.maxHeight) {
                errorMessage = `Image height too large. Maximum height is ${config.maxHeight}px`;
              }
            }
          } catch {
            errorMessage =
              "Cannot read image dimensions. Please try another image";
          }
        }
      }
    }

    if (errorMessage) {
      return helpers.error("any.custom", {
        error: new Error(errorMessage),
        message: errorMessage,
      });
    }

    return value;
  };
}
