import { Page } from "@playwright/test";

export abstract class CommonPage {
  protected readonly page: Page;

  protected constructor(page: Page) {
    this.page = page;
  }

  public async verifyTextVisibility(text: string) {
    await this.page.getByText(text).isVisible();
  }
}
