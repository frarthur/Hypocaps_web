import { NextRequest, NextResponse } from "next/server";
import { getSupabase } from "../../../lib/supabase/client";

export const dynamic = "force-dynamic";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function validateContact(body: Record<string, unknown>): string | null {
  if (typeof body.name !== "string" || body.name.trim().length === 0) {
    return "Le nom est requis";
  }
  if (body.name.length > 200) {
    return "Le nom est trop long";
  }
  if (typeof body.email !== "string" || !EMAIL_RE.test(body.email)) {
    return "Email invalide";
  }
  if (body.email.length > 320) {
    return "Email trop long";
  }
  if (typeof body.message !== "string" || body.message.trim().length === 0) {
    return "Le message est requis";
  }
  if (body.message.length > 10000) {
    return "Le message est trop long (max 10 000 caractères)";
  }
  return null;
}

export async function POST(request: NextRequest) {
  try {
    const body: Record<string, unknown> = await request.json();

    const validationError = validateContact(body);
    if (validationError) {
      return NextResponse.json(
        { success: false, message: validationError },
        { status: 400 }
      );
    }

    const supabase = getSupabase();

    const payload: Record<string, string> = {
      name: body.name as string,
      email: body.email as string,
      message: body.message as string,
    };

    const { error } = await supabase
      .from("contact_messages")
      .insert(payload as never);

    if (error) {
      console.error("Supabase insert error:", error);
      return NextResponse.json(
        { success: false, message: "Erreur lors de l'envoi" },
        { status: 500 }
      );
    }

    if (
      process.env.SMTP_HOST &&
      process.env.SMTP_USER &&
      process.env.SMTP_PASS
    ) {
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
