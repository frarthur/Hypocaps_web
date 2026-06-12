import { NextRequest, NextResponse } from "next/server";
import { getSupabase } from "../../../lib/supabase/client";
import { validateQuestionnaire, buildPayload } from "../../../lib/questionnaire/api-validation";
import { rateLimit } from "../../../lib/rate-limit";

export const dynamic = "force-dynamic";

export async function POST(request: NextRequest) {
  const ip = request.headers.get("x-forwarded-for") || "unknown";
  const { allowed, retryAfter } = rateLimit(`questionnaire:${ip}`, 5, 60_000);

  if (!allowed) {
    return NextResponse.json(
      { success: false, message: `Trop de requêtes. Réessayez dans ${retryAfter}s.` },
      { status: 429, headers: { "Retry-After": String(retryAfter) } }
    );
  }

  try {
    const body: Record<string, unknown> = await request.json();

    const validationErrors = validateQuestionnaire(body);
    if (validationErrors.length > 0) {
      return NextResponse.json({ success: false, errors: validationErrors }, { status: 400 });
    }

    const supabase = getSupabase();

    const payload = buildPayload(body);

    const { error } = await supabase.from("questionnaire_responses").insert(payload);

    if (error) {
      console.error("Supabase insert error:", error);
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
