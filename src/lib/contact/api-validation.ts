import { isValidEmail } from "../validation-utils";

export interface ContactPayload {
  name: string;
  email: string;
  message: string;
}

export function validateContact(body: Record<string, unknown>): string | null {
  if (typeof body.name !== "string" || body.name.trim().length === 0) {
    return "Le nom est requis";
  }
  if (body.name.length > 200) {
    return "Le nom est trop long";
  }
  if (typeof body.email !== "string" || !isValidEmail(body.email)) {
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

export function buildPayload(body: Record<string, unknown>): ContactPayload {
  return {
    name: body.name as string,
    email: body.email as string,
    message: body.message as string,
  };
}
