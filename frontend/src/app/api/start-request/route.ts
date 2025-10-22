import { NextResponse } from "next/server";

import {
  submitStartBuildInquiry,
  type StartBuildInquiryInput,
  validateStartBuildInquiry
} from "@/lib/inquiries";

export async function POST(request: Request) {
  try {
    const payload = (await request.json()) as StartBuildInquiryInput;
    const validation = validateStartBuildInquiry(payload);

    if (!validation.valid) {
      return NextResponse.json({ error: validation.errors.join(" ") }, { status: 400 });
    }

    const result = await submitStartBuildInquiry(payload, { sendSlack: true });
    return NextResponse.json({ ok: true, id: result.id });
  } catch (error) {
    console.error("Failed to process start request", error);
    return NextResponse.json(
      { error: "Unable to send your request right now. Please try again shortly." },
      { status: 500 }
    );
  }
}
