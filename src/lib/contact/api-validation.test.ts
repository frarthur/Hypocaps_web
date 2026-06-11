import { describe, it, expect } from "vitest";
import { validateContact, buildPayload } from "./api-validation";

describe("validateContact", () => {
  it("accepts a valid contact payload", () => {
    const error = validateContact({
      name: "John",
      email: "john@example.com",
      message: "Hello",
    });
    expect(error).toBeNull();
  });

  it("rejects missing name", () => {
    const error = validateContact({
      email: "john@example.com",
      message: "Hello",
    });
    expect(error).toBe("Le nom est requis");
  });

  it("rejects empty name", () => {
    const error = validateContact({
      name: "",
      email: "john@example.com",
      message: "Hello",
    });
    expect(error).toBe("Le nom est requis");
  });

  it("rejects name longer than 200", () => {
    const error = validateContact({
      name: "x".repeat(201),
      email: "john@example.com",
      message: "Hello",
    });
    expect(error).toBe("Le nom est trop long");
  });

  it("rejects invalid email", () => {
    const error = validateContact({
      name: "John",
      email: "not-an-email",
      message: "Hello",
    });
    expect(error).toBe("Email invalide");
  });

  it("rejects missing email", () => {
    const error = validateContact({
      name: "John",
      message: "Hello",
    });
    expect(error).toBe("Email invalide");
  });

  it("rejects email longer than 320", () => {
    const error = validateContact({
      name: "John",
      email: `${"a".repeat(315)}@b.com`,
      message: "Hello",
    });
    expect(error).toBe("Email trop long");
  });

  it("rejects missing message", () => {
    const error = validateContact({
      name: "John",
      email: "john@example.com",
    });
    expect(error).toBe("Le message est requis");
  });

  it("rejects empty message", () => {
    const error = validateContact({
      name: "John",
      email: "john@example.com",
      message: "",
    });
    expect(error).toBe("Le message est requis");
  });

  it("rejects message longer than 10000", () => {
    const error = validateContact({
      name: "John",
      email: "john@example.com",
      message: "x".repeat(10001),
    });
    expect(error).toBe("Le message est trop long (max 10 000 caractères)");
  });

  it("accepts message at exactly 10000 chars", () => {
    const error = validateContact({
      name: "John",
      email: "john@example.com",
      message: "x".repeat(10000),
    });
    expect(error).toBeNull();
  });
});

describe("buildPayload", () => {
  it("builds a clean payload", () => {
    const payload = buildPayload({
      name: "John",
      email: "john@example.com",
      message: "Hello world",
    });
    expect(payload).toEqual({
      name: "John",
      email: "john@example.com",
      message: "Hello world",
    });
  });
});
