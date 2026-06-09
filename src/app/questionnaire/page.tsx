import { QuestionnaireWizard } from "../../components/questionnaire/QuestionnaireWizard";

export const metadata = {
  title: "Questionnaire - Hypocaps",
  description: "Questionnaire sur l'hypoglycémie et le resucrage",
};

export default function QuestionnairePage() {
  return (
    <main className="min-h-screen py-12">
      <div className="mx-auto max-w-3xl px-4">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-dark">
            Questionnaire Hypocaps
          </h1>
          <p className="mt-2 text-dark/60">
            Étude sur la gestion de l&apos;hypoglycémie et les habitudes de resucrage
          </p>
        </div>
        <div className="rounded-2xl border border-neutralAlt bg-white shadow-sm">
          <QuestionnaireWizard />
        </div>
      </div>
    </main>
  );
}
