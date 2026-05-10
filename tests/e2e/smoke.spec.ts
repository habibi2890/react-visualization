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

test("command menu jumps to lessons and routes", async ({ page }) => {
  await page.goto("/");

  await page.getByRole("button", { name: /search/i }).click();
  await expect(page.getByRole("dialog", { name: /command menu/i })).toBeVisible();
  await page.getByLabel(/search pages/i).fill("route map");
  await page.getByRole("link", { name: /next\.js route map/i }).click();
  await expect(page).toHaveURL(/\/route-map$/);

  await page.getByRole("button", { name: /search/i }).click();
  await page.getByLabel(/search pages/i).fill("props visualizer");
  await page.getByRole("link", { name: /react props vs state visualizer/i }).click();
  await expect(page).toHaveURL(/\/visualizers\/props-vs-state$/);
});

test("render cycle visualizer advances through steps", async ({ page }) => {
  await page.goto("/visualizers/react-render-cycle");

  await expect(page.getByRole("heading", { name: "React Render Cycle", exact: true })).toBeVisible();
  await expect(page.getByText("Step 1 of")).toBeVisible();
  await expect(page.getByText(/shortcuts:/i)).toBeVisible();

  await page.getByRole("button", { name: "Next", exact: true }).click();
  await expect(page.getByText("Step 2 of")).toBeVisible();

  await page.keyboard.press("ArrowRight");
  await expect(page.getByText("Step 3 of")).toBeVisible();

  await page.keyboard.press("ArrowLeft");
  await expect(page.getByText("Step 2 of")).toBeVisible();

  await page.keyboard.press("Home");
  await expect(page.getByText("Step 1 of")).toBeVisible();

  await expect(page.getByRole("heading", { name: /ready to lock in this concept/i })).toBeVisible();
  await page.getByRole("button", { name: /mark lesson complete/i }).click();
  await expect(page.getByText(/nice work/i)).toBeVisible();
  await expect(page.getByRole("link", { name: /react keys & list diffing/i })).toBeVisible();
});

test("concept detail includes completion guidance", async ({ page }) => {
  await page.goto("/concepts/use-effect-dependency-array");

  await expect(page.getByRole("heading", { name: "useEffect Dependency Array", exact: true })).toBeVisible();
  await expect(page.getByRole("heading", { name: /my notes for useeffect dependency array/i })).toBeVisible();
  await expect(page.getByRole("heading", { name: /ready to lock in this concept/i })).toBeVisible();
  await expect(page.getByRole("link", { name: /review full path/i })).toBeVisible();
});

test("lesson notes persist per lesson", async ({ page }) => {
  await page.goto("/visualizers/props-vs-state");

  await page.getByLabel("Lesson note").fill("Props flow down, state lives where changes happen.");
  await expect(page.getByText(/50 characters saved locally/i)).toBeVisible();

  await page.reload();
  await expect(page.getByLabel("Lesson note")).toHaveValue("Props flow down, state lives where changes happen.");
});

test("bookmarks page shows a note-aware review queue", async ({ page }) => {
  await page.goto("/bookmarks");

  await expect(page.getByRole("heading", { name: /saved concepts for review/i })).toBeVisible();
  await expect(page.getByText("Review queue", { exact: true })).toBeVisible();
  await expect(page.getByText(/props flow down\. state lives where changes happen/i)).toBeVisible();
  await expect(page.getByRole("link", { name: /review visualizer/i })).toHaveAttribute(
    "href",
    "/visualizers/props-vs-state",
  );
});

test("learning path highlights progress and next lesson", async ({ page }) => {
  await page.goto("/paths/react-beginner");

  await expect(page.getByRole("heading", { name: "React Beginner" })).toBeVisible();
  await expect(page.getByText(/your next best step is ready/i)).toBeVisible();
  await expect(page.getByText(/1\/4 lessons complete/i)).toBeVisible();
  await expect(page.getByText(/current/i).first()).toBeVisible();
  await expect(page.getByRole("link", { name: "Continue next lesson" })).toHaveAttribute(
    "href",
    "/visualizers/react-render-cycle",
  );
});

test("dashboard shows a resume learning plan", async ({ page }) => {
  await page.goto("/dashboard");

  await expect(page.getByRole("heading", { name: /today, make one invisible react idea visible/i })).toBeVisible();
  await expect(page.getByText(/today's learning plan/i)).toBeVisible();
  await expect(page.getByRole("heading", { name: /continue with react render cycle/i })).toBeVisible();
  await expect(page.getByRole("link", { name: /resume lesson/i })).toHaveAttribute(
    "href",
    "/visualizers/react-render-cycle",
  );
  await expect(page.getByRole("link", { name: /practice code/i })).toHaveAttribute("href", "/playground");
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
