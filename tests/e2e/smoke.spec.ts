import { expect, test } from "@playwright/test";

test("home page routes beginners to Start Here", async ({ page }) => {
  await page.goto("/");

  await expect(
    page.getByRole("heading", { name: /see how react and next\.js work under the hood/i }),
  ).toBeVisible();

  await page.getByRole("link", { name: /start learning visually/i }).click();
  await expect(page).toHaveURL(/\/start$/);
  await expect(page.getByRole("heading", { name: /simple first path/i })).toBeVisible();
});

test("render cycle visualizer advances through steps", async ({ page }) => {
  await page.goto("/visualizers/react-render-cycle");

  await expect(page.getByRole("heading", { name: "React Render Cycle" })).toBeVisible();
  await expect(page.getByText("Step 1 of")).toBeVisible();

  await page.getByRole("button", { name: "Next", exact: true }).click();
  await expect(page.getByText("Step 2 of")).toBeVisible();

  await page.getByRole("button", { name: "Reset", exact: true }).click();
  await expect(page.getByText("Step 1 of")).toBeVisible();
});

test("route map explorer shows app router details", async ({ page }) => {
  await page.goto("/route-map");

  await expect(page.getByRole("heading", { name: /app router files become routes/i })).toBeVisible();
  await expect(page.getByText("/products/42").first()).toBeVisible();
  await expect(page.getByText("Server Component").first()).toBeVisible();
});

test("playground validates a guided challenge", async ({ page }) => {
  await page.goto("/playground");

  await expect(page.getByRole("heading", { name: /practice by fixing code/i })).toBeVisible();
  await page.getByRole("button", { name: /check answer/i }).click();
  await expect(page.locator("pre")).toBeVisible();
  await page.locator("#practice-code").fill("setCount((current) => current + 1);");
  await expect(page.getByText(/looks close/i)).toBeVisible();
});

test("support pages are reachable", async ({ page }) => {
  await page.goto("/start");
  await expect(page.getByRole("heading", { name: /simple first path/i })).toBeVisible();

  await page.goto("/compare");
  await expect(page.getByRole("heading", { name: /compare confusing frontend concepts/i })).toBeVisible();

  await page.goto("/glossary");
  await expect(page.getByRole("heading", { name: /simple words for confusing react/i })).toBeVisible();
});
