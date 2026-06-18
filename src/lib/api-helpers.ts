import { NextRequest, NextResponse } from "next/server";
import { getSupabase } from "./supabase/client";
import { rateLimit } from "./rate-limit";

interface ApiConfig<T extends object> {
  table: string;
  rateLimitKey: string;
  buildPayload: (_body: Record<string, unknown>) => T;
  successMessage: string;
  serverErrorMessage: string;
  validate: (_body: Record<string, unknown>) => string | null;
}

export function rateLimitedResponse(retryAfter: number) {
  return NextResponse.json(
    { success: false, message: `Trop de requêtes. Réessayez dans ${retryAfter}s.` },
    { status: 429, headers: { "Retry-After": String(retryAfter) } }
  );
}

export function checkRateLimit(ip: string, key: string) {
  const { allowed, retryAfter } = rateLimit(key + ":" + ip, 5, 60_000);
  return allowed ? null : rateLimitedResponse(retryAfter);
}

export async function insertPayload(table: string, payload: object) {
  const supabase = getSupabase();
  const { error } = await (supabase.from as any)(table).insert(payload);
  if (error) {
    console.error("Supabase insert error:", error);
    return error;
  }
  return null;
}

export function apiPost<T extends object>(request: NextRequest, config: ApiConfig<T>) {
  const ip = request.headers.get("x-forwarded-for") || "unknown";
  const rateLimitResponse = checkRateLimit(ip, config.rateLimitKey);
  if (rateLimitResponse) return rateLimitResponse;

  return handleApiPost(request, config);
}

async function handleApiPost<T extends object>(request: NextRequest, config: ApiConfig<T>) {
  try {
    const body: Record<string, unknown> = await request.json();

    const validationError = config.validate(body);
    if (validationError) {
      return NextResponse.json({ success: false, message: validationError }, { status: 400 });
    }

    const payload = config.buildPayload(body);
    const dbError = await insertPayload(config.table, payload);

    if (dbError) {
      return NextResponse.json(
        { success: false, message: config.serverErrorMessage },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true, message: config.successMessage }, { status: 200 });
  } catch (error) {
    console.error("API error:", error);
    return NextResponse.json(
      { success: false, message: config.serverErrorMessage },
      { status: 500 }
    );
  }
}
