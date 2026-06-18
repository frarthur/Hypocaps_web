export function isValidEmail(email: string): boolean {
  const atIndex = email.indexOf("@");
  if (atIndex <= 0) return false;
  if (email.indexOf("@", atIndex + 1) !== -1) return false;

  const local = email.slice(0, atIndex);
  const domain = email.slice(atIndex + 1);

  if (!local || !domain) return false;
  if (!domain.includes(".")) return false;
  if (domain.startsWith(".") || domain.endsWith(".")) return false;

  return /^[^\s@]+$/.test(local) && /^[^\s@]+$/.test(domain);
}
