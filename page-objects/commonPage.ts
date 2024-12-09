import { Page } from "@playwright/test";

export abstract class CommonPage {
  protected readonly page: Page;

  protected constructor(page: Page) {
    this.page = page;
  }

  public async verifyTextVisibility(text: string, exact: boolean = true) {
    await this.page.getByText(text, { exact }).isVisible();
  }
}
