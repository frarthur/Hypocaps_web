"use client";

import { useState, useCallback, useMemo } from "react";
import { ValidationError } from "../../lib/questionnaire/types";
import { validateStep } from "../../lib/questionnaire/validation";
import { questionnaire } from "../../lib/questionnaire/schema";
import { FieldRenderer } from "./FieldRenderer";

export function QuestionnaireWizard() {
  const [stepIndex, setStepIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string | string[]>>(
    {}
  );
  const [errors, setErrors] = useState<ValidationError[]>([]);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const totalSteps = questionnaire.length;
  const currentStep = questionnaire[stepIndex];

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
    for (const step of questionnaire) {
      const stepErrors = validateStep(step.fields, answers);
      allErrors.push(...stepErrors);
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

      console.log("Questionnaire submission successful");
      setSubmitting(false);
      setSubmitted(true);
    } catch (err) {
      console.error("Submission error:", err);
      setSubmitting(false);
    }
  }, [questionnaire, answers]);

  if (submitted) {
    return (
      <div className="mx-auto max-w-2xl px-4 py-16 text-center">
        <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-green-100 text-3xl text-green-600">
          ✓
        </div>
        <h2 className="mb-2 text-2xl font-bold text-dark">
          Questionnaire soumis avec succès !
        </h2>
        <p className="text-dark/70">
          Merci pour votre participation. Vos réponses ont bien été enregistrées.
        </p>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-2xl px-4 py-8">
      {/* Progress */}
      <div className="mb-8">
        <div className="mb-2 flex items-center justify-between text-sm text-dark/60">
          <span>
            Étape {stepIndex + 1} / {totalSteps}
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
      <div
        key={currentStep.id}
        className="animate-fadeIn"
      >
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
          Précédent
        </button>

        {stepIndex < totalSteps - 1 ? (
          <button
            type="button"
            onClick={goNext}
            className="rounded-lg bg-primary px-6 py-2.5 font-medium text-light transition hover:opacity-90"
          >
            Suivant
          </button>
        ) : (
          <button
            type="button"
            onClick={handleSubmit}
            disabled={submitting}
            className="rounded-lg bg-primary px-6 py-2.5 font-medium text-light transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {submitting ? "Envoi en cours..." : "Soumettre"}
          </button>
        )}
      </div>
    </div>
  );
}
