import { NextRequest, NextResponse } from "next/server";
import { validateQuestionnaire, buildPayload } from "../../../lib/questionnaire/api-validation";
import { checkRateLimit, insertPayload } from "../../../lib/api-helpers";

export const dynamic = "force-dynamic";

export async function POST(request: NextRequest) {
  const ip = request.headers.get("x-forwarded-for") || "unknown";
  const rateLimitResponse = checkRateLimit(ip, "questionnaire");
  if (rateLimitResponse) return rateLimitResponse;

  try {
    const body: Record<string, unknown> = await request.json();

    const validationErrors = validateQuestionnaire(body);
    if (validationErrors.length > 0) {
      return NextResponse.json({ success: false, errors: validationErrors }, { status: 400 });
    }

    const payload = buildPayload(body);
    const dbError = await insertPayload("questionnaire_responses", payload);

    if (dbError) {
      return NextResponse.json(
        { success: false, message: "Erreur lors de l'enregistrement" },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { success: true, message: "Questionnaire soumis avec succès" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Submission error:", error);
    return NextResponse.json(
      { success: false, message: "Erreur lors de la soumission" },
      { status: 500 }
    );
  }
}
