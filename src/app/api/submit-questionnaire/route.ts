import { NextRequest, NextResponse } from "next/server";
import { getSupabase } from "../../../lib/supabase/client";

export const dynamic = "force-dynamic";

interface InsertPayload {
  first_name: string | null;
  age: string | null;
  email: string | null;
  concern_diabetes: string;
  diabetes_type: string | null;
  uses_resucrage: string | null;
  resucrage_food_types: string[] | null;
  resucrage_specialized: string[] | null;
  resucrage_specialized_other: string | null;
  has_resucrage_problems: string | null;
  resucrage_problems: string[] | null;
  resucrage_problems_other: string | null;
  resucrage_form_preference: string | null;
  should_be_reimbursed: string;
  would_try_neutral_taste: string | null;
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    console.log("=== Questionnaire Submission ===");
    console.log(JSON.stringify(body, null, 2));
    console.log("================================");

    const supabase = getSupabase();

    const payload: InsertPayload = {
      first_name: body.first_name || null,
      age: body.age || null,
      email: body.email || null,
      concern_diabetes: body.concern_diabetes,
      diabetes_type: body.diabetes_type || null,
      uses_resucrage: body.uses_resucrage || null,
      resucrage_food_types: body.resucrage_food_types || null,
      resucrage_specialized: body.resucrage_specialized || null,
      resucrage_specialized_other: body.resucrage_specialized_other || null,
      has_resucrage_problems: body.has_resucrage_problems || null,
      resucrage_problems: body.resucrage_problems || null,
      resucrage_problems_other: body.resucrage_problems_other || null,
      resucrage_form_preference: body.resucrage_form_preference || null,
      should_be_reimbursed: body.should_be_reimbursed,
      would_try_neutral_taste: body.would_try_neutral_taste || null,
    };

    const { error } = await supabase
      .from("questionnaire_responses")
      .insert(payload as any);

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
