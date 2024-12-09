import { test as base } from "@playwright/test";
import { MyFixtures } from "my-fixtures";
import { useHomePage } from "page-objects/homePage";
import { useTestCasesPage } from "page-objects/testCasesPage";
import { TEXT } from "constants/consts";

const test = base.extend<MyFixtures>({
  homePage: useHomePage,
  testCasesPage: useTestCasesPage,
});

test.describe("Test Cases Page", () => {
  test("Visit test cases page, verify correct navigation", async ({
    page,
    homePage,
    testCasesPage,
  }) => {
    await page.goto("/");
    await homePage.clickConsentButtonIfVisible();
    await homePage.verifyTextVisibility(TEXT.TITLE);

    await homePage.visitTestCasesPage();
    await testCasesPage.verifyTestCasesTitleVisibility();
  });
});
