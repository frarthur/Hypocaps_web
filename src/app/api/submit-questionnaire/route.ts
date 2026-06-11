import { NextRequest, NextResponse } from "next/server";
import { getSupabase } from "../../../lib/supabase/client";

export const dynamic = "force-dynamic";

const ALLOWED_CONCERN = new Set(["yes", "relative", "both", "no"]);
const ALLOWED_SOURCE = new Set([
  "reddit", "pharmacie", "proche", "instagram",
  "linkedin", "facebook", "search",
]);
const ALLOWED_REIMBURSED = new Set(["yes", "no", "dont_know"]);
const ALLOWED_DIABETES = new Set([
  "type1", "type1_5", "type2", "type3c", "gestationnel",
  "MODY", "CFRD", "prediabete", "MIDD", "steroid_induced", "other", "dont_know",
]);
const ALLOWED_RESUCRAGE = new Set(["always", "sometimes", "never"]);
const ALLOWED_PROBLEM_SEVERITY = new Set(["yes", "no", "sometimes"]);
const ALLOWED_TASTE = new Set(["yes", "no", "maybe"]);
const ALLOWED_FORM = new Set(["liquid", "solid", "gel", "gummies"]);

function isString(v: unknown): v is string {
  return typeof v === "string";
}

function isStringArray(v: unknown): v is string[] {
  return Array.isArray(v) && v.every((i) => typeof i === "string");
}

interface FieldError {
  field: string;
  message: string;
}

function validateQuestionnaire(body: Record<string, unknown>): FieldError[] {
  const errors: FieldError[] = [];

  if (body.age !== undefined && body.age !== null && body.age !== "") {
    if (typeof body.age !== "string" || !/^\d+$/.test(body.age)) {
      errors.push({ field: "age", message: "L'âge doit contenir uniquement des chiffres" });
    }
  }

  if (!isString(body.concern_diabetes) || !ALLOWED_CONCERN.has(body.concern_diabetes)) {
    errors.push({ field: "concern_diabetes", message: "Valeur invalide" });
  }

  if (!isString(body.source) || !ALLOWED_SOURCE.has(body.source)) {
    errors.push({ field: "source", message: "Valeur invalide" });
  }

  if (!isString(body.should_be_reimbursed) || !ALLOWED_REIMBURSED.has(body.should_be_reimbursed)) {
    errors.push({ field: "should_be_reimbursed", message: "Valeur invalide" });
  }

  if (
    body.diabetes_type !== undefined && body.diabetes_type !== null && body.diabetes_type !== "" &&
    (!isString(body.diabetes_type) || !ALLOWED_DIABETES.has(body.diabetes_type))
  ) {
    errors.push({ field: "diabetes_type", message: "Valeur invalide" });
  }

  if (
    body.uses_resucrage !== undefined && body.uses_resucrage !== null && body.uses_resucrage !== "" &&
    (!isString(body.uses_resucrage) || !ALLOWED_RESUCRAGE.has(body.uses_resucrage))
  ) {
    errors.push({ field: "uses_resucrage", message: "Valeur invalide" });
  }

  if (
    body.resucrage_food_types !== undefined && body.resucrage_food_types !== null &&
    (!isStringArray(body.resucrage_food_types) || body.resucrage_food_types.length === 0)
  ) {
    errors.push({ field: "resucrage_food_types", message: "Valeur invalide" });
  }

  if (
    body.resucrage_specialized !== undefined && body.resucrage_specialized !== null &&
    (!isStringArray(body.resucrage_specialized) || body.resucrage_specialized.length === 0)
  ) {
    errors.push({ field: "resucrage_specialized", message: "Valeur invalide" });
  }

  if (
    body.has_resucrage_problems !== undefined && body.has_resucrage_problems !== null && body.has_resucrage_problems !== "" &&
    (!isString(body.has_resucrage_problems) || !ALLOWED_PROBLEM_SEVERITY.has(body.has_resucrage_problems))
  ) {
    errors.push({ field: "has_resucrage_problems", message: "Valeur invalide" });
  }

  if (
    body.resucrage_problems_other !== undefined && body.resucrage_problems_other !== null &&
    (typeof body.resucrage_problems_other !== "string" || body.resucrage_problems_other.length > 500)
  ) {
    errors.push({ field: "resucrage_problems_other", message: "Texte trop long" });
  }

  if (
    body.resucrage_form_preference !== undefined && body.resucrage_form_preference !== null && body.resucrage_form_preference !== "" &&
    (!isString(body.resucrage_form_preference) || !ALLOWED_FORM.has(body.resucrage_form_preference))
  ) {
    errors.push({ field: "resucrage_form_preference", message: "Valeur invalide" });
  }

  if (
    body.would_try_neutral_taste !== undefined && body.would_try_neutral_taste !== null && body.would_try_neutral_taste !== "" &&
    (!isString(body.would_try_neutral_taste) || !ALLOWED_TASTE.has(body.would_try_neutral_taste))
  ) {
    errors.push({ field: "would_try_neutral_taste", message: "Valeur invalide" });
  }

  return errors;
}

export async function POST(request: NextRequest) {
  try {
    const body: Record<string, unknown> = await request.json();

    const validationErrors = validateQuestionnaire(body);
    if (validationErrors.length > 0) {
      return NextResponse.json(
        { success: false, errors: validationErrors },
        { status: 400 }
      );
    }

    const supabase = getSupabase();

    const payload = {
      first_name: typeof body.first_name === "string" ? body.first_name || null : null,
      age: typeof body.age === "string" ? body.age || null : null,
      email: typeof body.email === "string" ? body.email || null : null,
      concern_diabetes: body.concern_diabetes,
      diabetes_type: typeof body.diabetes_type === "string" ? body.diabetes_type || null : null,
      uses_resucrage: typeof body.uses_resucrage === "string" ? body.uses_resucrage || null : null,
      resucrage_food_types: Array.isArray(body.resucrage_food_types) ? body.resucrage_food_types : null,
      resucrage_specialized: Array.isArray(body.resucrage_specialized) ? body.resucrage_specialized : null,
      resucrage_specialized_other: typeof body.resucrage_specialized_other === "string" ? body.resucrage_specialized_other || null : null,
      has_resucrage_problems: typeof body.has_resucrage_problems === "string" ? body.has_resucrage_problems || null : null,
      resucrage_problems: Array.isArray(body.resucrage_problems) ? body.resucrage_problems : null,
      resucrage_problems_other: typeof body.resucrage_problems_other === "string" ? body.resucrage_problems_other || null : null,
      resucrage_form_preference: typeof body.resucrage_form_preference === "string" ? body.resucrage_form_preference || null : null,
      source: body.source,
      should_be_reimbursed: body.should_be_reimbursed,
      would_try_neutral_taste: typeof body.would_try_neutral_taste === "string" ? body.would_try_neutral_taste || null : null,
    };

    const { error } = await supabase
      .from("questionnaire_responses")
      .insert(payload as never);

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
