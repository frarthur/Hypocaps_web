const required = [
  "NEXT_PUBLIC_SUPABASE_URL",
  "NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY",
  "NEXT_PUBLIC_ALGOLIA_APP_ID",
  "NEXT_PUBLIC_ALGOLIA_INDEX_NAME",
  "NEXT_PUBLIC_ALGOLIA_SEARCH_API_KEY",
];

const optional = ["SMTP_HOST", "SMTP_USER", "SMTP_PASS", "CONTACT_EMAIL"];

const missing = [];

for (const key of required) {
  if (!process.env[key]) {
    missing.push(key);
  }
}

if (missing.length > 0) {
  console.error("Missing required environment variables:\n  " + missing.join("\n  "));
  process.exit(1);
}

const present = required.filter((k) => process.env[k]);
const optionalPresent = optional.filter((k) => process.env[k]);

console.log("Required env vars: " + present.length + "/" + required.length);
if (optionalPresent.length > 0) {
  console.log("Optional env vars present: " + optionalPresent.join(", "));
}
