"use server";

import {
  submitStartBuildInquiry,
  type StartBuildInquiryInput,
  validateStartBuildInquiry
} from "@/lib/inquiries";

export interface SubmitStartBuildResult {
  success: boolean;
  id?: string;
  errors?: string[];
  message?: string;
}

export async function submitStartBuildAction(payload: StartBuildInquiryInput): Promise<SubmitStartBuildResult> {
  const validation = validateStartBuildInquiry(payload);

  if (!validation.valid) {
    return {
      success: false,
      errors: validation.errors
    };
  }

  try {
    const result = await submitStartBuildInquiry(payload, { sendSlack: true });
    return {
      success: true,
      id: result.id,
      message: "Received! We’ll respond within a day."
    };
  } catch (error) {
    console.error("submitStartBuildAction failed", error);
    return {
      success: false,
      message:
        error instanceof Error
          ? error.message
          : "Unable to send your request right now. Please try again shortly."
    };
  }
}
