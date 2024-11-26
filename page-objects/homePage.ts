import { Page } from "@playwright/test";
import { CommonPage } from "./commonPage";

export class HomePage extends CommonPage {
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

  public async clickDeleteAccountButton() {
    await this.page.getByText("Delete Account").click();
  }

  public async visitSignUpLoginPage() {
    await this.page.getByText("Signup / Login").click();
  }
}
