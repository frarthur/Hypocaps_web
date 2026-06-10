"use client";

import { useState } from "react";
import { QuestionnaireWizard } from "../../components/questionnaire/QuestionnaireWizard";

export default function QuestionnairePage() {
  const [lang, setLang] = useState<"fr" | "en">("fr");

  const toggleLang = () => setLang((l) => (l === "fr" ? "en" : "fr"));

  return (
    <main className="min-h-screen py-12">
      <div className="mx-auto max-w-3xl px-4">
        <div className="mb-8 text-center">
          <div className="mb-4 flex items-center justify-center gap-3">
            <h1 className="text-3xl font-bold text-dark">
              {lang === "fr" ? "Questionnaire Hypocaps" : "Hypocaps Questionnaire"}
            </h1>
            <button
              onClick={toggleLang}
              className="rounded-md border border-neutralAlt px-3 py-1 text-sm font-medium text-dark/60 transition hover:border-primary hover:text-primary"
              title={lang === "fr" ? "Switch to English" : "Passer en français"}
            >
              {lang === "fr" ? "EN" : "FR"}
            </button>
          </div>
          <p className="text-dark/60">
            {lang === "fr"
              ? "Étude sur la gestion de l'hypoglycémie et les habitudes de resucrage"
              : "Study on hypoglycemia management and glucose rescue habits"}
          </p>
        </div>
        <div className="rounded-2xl border border-neutralAlt bg-white shadow-sm">
          <QuestionnaireWizard lang={lang} />
        </div>
      </div>
    </main>
  );
}
