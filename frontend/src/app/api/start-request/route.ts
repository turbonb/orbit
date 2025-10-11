import { NextResponse } from "next/server";

interface StartRequestPayload {
  fullName?: string;
  email?: string;
  company?: string;
  projectType?: string;
  goals?: string;
  timeline?: string;
  budget?: string;
  integrations?: string;
  communication?: string;
}

export async function POST(request: Request) {
  try {
    const payload = (await request.json()) as StartRequestPayload;

    if (!payload.fullName || !payload.email || !payload.projectType || !payload.goals) {
      return NextResponse.json(
        { error: "Please provide your name, email, project type, and goals." },
        { status: 400 }
      );
    }

    const summary = [
      `• Name: ${payload.fullName}`,
      `• Email: ${payload.email}`,
      payload.company ? `• Company: ${payload.company}` : null,
      `• Project type: ${payload.projectType}`,
      payload.timeline ? `• Timeline: ${payload.timeline}` : null,
      payload.budget ? `• Budget: ${payload.budget}` : null,
      payload.communication ? `• Preferred follow-up: ${payload.communication}` : null,
      "",
      `Goals & outcomes:\n${payload.goals}`,
      "",
      payload.integrations ? `Integrations / constraints:\n${payload.integrations}` : null
    ]
      .filter(Boolean)
      .join("\n");

    const webhook = process.env.ORBIT_INTAKE_WEBHOOK;

    if (webhook) {
      await fetch(webhook, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          text: `🚀 New Orbit build request\n\n${summary}`
        })
      });
    } else {
      console.info("Orbit intake submission", summary);
    }

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("Failed to process start request", error);
    return NextResponse.json(
      { error: "Unable to send your request right now. Please try again shortly." },
      { status: 500 }
    );
  }
}

