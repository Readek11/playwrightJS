import { CommonPage } from "./commonPage";
import { expect, Page } from "@playwright/test";
import { TEXT } from "constants/consts";

declare module "my-fixtures" {
  interface MyFixtures {
    testCasesPage: TestCasesPage;
  }
}

export const useTestCasesPage = async ({ page }, use) =>
  await use(new TestCasesPage(page));

class TestCasesPage extends CommonPage {
  constructor(page: Page) {
    super(page);
  }

  async verifyTestCasesTitleVisibility() {
    await expect(
      this.page.locator("h2.title").filter({ hasText: TEXT.TEST_CASES_TITLE }),
    ).toBeVisible();
  }
}
