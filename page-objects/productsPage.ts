import { CommonPage } from "./commonPage";
import { expect, Page } from "@playwright/test";
import { ProductDetails } from "models/models";

declare module "my-fixtures" {
  interface MyFixtures {
    productsPage: ProductsPage;
  }
}

export const useProductsPage = async ({ page }, use) =>
  await use(new ProductsPage(page));

class ProductsPage extends CommonPage {
  constructor(page: Page) {
    super(page);
  }

  private getSearchProductInput() {
    return this.page.locator("[id=search_product]");
  }

  private getSearchProductButton() {
    return this.page.locator("[id=submit_search]");
  }

  public async verifyProductWasFound(name: string) {
    const products = this.page.locator(".single-products");
    await expect(products).toHaveCount(1);
    await expect(products).toContainText(name);
    await expect(products).toBeVisible();
  }

  public async verifyAllProductsVisibility() {
    const productsLocators = this.page.locator(".single-products");
    for (let i = 0; i < (await productsLocators.count()); i++) {
      await expect(productsLocators.nth(i)).toBeVisible();
    }
  }

  public async visitProductPage(productId: string) {
    await this.page.locator(`a[href="/product_details/${productId}"]`).click();
    await expect(this.page).toHaveURL(`/product_details/${productId}`);
  }

  public async confirmProductDetails(productDetails: ProductDetails) {
    for (const detail in productDetails) {
      await this.verifyTextVisibility(detail);
    }
  }

  public async SearchForProduct(productName: string) {
    await this.getSearchProductInput().fill(productName);
    await this.getSearchProductButton().click();
  }
}
