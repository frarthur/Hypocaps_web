import { describe, it, expect } from "vitest";
import { getQuestionnaire, getTexts } from "./translations";

describe("getTexts", () => {
  it("returns French texts", () => {
    const t = getTexts("fr");
    expect(t.resucrageTitle).toBe("Habitudes de resucrage");
    expect(t.resucrageTitleRelative).toBe("Votre proche et le resucrage");
    expect(t.uses_resucrage_relative.options).toHaveLength(4);
    expect(t.uses_resucrage_relative.options.map((o) => o.value)).toContain("dont_know");
  });

  it("returns English texts", () => {
    const t = getTexts("en");
    expect(t.uses_resucrage_relative.label).toContain("person you know");
    expect(t.would_try_neutral_taste_relative.options.map((o) => o.value)).toContain("dont_know");
  });
});

describe("getQuestionnaire — relative path", () => {
  const q = getQuestionnaire("fr");

  it("shows resucrage step for relative", () => {
    const step = q.find((s) => s.id === "resucrage_habits")!;
    expect(step.showIf!({ concern_diabetes: "relative" })).toBe(true);
    expect(step.showIf!({ concern_diabetes: "no" })).toBe(false);
  });

  it("uses relative title when concern_diabetes is relative", () => {
    const step = q.find((s) => s.id === "resucrage_habits")!;
    const title =
      typeof step.title === "function" ? step.title({ concern_diabetes: "relative" }) : step.title;
    expect(title).toBe("Votre proche et le resucrage");
  });

  it("uses personal title when concern_diabetes is yes", () => {
    const step = q.find((s) => s.id === "resucrage_habits")!;
    const title =
      typeof step.title === "function" ? step.title({ concern_diabetes: "yes" }) : step.title;
    expect(title).toBe("Habitudes de resucrage");
  });

  it("uses_resucrage label changes for relative", () => {
    const step = q.find((s) => s.id === "resucrage_habits")!;
    const field = step.fields.find((f) => f.id === "uses_resucrage")!;
    const label =
      typeof field.label === "function"
        ? field.label({ concern_diabetes: "relative" })
        : field.label;
    expect(label).toContain("personne que vous connaissez");
  });

  it("uses_resucrage has dont_know option for relative", () => {
    const step = q.find((s) => s.id === "resucrage_habits")!;
    const field = step.fields.find((f) => f.id === "uses_resucrage")!;
    expect(field.type).toBe("select");
    if (field.type === "select") {
      const options =
        typeof field.options === "function"
          ? field.options({ concern_diabetes: "relative" })
          : field.options;
      expect(options.map((o) => o.value)).toContain("dont_know");
    }
  });

  it("would_try_neutral_taste shows for relative", () => {
    const step = q.find((s) => s.id === "general_opinion")!;
    const field = step.fields.find((f) => f.id === "would_try_neutral_taste")!;
    expect(field.showIf!({ concern_diabetes: "relative" })).toBe(true);
    expect(field.showIf!({ concern_diabetes: "no" })).toBe(false);
  });

  it("would_try_neutral_taste label changes for relative", () => {
    const step = q.find((s) => s.id === "general_opinion")!;
    const field = step.fields.find((f) => f.id === "would_try_neutral_taste")!;
    const label =
      typeof field.label === "function"
        ? field.label({ concern_diabetes: "relative" })
        : field.label;
    expect(label).toContain("cette personne");
  });
});
