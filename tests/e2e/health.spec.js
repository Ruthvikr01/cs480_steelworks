import { expect, test } from "@playwright/test";

test("e2e: dashboard page renders title and filters", async ({ page }) => {
  await page.goto("/");

  await expect(
    page.getByRole("heading", { name: "Operations Analytics Dashboard" }),
  ).toBeVisible();
  await expect(page.getByLabel("Lot ID")).toBeVisible();
  await expect(page.getByLabel("Start Date")).toBeVisible();
  await expect(page.getByLabel("End Date")).toBeVisible();
  await expect(page.getByRole("button", { name: "Clear Filters" })).toBeVisible();
});

test("e2e: dashboard loads data tables", async ({ page }) => {
  await page.goto("/");

  await expect(page.getByRole("heading", { name: "Lots Production Summary" })).toBeVisible();
  await expect(
    page.getByRole("heading", { name: "Production Line Performance" }),
  ).toBeVisible();
  await expect(page.getByRole("heading", { name: "Top Defects" })).toBeVisible();
});
