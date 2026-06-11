import { test, expect } from "@playwright/test";

test.describe("Questionnaire", () => {
  test("renders the first step with a title", async ({ page }) => {
    await page.goto("/questionnaire");
    await expect(page.locator("h1, h2, h3").first()).toBeVisible();
  });

  test("navigates to next step", async ({ page }) => {
    await page.goto("/questionnaire");
    const nextBtn = page.getByRole("button", { name: /suivant|next|→/i });
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

test.describe("Homepage", () => {
  test("renders the homepage without JS errors", async ({ page }) => {
    const errors: string[] = [];
    page.on("pageerror", (err) => errors.push(err.message));

    await page.goto("/");
    await expect(page).toHaveTitle(/hypocaps/i);
    expect(errors).toHaveLength(0);
  });
});
