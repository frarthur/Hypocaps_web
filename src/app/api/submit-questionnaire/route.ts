import { NextRequest, NextResponse } from "next/server";
import { supabase } from "../../../lib/supabase/client";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    console.log("=== Questionnaire Submission ===");
    console.log(JSON.stringify(body, null, 2));
    console.log("================================");

    const { error } = await supabase.from("questionnaire_responses").insert({
      email: body.email || null,
      answers: body,
    });

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
