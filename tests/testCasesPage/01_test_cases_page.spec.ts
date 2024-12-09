import { test } from "@playwright/test";
import { HomePage } from "../../page-objects/homePage";
import { TEXT } from "../../constants";
import { TestCasesPage } from "../../page-objects/testCasesPage";

test.describe("Test Cases Page", () => {
  test("Visit test cases page, verify correct navigation", async ({ page }) => {
    const homePage = new HomePage(page);
    const testCasesPage = new TestCasesPage(page);

    await page.goto("/");
    await homePage.clickConsentButtonIfVisible();
    await homePage.verifyTextVisibility(TEXT.TITLE);

    await homePage.visitTestCasesPage();
    await testCasesPage.verifyTestCasesTitleVisibility();
  });
});
