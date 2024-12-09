import { test } from "@playwright/test";
import { HomePage } from "../../page-objects/homePage";
import { TEXT } from "../../constants";
import { ProductsPage } from "../../page-objects/productsPage";
import { readFileSync } from "node:fs";

test.describe("Product Page", () => {
  const datasetPath = "./data/product.json";
  const dataset = JSON.parse(readFileSync(datasetPath, "utf-8"));

  test("Visit all products page, confirm visibility of product list, visit product details page, confirm details visibility", async ({
    page,
  }) => {
    const homePage = new HomePage(page);
    const productsPage = new ProductsPage(page);

    await page.goto("/");
    await homePage.clickConsentButtonIfVisible();
    await homePage.verifyTextVisibility(TEXT.TITLE);
    await homePage.visitProductsPage();

    await productsPage.verifyTextVisibility(TEXT.PRODUCTS_TITLE);
    await productsPage.verifyAllProductsVisibility();
    await productsPage.visitProductPage(dataset.id);
    await productsPage.confirmProductDetails(dataset);
  });
  test("Visit all products page, visit product page, search for product, confirm ", async ({
    page,
  }) => {
    const homePage = new HomePage(page);
    const productsPage = new ProductsPage(page);

    await page.goto("/");
    await homePage.clickConsentButtonIfVisible();
    await homePage.verifyTextVisibility(TEXT.TITLE);
    await homePage.visitProductsPage();

    await productsPage.verifyTextVisibility(TEXT.PRODUCTS_TITLE);
    await productsPage.verifyAllProductsVisibility();
    await productsPage.SearchForProduct(dataset.name);
    await productsPage.verifyTextVisibility(TEXT.SEARCHED_PRODUCTS);
    await productsPage.verifyProductWasFound(dataset.name);
  });
});
