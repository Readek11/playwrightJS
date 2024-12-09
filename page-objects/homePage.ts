import { Page } from "@playwright/test";
import { CommonPage } from "./commonPage";

declare module "my-fixtures" {
  interface MyFixtures {
    homePage: HomePage;
  }
}

export const useHomePage = async ({ page }, use) =>
  await use(new HomePage(page));

class HomePage extends CommonPage {
  constructor(page: Page) {
    super(page);
  }

  public async clickConsentButtonIfVisible() {
    const consentButton = this.page.getByRole("button", {
      name: "Consent",
    });
    if (await consentButton.isVisible()) {
      await consentButton.click();
    } else {
      console.log("No consent button to click");
    }
  }

  public async clickLogoutButton() {
    await this.page.getByText("Logout").click();
  }

  public async clickDeleteAccountButton() {
    await this.page.getByText("Delete Account").click();
  }

  public async visitLoginPage() {
    await this.page.getByText("Signup / Login").click();
  }

  public async visitContactPage() {
    await this.page.getByText("Contact us").click();
  }

  public async visitTestCasesPage() {
    await this.page
      .getByRole("link", { name: "Test Cases", exact: true })
      .click();
  }

  public async visitProductsPage() {
    await this.page.getByText("Products").click();
  }
}
