import "../css/main.css";
import SiteLayout from "../components/questionnaire/SiteLayout";
import { Analytics } from "@vercel/analytics/next";

export const metadata = {
  title: "Questionnaire Hypocaps",
  description: "Étude sur l'hypoglycémie et le resucrage",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr">
      <body className="bg-light text-dark antialiased">
        <SiteLayout>{children}</SiteLayout>
        <Analytics />
      </body>
    </html>
  );
}
