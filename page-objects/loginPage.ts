import { Locator, Page } from "@playwright/test";
import { AccountDetails } from "../models";
import { CommonPage } from "./commonPage";

export class LoginPage extends CommonPage {
  private readonly testId = {
    name: "signup-name",
    email: "signup-email",
    submit: "signup-button",
  };

  constructor(page: Page) {
    super(page);
  }

  private getNameInput(): Locator {
    return this.page.getByTestId(this.testId.name);
  }

  private getEmailInput(): Locator {
    return this.page.getByTestId(this.testId.email);
  }

  private getSignupButton(): Locator {
    return this.page.getByTestId(this.testId.submit);
  }

  public async verifyTextVisibility(text: string) {
    await this.page.getByText(text).isVisible();
  }

  public async fillInNameAndEmail(data: AccountDetails) {
    await this.getNameInput().fill(data.name);
    await this.getEmailInput().fill(data.email);
  }

  public async clickSignupButton() {
    await this.getSignupButton().click();
  }
}
