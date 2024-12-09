import { CommonPage } from "./commonPage";
import { Locator, Page } from "@playwright/test";
import { ContactDetails } from "../models";

export class ContactFormPage extends CommonPage {
  private readonly testId = {
    name: "name",
    email: "email",
    subject: "subject",
    message: "message",
    submitButton: "submit-button",
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

  private getSubjectInput(): Locator {
    return this.page.getByTestId(this.testId.subject);
  }

  private getMessageInput(): Locator {
    return this.page.getByTestId(this.testId.message);
  }

  private getSubmitButton(): Locator {
    return this.page.getByTestId(this.testId.submitButton);
  }

  private getHomeButton(): Locator {
    return this.page.getByText("Home");
  }

  private getUploadFileField(): Locator {
    return this.page.locator('input[type="file"]');
  }

  public async fillInContactForm(data: ContactDetails) {
    await this.getNameInput().fill(data.name);
    await this.getEmailInput().fill(data.email);
    await this.getSubjectInput().fill(data.subject);
    await this.getMessageInput().fill(data.message);
  }

  public async uploadFile(filePath: string) {
    await this.getUploadFileField().setInputFiles(filePath);
  }

  public async clickSubmitButton() {
    await this.getSubmitButton().click();
  }

  public async clickHomeButton() {
    await this.getHomeButton().click();
  }
}
