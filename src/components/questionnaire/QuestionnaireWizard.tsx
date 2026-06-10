"use client";

import { useState, useCallback, useMemo } from "react";
import { ValidationError } from "../../lib/questionnaire/types";
import { validateStep } from "../../lib/questionnaire/validation";
import { getQuestionnaire } from "../../lib/questionnaire/translations";
import { FieldRenderer } from "./FieldRenderer";

interface QuestionnaireWizardProps {
  lang: "fr" | "en";
}

export function QuestionnaireWizard({ lang }: QuestionnaireWizardProps) {
  const questionnaire = useMemo(() => getQuestionnaire(lang), [lang]);

  const [stepIndex, setStepIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string | string[]>>({});
  const [errors, setErrors] = useState<ValidationError[]>([]);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const visibleSteps = useMemo(
    () => questionnaire.filter((s) => !s.showIf || s.showIf(answers)),
    [questionnaire, answers]
  );

  const totalSteps = visibleSteps.length;
  const currentStep = visibleSteps[stepIndex];

  const visibleFields = useMemo(
    () => currentStep.fields.filter((f) => !f.showIf || f.showIf(answers)),
    [currentStep, answers]
  );

  const handleChange = useCallback(
    (id: string, value: string | string[]) => {
      setAnswers((prev) => ({ ...prev, [id]: value }));
      setErrors((prev) => prev.filter((e) => e.fieldId !== id));
    },
    []
  );

  const goNext = useCallback(() => {
    const stepErrors = validateStep(currentStep.fields, answers);
    if (stepErrors.length > 0) {
      setErrors(stepErrors);
      return;
    }
    setErrors([]);
    setStepIndex((i) => Math.min(i + 1, totalSteps - 1));
  }, [currentStep.fields, answers, totalSteps]);

  const goPrev = useCallback(() => {
    setErrors([]);
    setStepIndex((i) => Math.max(i - 1, 0));
  }, []);

  const handleSubmit = useCallback(async () => {
    const allErrors: ValidationError[] = [];
    for (const step of visibleSteps) {
      const stepErrors = validateStep(step.fields, answers);
      allErrors.push(...stepErrors);
    }

    for (const step of visibleSteps) {
      for (const field of step.fields) {
        if (field.showIf && !field.showIf(answers)) continue;
        if (field.validation) {
          for (const rule of field.validation) {
            if (rule.type === "required") {
              const val = answers[field.id];
              if (val === undefined || val === null || val === "" || (Array.isArray(val) && val.length === 0)) {
                if (!allErrors.some((e) => e.fieldId === field.id)) {
                  allErrors.push({ fieldId: field.id, message: rule.message });
                }
              }
            }
          }
        }
      }
    }

    if (allErrors.length > 0) {
      setErrors(allErrors);
      return;
    }

    setSubmitting(true);

    try {
      const res = await fetch("/api/submit-questionnaire", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(answers),
      });

      const data = await res.json();

      if (!res.ok) {
        console.error("Submission failed:", data.message);
        setSubmitting(false);
        return;
      }

      setSubmitting(false);
      setSubmitted(true);
    } catch (err) {
      console.error("Submission error:", err);
      setSubmitting(false);
    }
  }, [visibleSteps, answers]);

  // Build step labels and submit button text based on language
  const stepLabel = lang === "fr" ? "Étape" : "Step";
  const prevLabel = lang === "fr" ? "Précédent" : "Previous";
  const nextLabel = lang === "fr" ? "Suivant" : "Next";
  const submitLabel = lang === "fr" ? "Soumettre" : "Submit";
  const submittingLabel = lang === "fr" ? "Envoi en cours..." : "Submitting...";
  const successTitle =
    lang === "fr"
      ? "Questionnaire soumis avec succès !"
      : "Questionnaire submitted successfully!";
  const successDesc =
    lang === "fr"
      ? "Merci pour votre participation."
      : "Thank you for your participation.";
  const progressLabel = lang === "fr" ? "/" : "of";

  if (submitted) {
    return (
      <div className="mx-auto max-w-2xl px-4 py-16 text-center">
        <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-green-100 text-3xl text-green-600">
          ✓
        </div>
        <h2 className="mb-2 text-2xl font-bold text-dark">{successTitle}</h2>
        <p className="text-dark/70">{successDesc}</p>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-2xl px-4 py-8">
      {/* Progress */}
      <div className="mb-8">
        <div className="mb-2 flex items-center justify-between text-sm text-dark/60">
          <span>
            {stepLabel} {stepIndex + 1} {progressLabel} {totalSteps}
          </span>
          <span>{Math.round(((stepIndex + 1) / totalSteps) * 100)}%</span>
        </div>
        <div className="h-2 overflow-hidden rounded-full bg-neutralAlt">
          <div
            className="h-full rounded-full bg-primary transition-all duration-500"
            style={{
              width: `${((stepIndex + 1) / totalSteps) * 100}%`,
            }}
          />
        </div>
      </div>

      {/* Step content */}
      <div key={currentStep.id} className="animate-fadeIn">
        <h2 className="mb-1 text-2xl font-bold text-dark">
          {currentStep.title}
        </h2>
        {currentStep.description && (
          <p className="mb-6 text-dark/60">{currentStep.description}</p>
        )}

        <div className="space-y-6">
          {visibleFields.map((field) => (
            <FieldRenderer
              key={field.id}
              field={field}
              value={answers[field.id]}
              error={errors.find((e) => e.fieldId === field.id) || null}
              onChange={handleChange}
            />
          ))}
        </div>
      </div>

      {/* Navigation */}
      <div className="mt-8 flex items-center justify-between border-t border-neutralAlt pt-6">
        <button
          type="button"
          onClick={goPrev}
          disabled={stepIndex === 0}
          className="rounded-lg border border-neutralAlt px-6 py-2.5 font-medium text-dark transition hover:bg-neutralAlt/50 disabled:opacity-30 disabled:cursor-not-allowed"
        >
          {prevLabel}
        </button>

        {stepIndex < totalSteps - 1 ? (
          <button
            type="button"
            onClick={goNext}
            className="rounded-lg bg-primary px-6 py-2.5 font-medium text-light transition hover:opacity-90"
          >
            {nextLabel}
          </button>
        ) : (
          <button
            type="button"
            onClick={handleSubmit}
            disabled={submitting}
            className="inline-flex items-center rounded-lg bg-primary px-6 py-2.5 font-medium text-light transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {submitting && (
              <svg className="mr-2 inline h-4 w-4 animate-spin" viewBox="0 0 24 24" fill="none">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
              </svg>
            )}
            {submitting ? submittingLabel : submitLabel}
          </button>
        )}
      </div>
    </div>
  );
}
