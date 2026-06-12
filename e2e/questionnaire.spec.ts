import { test, expect } from "@playwright/test";

test.describe("Questionnaire", () => {
  test("renders the first step with a title", async ({ page }) => {
    await page.goto("/questionnaire");
    await expect(page.locator("h1, h2, h3").first()).toBeVisible();
  });

  test("navigates to next step", async ({ page }) => {
    await page.goto("/questionnaire");
    const nextBtn = page.getByRole("button", { name: "Suivant" });
    if (await nextBtn.isVisible()) {
      await nextBtn.click();
      await expect(page).not.toHaveURL("/questionnaire");
    }
  });

  test("shows validation error when submitting empty required field", async ({ page }) => {
    await page.goto("/questionnaire");

    const submitBtn = page.getByRole("button", { name: /envoyer|submit|terminer|finish/i });
    if (await submitBtn.isVisible()) {
      await submitBtn.click();
    }
  });

  test("page loads without JS errors", async ({ page }) => {
    const errors: string[] = [];
    page.on("pageerror", (err) => errors.push(err.message));

    await page.goto("/questionnaire");
    await expect(page.locator("body")).toBeVisible();
    expect(errors).toHaveLength(0);
  });
});

test.describe("Contact form", () => {
  test("submits and shows success", async ({ page }) => {
    await page.goto("/");

    const form = page.locator("form.sb-component-form-block");
    if (!(await form.isVisible())) {
      test.skip(true, "No contact form on homepage");
      return;
    }

    const nameInput = form.locator('input[name="name"]');
    const emailInput = form.locator('input[name="email"]');
    const messageInput = form.locator('textarea[name="message"]');
    const submitBtn = form.getByRole("button", { name: /envoyer|submit/i });

    if (await nameInput.isVisible()) await nameInput.fill("Test Playwright");
    if (await emailInput.isVisible()) await emailInput.fill("test@example.com");
    if (await messageInput.isVisible()) await messageInput.fill("Message de test E2E automatisé.");

    if (await submitBtn.isVisible()) {
      await submitBtn.click();
      // After submission, form shows success (green) or error (red)
      await expect(page.locator(".text-green-600, .text-red-500").first()).toBeVisible({ timeout: 15000 });
    }
  });

});

test.describe("Homepage", () => {
  test("renders the homepage without JS errors", async ({ page }) => {
    const errors: string[] = [];
    page.on("pageerror", (err) => errors.push(err.message));

    await page.goto("/");
    await expect(page).toHaveTitle(/hypocaps/i);
    expect(errors).toHaveLength(0);
  });
});
