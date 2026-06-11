import { describe, it, expect } from "vitest";
import { validateField, validateStep } from "./validation";
import { Field } from "./types";

function field(overrides: Partial<Field> & { id: string; type: Field["type"] }): Field {
  return overrides as Field;
}

describe("validateField", () => {
  it("returns null when no validation rules", () => {
    const f = field({ id: "name", type: "text" });
    expect(validateField(f, "hello")).toBeNull();
  });

  it("catches undefined for required", () => {
    const f = field({
      id: "x",
      type: "text",
      validation: [{ type: "required", message: "Required" }],
    });
    expect(validateField(f, undefined as unknown as string)).toEqual({
      fieldId: "x",
      message: "Required",
    });
  });

  it("catches empty string for required", () => {
    const f = field({
      id: "x",
      type: "text",
      validation: [{ type: "required", message: "Required" }],
    });
    expect(validateField(f, "")).toEqual({
      fieldId: "x",
      message: "Required",
    });
  });

  it("passes non-empty string for required", () => {
    const f = field({
      id: "x",
      type: "text",
      validation: [{ type: "required", message: "Required" }],
    });
    expect(validateField(f, "hello")).toBeNull();
  });

  it("catches empty array for required checkbox", () => {
    const f = field({
      id: "x",
      type: "checkbox",
      options: [{ value: "a", label: "A" }],
      validation: [{ type: "required", message: "Required" }],
    });
    expect(validateField(f, [])).toEqual({
      fieldId: "x",
      message: "Required",
    });
  });

  it("passes non-empty array for required checkbox", () => {
    const f = field({
      id: "x",
      type: "checkbox",
      options: [{ value: "a", label: "A" }],
      validation: [{ type: "required", message: "Required" }],
    });
    expect(validateField(f, ["a"])).toBeNull();
  });

  it("catches invalid email", () => {
    const f = field({
      id: "email",
      type: "email",
      validation: [{ type: "email", message: "Bad email" }],
    });
    expect(validateField(f, "not-an-email")).toEqual({
      fieldId: "email",
      message: "Bad email",
    });
  });

  it("passes valid email", () => {
    const f = field({
      id: "email",
      type: "email",
      validation: [{ type: "email", message: "Bad email" }],
    });
    expect(validateField(f, "test@example.com")).toBeNull();
  });

  it("skips email validation when value is empty", () => {
    const f = field({
      id: "email",
      type: "email",
      validation: [{ type: "email", message: "Bad email" }],
    });
    expect(validateField(f, "")).toBeNull();
  });

  it("catches minLength", () => {
    const f = field({
      id: "x",
      type: "text",
      validation: [{ type: "minLength", value: 3, message: "Too short" }],
    });
    expect(validateField(f, "ab")).toEqual({
      fieldId: "x",
      message: "Too short",
    });
  });

  it("passes sufficient length for minLength", () => {
    const f = field({
      id: "x",
      type: "text",
      validation: [{ type: "minLength", value: 3, message: "Too short" }],
    });
    expect(validateField(f, "abc")).toBeNull();
  });
});

describe("validateStep", () => {
  it("validates all fields in a step", () => {
    const fields: Field[] = [
      field({
        id: "a",
        type: "text",
        validation: [{ type: "required", message: "A required" }],
      }),
      field({
        id: "b",
        type: "text",
        validation: [{ type: "required", message: "B required" }],
      }),
    ];
    const errors = validateStep(fields, {});
    expect(errors).toHaveLength(2);
  });

  it("skips fields hidden by showIf", () => {
    const fields: Field[] = [
      field({
        id: "a",
        type: "text",
        validation: [{ type: "required", message: "A required" }],
      }),
      field({
        id: "b",
        type: "text",
        showIf: (a) => a.a === "yes",
        validation: [{ type: "required", message: "B required" }],
      }),
    ];
    // a has value, b is hidden → 0 errors
    expect(validateStep(fields, { a: "no" })).toHaveLength(0);
    // a has value, b is visible and empty → 1 error
    expect(validateStep(fields, { a: "yes" })).toHaveLength(1);
  });
});
