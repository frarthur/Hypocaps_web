import { describe, it, expect } from "vitest";
import { validateQuestionnaire, buildPayload } from "./api-validation";

describe("validateQuestionnaire", () => {
  it("accepts a valid minimal payload", () => {
    const errors = validateQuestionnaire({
      concern_diabetes: "yes",
      source: "search",
      should_be_reimbursed: "yes",
    });
    expect(errors).toHaveLength(0);
  });

  it("rejects missing required enums", () => {
    const errors = validateQuestionnaire({});
    expect(errors.length).toBeGreaterThanOrEqual(3);
    const fields = errors.map((e) => e.field);
    expect(fields).toContain("concern_diabetes");
    expect(fields).toContain("source");
    expect(fields).toContain("should_be_reimbursed");
  });

  it("rejects invalid concern_diabetes", () => {
    const errors = validateQuestionnaire({
      concern_diabetes: "invalid",
      source: "search",
      should_be_reimbursed: "yes",
    });
    expect(errors).toEqual(
      expect.arrayContaining([{ field: "concern_diabetes", message: "Valeur invalide" }])
    );
  });

  it("rejects invalid source", () => {
    const errors = validateQuestionnaire({
      concern_diabetes: "no",
      source: "invalid",
      should_be_reimbursed: "yes",
    });
    expect(errors).toEqual(
      expect.arrayContaining([{ field: "source", message: "Valeur invalide" }])
    );
  });

  it("rejects invalid should_be_reimbursed", () => {
    const errors = validateQuestionnaire({
      concern_diabetes: "no",
      source: "search",
      should_be_reimbursed: "invalid",
    });
    expect(errors).toEqual(
      expect.arrayContaining([{ field: "should_be_reimbursed", message: "Valeur invalide" }])
    );
  });

  it("rejects non-numeric age", () => {
    const errors = validateQuestionnaire({
      concern_diabetes: "no",
      source: "search",
      should_be_reimbursed: "yes",
      age: "abc",
    });
    expect(errors).toEqual(
      expect.arrayContaining([{ field: "age", message: "L'âge doit contenir uniquement des chiffres" }])
    );
  });

  it("accepts numeric age", () => {
    const errors = validateQuestionnaire({
      concern_diabetes: "no",
      source: "search",
      should_be_reimbursed: "yes",
      age: "25",
    });
    expect(errors).toHaveLength(0);
  });

  it("accepts empty age", () => {
    const errors = validateQuestionnaire({
      concern_diabetes: "no",
      source: "search",
      should_be_reimbursed: "yes",
      age: "",
    });
    expect(errors).toHaveLength(0);
  });

  it("rejects invalid diabetes_type", () => {
    const errors = validateQuestionnaire({
      concern_diabetes: "yes",
      source: "search",
      should_be_reimbursed: "yes",
      diabetes_type: "invalid",
    });
    expect(errors).toEqual(
      expect.arrayContaining([{ field: "diabetes_type", message: "Valeur invalide" }])
    );
  });

  it("accepts valid diabetes_type", () => {
    const errors = validateQuestionnaire({
      concern_diabetes: "yes",
      source: "search",
      should_be_reimbursed: "yes",
      diabetes_type: "type1",
    });
    expect(errors).toHaveLength(0);
  });

  it("rejects empty resucrage_food_types", () => {
    const errors = validateQuestionnaire({
      concern_diabetes: "yes",
      source: "search",
      should_be_reimbursed: "yes",
      uses_resucrage: "always",
      resucrage_food_types: [],
    });
    expect(errors).toEqual(
      expect.arrayContaining([{ field: "resucrage_food_types", message: "Valeur invalide" }])
    );
  });

  it("rejects text longer than 500 for resucrage_problems_other", () => {
    const errors = validateQuestionnaire({
      concern_diabetes: "no",
      source: "search",
      should_be_reimbursed: "yes",
      resucrage_problems_other: "x".repeat(501),
    });
    expect(errors).toEqual(
      expect.arrayContaining([{ field: "resucrage_problems_other", message: "Texte trop long" }])
    );
  });

  it("validates all allowed values for taste", () => {
    for (const value of ["yes", "no", "maybe"]) {
      const errors = validateQuestionnaire({
        concern_diabetes: "no",
        source: "search",
        should_be_reimbursed: "yes",
        would_try_neutral_taste: value,
      });
      expect(errors).toHaveLength(0);
    }
  });

  it("rejects invalid taste value", () => {
    const errors = validateQuestionnaire({
      concern_diabetes: "no",
      source: "search",
      should_be_reimbursed: "yes",
      would_try_neutral_taste: "invalid",
    });
    expect(errors).toEqual(
      expect.arrayContaining([{ field: "would_try_neutral_taste", message: "Valeur invalide" }])
    );
  });
});

describe("buildPayload", () => {
  it("strips undefined/null to null", () => {
    const payload = buildPayload({
      concern_diabetes: "yes",
      source: "search",
      should_be_reimbursed: "yes",
      first_name: undefined,
      email: null,
    });
    expect(payload.first_name).toBeNull();
    expect(payload.email).toBeNull();
  });

  it("passes through valid values", () => {
    const payload = buildPayload({
      concern_diabetes: "yes",
      source: "reddit",
      should_be_reimbursed: "no",
      first_name: "John",
    });
    expect(payload.first_name).toBe("John");
    expect(payload.concern_diabetes).toBe("yes");
  });
});
