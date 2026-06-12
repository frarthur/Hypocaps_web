import { NextRequest, NextResponse } from "next/server";
import { getSupabase } from "../../../lib/supabase/client";
import { validateContact, buildPayload } from "../../../lib/contact/api-validation";
import { rateLimit } from "../../../lib/rate-limit";

export const dynamic = "force-dynamic";

export async function POST(request: NextRequest) {
  const ip = request.headers.get("x-forwarded-for") || "unknown";
  const { allowed, retryAfter } = rateLimit(`contact:${ip}`, 5, 60_000);

  if (!allowed) {
    return NextResponse.json(
      { success: false, message: `Trop de requêtes. Réessayez dans ${retryAfter}s.` },
      { status: 429, headers: { "Retry-After": String(retryAfter) } }
    );
  }

  try {
    const body: Record<string, unknown> = await request.json();

    const validationError = validateContact(body);
    if (validationError) {
      return NextResponse.json({ success: false, message: validationError }, { status: 400 });
    }

    const supabase = getSupabase();

    const payload = buildPayload(body);

    const { error } = await supabase.from("contact_messages").insert(payload);

    if (error) {
      console.error("Supabase insert error:", error);
      return NextResponse.json(
        { success: false, message: "Erreur lors de l'envoi" },
        { status: 500 }
      );
    }

    if (process.env.SMTP_HOST && process.env.SMTP_USER && process.env.SMTP_PASS) {
      try {
        const nodemailer = await import("nodemailer");
        const transporter = nodemailer.default.createTransport({
          host: process.env.SMTP_HOST,
          port: Number(process.env.SMTP_PORT) || 587,
          secure: process.env.SMTP_SECURE === "true",
          auth: {
            user: process.env.SMTP_USER,
            pass: process.env.SMTP_PASS,
          },
        });

        await transporter.sendMail({
          from: `"Hypocaps Contact" <${process.env.SMTP_FROM || process.env.SMTP_USER}>`,
          to: process.env.CONTACT_EMAIL || "arthur.fresse@hypocaps.fr",
          subject: `Nouveau message de ${body.name}`,
          text: `Nom: ${body.name}\nEmail: ${body.email}\n\nMessage:\n${body.message}`,
          html: `<p><strong>Nom:</strong> ${body.name}</p><p><strong>Email:</strong> ${body.email}</p><p><strong>Message:</strong></p><p>${String(body.message).replace(/\n/g, "<br>")}</p>`,
        });
      } catch (emailErr) {
        console.error("Email sending failed:", emailErr);
      }
    }

    return NextResponse.json(
      { success: true, message: "Message envoyé avec succès" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Contact error:", error);
    return NextResponse.json(
      { success: false, message: "Erreur lors de l'envoi" },
      { status: 500 }
    );
  }
}
