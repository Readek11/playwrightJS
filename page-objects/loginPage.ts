import { Locator, Page } from "@playwright/test";
import { CommonPage } from "./commonPage";

export class LoginPage extends CommonPage {
  private readonly testId = {
    signupName: "signup-name",
    signupEmail: "signup-email",
    signupButton: "signup-button",
    loginEmail: "login-email",
    loginPassword: "login-password",
    loginButton: "login-button",
  };

  constructor(page: Page) {
    super(page);
  }

  private getSignupNameInput(): Locator {
    return this.page.getByTestId(this.testId.signupName);
  }

  private getSignupEmailInput(): Locator {
    return this.page.getByTestId(this.testId.signupEmail);
  }

  private getSignupButton(): Locator {
    return this.page.getByTestId(this.testId.signupButton);
  }

  private getLoginEmailInput(): Locator {
    return this.page.getByTestId(this.testId.loginEmail);
  }

  private getPasswordInput(): Locator {
    return this.page.getByTestId(this.testId.loginPassword);
  }

  private getLoginButton(): Locator {
    return this.page.getByTestId(this.testId.loginButton);
  }

  public async fillInSignupNameAndEmail(name: string, email: string) {
    await this.getSignupNameInput().fill(name);
    await this.getSignupEmailInput().fill(email);
  }

  public async clickLoginButton() {
    await this.getLoginButton().click();
  }

  public async fillInLoginCredentials(email: string, password: string) {
    await this.getLoginEmailInput().fill(email);
    await this.getPasswordInput().fill(password);
  }

  public async clickSignupButton() {
    await this.getSignupButton().click();
  }
}
